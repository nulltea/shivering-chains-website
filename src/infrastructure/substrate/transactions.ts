import { web3FromSource } from '@polkadot/extension-dapp';
import utils from './utils';

type TxArgs = {
  setStatus: Function
  accountPair: any
  attrs?: any | null
  signed: boolean,
}

export async function DoTx ({
  setStatus,
  accountPair = null,
  attrs = null,
  signed = true
}: TxArgs) {
  let unsubscribe: Function = () => {};

  const { api, palletRpc, callable, inputParams, paramFields } = attrs;

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected }
    } = accountPair;
    let fromAcct;

    // signer is from Polkadot-js browser extension
    if (isInjected) {
      const injected = await web3FromSource(source);
      fromAcct = address;
      api.setSigner(injected.signer);
    } else {
      fromAcct = accountPair;
    }

    return fromAcct;
  };

  const txResHandler = ({ status }: { status: any }) =>
    status.isFinalized
      ? setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
      : setStatus(`Current transaction status: ${status.type}`);

  const txErrHandler = (err: Error) =>
    setStatus(`😞 Transaction Failed: ${err.toString()}`);

  const signedTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters

    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    unsubscribe = await txExecute.signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
  };

  const unsignedTx = async () => {
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    unsubscribe = await txExecute.send(txResHandler)
      .catch(txErrHandler);
  };

  const transformParams = (paramFields: any[], inputParams: any[], opts = { emptyAsNull: true }) => {
    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map(inputParam => {
      // To cater the js quirk that `null` is a type of `object`.
      if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
        return inputParam.value.trim();
      } else if (typeof inputParam === 'string') {
        return inputParam.trim();
      }
      return inputParam;
    });
    const params = paramFields.map((field, ind) => ({ ...field, value: paramVal[ind] || null }));

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '') return (opts.emptyAsNull ? [...memo, null] : memo);

      let converted = value;

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map((e: string) => e.trim());
        converted = converted.map((single: string) => isNumType(type)
          ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
          : single
        );
        return [...memo, converted];
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted);
      }
      return [...memo, converted];
    }, []);
  };

  const isNumType = (type: string | string[]) =>
    utils.paramConversion.num.some(el => type.indexOf(el) >= 0);

  const allParamsFilled = () => {
    if (paramFields.length === 0) {
      return true;
    }

    return paramFields.every((paramField: { optional: any; }, ind: string | number) => {
      const param = inputParams[ind];
      if (paramField.optional) {
        return true;
      }
      if (param == null) {
        return false;
      }

      const value = typeof param === 'object' ? param.value : param;
      return value !== null && value !== '';
    });
  };

  unsubscribe();

  setStatus('Sending...');

  if (signed) await signedTx();
  else await unsignedTx();
}

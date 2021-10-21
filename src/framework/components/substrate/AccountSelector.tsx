import React, { useState, useEffect } from 'react';

import {
  Select,
  MenuItem,
  Box,
  FormControl,
  Badge
} from '@mui/material';

import {
  AccountCircle
} from '@mui/icons-material';

import { useSubstrate } from '../../../infrastructure/substrate';

function Main (props: any) {
  const { keyring } = useSubstrate();
  const { setAccountAddress } = props;
  const [accountSelected, setAccountSelected] = useState('');

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map((account: { address: string; meta: { name: string; }; }) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase()
  }));

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : '';

  // Set the initial address
  useEffect(() => {
    setAccountAddress(initialAddress);
    setAccountSelected(initialAddress);
  }, [setAccountAddress, initialAddress]);

  const onChange = (address: string) => {
    // Update state with new account address
    setAccountAddress(address);
    setAccountSelected(address);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      {!accountSelected
        ? <span>
          Add your account with the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/polkadot-js/extension'
          >
            Polkadot JS Extension
          </a>
        </span>
        : null}
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <BalanceAnnotation accountSelected={accountSelected}>
          <Select
            placeholder='Select an account'
            value={accountSelected}
            onChange={(event, c) => {
              if (event.target.value != undefined) {
                onChange(event.target.value.toString());
              }
            }}
          >
            {keyring.getPairs().map((account: { address: string; meta: { name: string; }; }) => (
              <MenuItem value={account.address}>
                <AccountCircle />
                {account.meta.name.toUpperCase()}
              </MenuItem>))}
          </Select>
        </BalanceAnnotation>
      </FormControl>
    </Box>
  );
}

function BalanceAnnotation(props: { accountSelected: any; children: JSX.Element }) {
  const { accountSelected } = props;
  const { api } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(0);

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe: Function;

    // If the user has selected an address, create a new subscription
    accountSelected &&
      api.query.system.account(accountSelected, (balance: { data: { free: { toHuman: () => React.SetStateAction<number>; }; }; }) => {
        setAccountBalance(balance.data.free.toHuman());
      })
        .then((unsub: Function) => {
          unsubscribe = unsub;
        })
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, accountSelected]);

  return accountSelected
    ? <Badge badgeContent={accountBalance} color="primary">
      {props.children}
    </Badge>
    : null;
}

export default function AccountSelector (props: any) {
  const { api, keyring } = useSubstrate();
  return keyring.getPairs && api.query ? <Main {...props} /> : null;
}

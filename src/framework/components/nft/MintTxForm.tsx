import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { DoTx, useSubstrate } from '../../../infrastructure/substrate';
import { client } from '../../../infrastructure/ipfs';

const FileInput = styled('input')({
  display: 'none'
});

type MintTxArgs = {
  name: string,
  contentUri: string,
  initialPrice: string
};

export default function MintTxForm (props: any) {
  const { api } = useSubstrate();
  const { control, handleSubmit, setValue } = useForm<MintTxArgs>();
  const { accountPair } = props;
  const [status, setStatus] = useState(null);
  const onSubmit: SubmitHandler<MintTxArgs> = async (data) => {
    console.log(data);
    await DoTx({
      setStatus,
      accountPair,
      attrs: {
        api: api,
        palletRpc: 'nft',
        callable: 'mint',
        inputParams: [accountPair.address, data],
        paramFields: [true, true]
      },
      signed: true
    });

    console.log('Done.');
  };

  const [uriEditable, setUriEditable] = useState(true);

  async function onChange (e: any) {
    const file = e.target.files[0];
    console.log(file);
    try {
      const resp = await client.add(file);
      setValue('contentUri', resp.path);
      setUriEditable(false);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 500 }}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, backgroundColor: '#1A1D29' }}>
          <InputLabel htmlFor="name-label" sx={{ color: '#6E7681' }}>Name</InputLabel>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor="contained-button-file">
            <FileInput onChange={onChange} accept="image/*" id="contained-button-file" type="file"/>
            <Button variant="contained" endIcon={<PhotoCamera/>} sx={{ ml: 1, height: 45, backgroundColor: '#1A1D29' }}
                    component="span">
              UPLOAD
            </Button>
          </label>
          <FormControl variant="filled" sx={{ m: 1, flex: 1, backgroundColor: '#1A1D29' }} >
            <InputLabel htmlFor="contentUri" sx={{ color: '#6E7681' }}>Content URI</InputLabel>
            <Controller
              name="contentUri"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} disabled={!uriEditable}/>}
            />
          </FormControl>
        </Box>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, backgroundColor: '#1A1D29' }}>
          <InputLabel htmlFor="initialPrice" sx={{ color: '#6E7681' }}>Initial price</InputLabel>
          <Controller
            name="initialPrice"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <Button variant="contained" type="submit" sx={{ mx: 1, my: 2 }}>SUBMIT</Button>
      </Box>
    </form>
  );
}

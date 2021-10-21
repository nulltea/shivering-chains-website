import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { DoTx, useSubstrate } from '../../../infrastructure/substrate';

type MintTxArgs = {
  name: string,
  contentUri: string,
  initialPrice: string
};

export default function MintTxForm (props: any) {
  const { api } = useSubstrate();
  const { control, handleSubmit } = useForm<MintTxArgs>();
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
          <Button variant="contained" endIcon={<PhotoCamera/>} sx={{ ml: 1, height: 45, backgroundColor: '#1A1D29' }}>
            UPLOAD
          </Button>
          <FormControl variant="filled" sx={{ m: 1, flex: 1, backgroundColor: '#1A1D29' }}>
            <InputLabel htmlFor="contentUri" sx={{ color: '#6E7681' }}>Content URI</InputLabel>
            <Controller
              name="contentUri"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
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

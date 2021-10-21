import { useState } from 'react';
import { ThemeProvider } from '@mui/styles';
import { Alert, AlertTitle, Backdrop, Box, CircularProgress, Typography } from '@mui/material';

import { AppStyles, AppTheme } from './framework/theme/Theme';
import Nav from './framework/components/navigation/Nav';
import { SubstrateContextProvider, useSubstrate } from './infrastructure/substrate';
import { DeveloperConsole } from './framework/components/substrate';
import AccountSelector from './framework/components/substrate/AccountSelector';

import CreatorPage from './framework/pages/Creator';

function Main () {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState, apiError } = useSubstrate();
  const theme = AppTheme();
  const classes = AppStyles();
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const [loading, setLoading] = useState(true);
  const loader = (msg: string) =>
    <Backdrop sx={{ backgroundColor: '#000', color: '#04AFD3' }} open={loading}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CircularProgress color="inherit"/>
        <Typography variant="h5" sx={{ color: '#04AFD3' }}>{msg}</Typography>
      </Box>
    </Backdrop>;

  const message = (err: Error) =>
    <Alert severity="error">
      <AlertTitle>Failed connecting to Substrate</AlertTitle>
      {JSON.stringify(err, null, 4)}
    </Alert>;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Nav>
          {(keyringState === 'READY') ? <AccountSelector setAccountAddress={setAccountAddress}/> : <div/>}
        </Nav>
        {((apiState !== 'READY') && loader('Connecting to Substrate')) ||
        ((keyringState !== 'READY') && loader('Loading accounts (please review any extension\'s authorization)')) ||
        ((apiState === 'ERROR') && message(apiError)) ||
        <CreatorPage accountPair={accountPair || keyring.getPairs()[0]}/>
        }
        <DeveloperConsole/>
      </div>
    </ThemeProvider>
  );
}

export default function App () {
  return (
    <SubstrateContextProvider>
      <Main/>
    </SubstrateContextProvider>
  );
}

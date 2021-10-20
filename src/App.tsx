import React, { useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { AppStyles, AppTheme } from './framework/theme/Theme';
import Nav from "./framework/components/navigation/Nav"
// import { Site } from './framework/components/navigation/SitePicker';
// import { Route } from './framework/components/navigation/Routes';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';
import AccountSelector from './framework/components/substrate/AccountSelector';
import { ThemeProvider } from '@mui/styles';


function Main() {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState, apiError } = useSubstrate();
  const theme = AppTheme();
  const classes = AppStyles();

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const loader = (text: string) =>
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>;

  const message = (err: Error) =>
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message negative compact floating
          header='Error Connecting to Substrate'
          content={`${JSON.stringify(err, null, 4)}`}
        />
      </Grid.Column>
    </Grid>;

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader('Loading accounts (please review any extension\'s authorization)');
  }

  const contextRef = createRef<HTMLDivElement>();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Nav>
          <AccountSelector setAccountAddress={setAccountAddress} />
        </Nav>
        <DeveloperConsole />
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}

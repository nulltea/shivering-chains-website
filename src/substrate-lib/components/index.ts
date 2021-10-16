import { TxButton, TxGroupButton } from './TxButton';
import DeveloperConsole from './DeveloperConsole';
import { any } from 'prop-types';

export { TxButton, TxGroupButton, DeveloperConsole };

declare global {
    interface Window {
        api?: any;
        keyring?: any;
        util?: any;
        utilCrypto?: any;
    }
}
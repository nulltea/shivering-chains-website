import { TxButton, TxGroupButton } from './TxButton';
import DeveloperConsole from './DeveloperConsole';

export { TxButton, TxGroupButton, DeveloperConsole };

declare global {
    interface Window {
        api?: any;
        keyring?: any;
        util?: any;
        utilCrypto?: any;
    }
}
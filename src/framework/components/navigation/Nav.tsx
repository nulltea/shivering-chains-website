import { ReactElement } from 'react';
import { Box, AppBar, Toolbar } from '@mui/material';
import { Paritysubstrate } from '@icons-pack/react-simple-icons';

export const drawerWidth = 300;

interface NavProps {
  leftNavAccessory?: ReactElement;
  children?: JSX.Element | JSX.Element[] | null;
}

export default function Nav (props: NavProps): ReactElement {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
              sx={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1A1D29' }}>
        <Toolbar>
          <Paritysubstrate color="white" size={48}/>
        </Toolbar>
        <Toolbar>
          {props.children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import React, { useState, ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NavFooter from './NavFooter';
import { Box, SvgIcon } from '@mui/material';
import {Image} from 'semantic-ui-react';
// import Routes, { GetCurrentRoute, Route } from './Routes';

export const drawerWidth = 300;

interface NavProps {
    // currentSite: Site;
    // sites: Site[];
    // routes: Route[];
    leftNavAccessory?: ReactElement;
    children?: JSX.Element | JSX.Element[];
}

export default function Nav(props: NavProps): ReactElement {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ flexDirection: 'row', justifyContent: 'space-between', color: '#04AFD3' }}>
                <Toolbar>
                    <Image src={`${process.env.PUBLIC_URL}/assets/substrate-logo.png`} size='mini' />
                </Toolbar>
                <Toolbar>
                    {props.children}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

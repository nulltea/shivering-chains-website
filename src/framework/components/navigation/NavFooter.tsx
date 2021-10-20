import React, { ReactElement } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { drawerWidth } from './Nav';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navFooter: {
            position: 'fixed',
            left: 0,
            bottom: 0,
            textAlign: 'left',
            height: 75,
            width: drawerWidth - 1,
            background: theme.palette.background.default,
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        },
        authButton: {
            border: 'none',
            borderRadius: 25,
        },
    })
);

export default function NavFooter(): ReactElement {
    const classes = useStyles();
    const [authMenuAnchor, setAuthMenuAnchor] = React.useState<null | HTMLElement>(null);

    return (
        <>
        </>
    );
}

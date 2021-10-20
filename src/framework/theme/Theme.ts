import React, {useEffect, useState} from 'react';
import {PaletteMode} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createStyles, makeStyles} from '@mui/styles';
import {  createTheme, Theme } from '@mui/material/styles';

export function AppTheme(): Theme {
    const [themeOverride, setThemeOverride] = useState<PaletteMode>();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    let palette: PaletteMode = prefersDarkMode ? 'dark' : 'light';

    function updateThemeOverride() {
        const storedThemeOverride = sessionStorage.getItem('themeOverride');
        if (storedThemeOverride && storedThemeOverride !== themeOverride) {
            setThemeOverride(storedThemeOverride as PaletteMode);
        }
    }

    useEffect(() => {
        function handleStorageEvent(event: StorageEvent) {
            updateThemeOverride();
        }

        if (typeof window !== 'undefined') {
            updateThemeOverride();

            window.addEventListener('storage', handleStorageEvent, false);

            return function cleanup() {
                window.removeEventListener('storage', handleStorageEvent);
            };
        }
    });

    if (themeOverride) {
        palette = themeOverride;
    }

    return createTheme({palette: {mode: "dark"}});
}

export const AppStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "#0D1117",
            height: "100vh"
        },
    })
);

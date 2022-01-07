import{ useEffect, useState} from 'react';
import { ThemeConsumer } from 'styled-components';
/* eslint-disable import/prefer-default-export */
export default () => { 
    
    const[theme, setTheme] = useState('light');

    useEffect(() => {
        const localStorageTheme = window.localStorage.getItem("theme");
        setTheme(localStorageTheme || 'light');
    }, [])

    const toggleTheme = () => {
        if(theme === 'light'){
            setTheme('dark');
            window.localStorage.setItem("theme", "dark");
        } else {
            setTheme('light');
            window.localStorage.setItem("theme", "light");
        }

    };

    return [theme, toggleTheme];
    
};
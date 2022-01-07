import{ useEffect, useState} from 'react';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
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
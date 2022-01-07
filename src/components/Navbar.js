import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar, StyledBrand, StyledNavItems, StyledLink, StyledButtonLink } from '../styled/Navbar';
import { Accent } from '../styled/AccentColor';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';


export default function Navbar({ toggleTheme }) {
    const { isAuthenticated, isLoading } = useAuth0();
    
    if (isLoading) {
        return <div>Loading ...</div>;
      }

   
    return (
        <StyledNavbar>
            <StyledBrand className="nav__brand">
                <Link to="/">
                <Accent>Gage's </Accent>Typing <Accent>Game</Accent>
                </Link>
            </StyledBrand>
            <StyledNavItems>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                <li>
                    <StyledLink to="/highScores">High Scores</StyledLink>
                </li>

                

                <StyledButtonLink onClick={toggleTheme}>
                    Toggle Theme
                </StyledButtonLink>

                { !isAuthenticated && <LoginButton /> }
                { isAuthenticated && <LogoutButton /> }

    
            </StyledNavItems>
    
        </StyledNavbar>
    )
}
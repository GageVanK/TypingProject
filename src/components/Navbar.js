import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar, StyledBrand, StyledNavItems, StyledLink } from '../styled/Navbar';
import { Accent } from '../styled/AccentColor';

export default function Navbar() {
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
            </StyledNavItems>
    
        </StyledNavbar>
    )
}
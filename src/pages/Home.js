import React from 'react';
import CTA from '../styled/CTA';
import {StyledTitle} from '../styled/TitleStyle'

export default function Home() {
    return (
        <div>
            <StyledTitle>Ready to type?</StyledTitle>
            <CTA to= "/game">
            Click to begin!
            </CTA>
        </div>
    );
}
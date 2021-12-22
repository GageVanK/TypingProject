import React from 'react';
import CTA from '../styled/CTA';
import { Accent } from '../styled/AccentColor'
import {StyledTitle} from '../styled/TitleStyle'

export default function Home() {
    return (
        <div>
            <StyledTitle>Ready to type?</StyledTitle>
            <CTA to= "/game">
            Click or type <Accent>'s'</Accent> to begin!
            </CTA>
        </div>
    );
}
import React from 'react';
import { StyledGame, StyledScore, StyledChar, StyledTimer } from '../styled/Game';
import { Strong } from '../styled/Strong';

export default function Game() {
    return (
        <StyledGame>
            <StyledScore>Score: <Strong>0</Strong></StyledScore>
            <StyledChar>A</StyledChar>
            <StyledTimer>Time: <Strong>00: 000</Strong></StyledTimer>
        </StyledGame>
    );
}
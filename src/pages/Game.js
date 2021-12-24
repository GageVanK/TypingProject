import React, {useState, useEffect} from 'react';
import { StyledGame, StyledScore, StyledChar, StyledTimer } from '../styled/Game';
import { Strong } from '../styled/Strong';

export default function Game({history}) {
    const [score, setScore] = useState(1);
    const MAX_SECONDS = 5;
    const [ms, setMs] = useState(0);
    const [seconds, setSeconds] = useState(MAX_SECONDS);

    useEffect (() => {
        const currentTime = new Date();
        const interval = setInterval(() => updateTime(currentTime), 1);
        return () => clearInterval(interval);
    }, []);

    const updateTime = (startTime) => {
        const endTime = new Date();
        const msPassedStr = ( endTime.getTime() - startTime.getTime()).toString();
        const formattedMSString = ('0000' + msPassedStr).slice(-5);
        const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0,2)) - 1;
        const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3));
        setSeconds(addLeadingZeros(updatedSeconds, 2));
        setMs(addLeadingZeros(updatedMs, 3));
    };

    useEffect(() => {
        if (seconds <= -1){
            history.push('/gameOver');
        }
    }, [seconds, ms]);

    const addLeadingZeros = (str, length) => {
        let zeros = ' ';
        for(let i = 0; i < length; i++){
            zeros += "0";
        }
        return (zeros + str).slice(-length);
    }

    return (
        <StyledGame>
            <StyledScore>Score: <Strong>{score}</Strong></StyledScore>
            <StyledChar>A</StyledChar>
            <StyledTimer>Time: <Strong>{seconds}: {ms}</Strong></StyledTimer>
        </StyledGame>
    );
}
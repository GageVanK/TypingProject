import React, {useState, useEffect, useCallback} from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledGame, StyledScore, StyledChar, StyledTimer } from '../styled/Game';
import { Strong } from '../styled/Strong';

export default function Game({history}) {
    const [score, setScore] = useScore(0);
    const MAX_SECONDS = 5;
    const [ms, setMs] = useState(999);
    const [seconds, setSeconds] = useState(MAX_SECONDS);
    const [currentChar, setCurrentChar] = useState('');
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';


    
    useEffect(() => {
        setRandomChar();
        setScore(0);
        const currentTime = new Date();
        const interval = setInterval(() => updateTime(currentTime), 1);
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 

    const setRandomChar = () => {
        const randomInt = Math.floor(Math.random() * 36);
        setCurrentChar(chars[randomInt]);
    };

    const updateTime = (startTime) => {
        const endTime = new Date();
        const msPassedStr = (
            endTime.getTime() - startTime.getTime()
        ).toString();
        //add zeros if necessary to ensure the string has exactly 5 characters
        const formattedMSString = ('0000' + msPassedStr).slice(-5);
        //0000 - first 2 are the seconds, and the last 3 are the ms
        const updatedSeconds =
            MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
        const updatedMs =
            1000 -
            parseInt(formattedMSString.substring(formattedMSString.length - 3));
        setSeconds(addLeadingZeros(updatedSeconds, 2));
        setMs(addLeadingZeros(updatedMs, 3));
    };

    useEffect ( () => {
        if(seconds <= -1){
            history.push('/gameOver');
        }
    
    }, [seconds, ms, history]);


    const keyUpHandler = useCallback(
        (e) => {
            console.log(e.key, currentChar);
            if (e.key === currentChar) {
                setScore((prevScore) => prevScore + 1);
            } else {
                if (score > 0) {
                    setScore((prevScore) => prevScore - 1);
                }
            }
            setRandomChar();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentChar]
    );

    useEffect(() => 
    {
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keyup', keyUpHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyUpHandler]);

    const addLeadingZeros = (num, length) => {
        let zeros = '';
        for(let i = 0; i < length; i++){
            zeros += "0"
        }
        return (zeros + num).slice(-length);
    };

    return (
        <StyledGame>
            <StyledScore>Score: <Strong>{score}</Strong></StyledScore>
            <StyledChar>{currentChar}</StyledChar>
            <StyledTimer>Time:{''} <Strong>{seconds}: {ms}</Strong></StyledTimer>
        </StyledGame>
    );
}
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


    
    useEffect (() => {
        setRandomChar();
        const currentTime = new Date();
        const interval = setInterval( () => updateTime(currentTime), 1);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const setRandomChar = () => {
        const randomInt = Math.floor(Math.random() * 36);
        setCurrentChar(chars[randomInt]);
    }

    const updateTime = (startTime) => {
        const endTime = new Date();
        const msPassedStr = ( endTime.getTime() - startTime.getTime()).toString();
        const formttedMsString = ('0000' + msPassedStr).slice(-5);
        const updatedSeconds = MAX_SECONDS - parseInt(formttedMsString.substring(0, 2));
        const updatedMs = 1000 - parseInt(formttedMsString.substring(formttedMsString.length - 3));
        setSeconds(addLeadingZeros(updatedSeconds, 2))
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
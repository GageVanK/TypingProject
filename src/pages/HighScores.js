import React, {useState, useEffect} from 'react';
import { ScoresList, ScoresLI } from '../styled/HighScores';

export default function HighScores() {
    
    const [highScores, setHighScores] = useState([]);

    useEffect (() => {
        const loadHighScores = async () => {
          try{

            const res = await fetch('/.netlify/functions/getHighScores');
            const scores = await res.json();
            setHighScores(scores);

          } catch (err) {
              console.error(err);
          }

        };
        loadHighScores();
    }, []);
    
    return (
        <div>
            <h1>HighScore</h1>

            <ScoresList>
                {highScores.map((score) => (
                    <ScoresLI key={score.id}>
                       {index + 1}. {score.fields.name} - {score.fields.score}
                    </ScoresLI>
                ))}
            </ScoresList>
        </div>
    );
}
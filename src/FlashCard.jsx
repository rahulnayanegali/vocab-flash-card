import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import classes from './FlashCard.module.css'

// firebase 
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from './firebase'

//data
import { vocabs } from './vocabs';

function FlashCard({ vocab, onCardClick }) {
    const { speak } = useSpeechSynthesis();
    const { word, meaning } = vocab;
    return (
        <>
            <div className={`${classes.card} ${classes.frontface}`} >
                <div className={classes.vocab}>
                    <div className={classes.wordContainer}><img onClick={() => speak({ text: word })} className={classes.speaker} src="https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg" />
                        <h1 onClick={() => onCardClick(vocab)}>{word}</h1>
                    </div>
                    {vocab?.state && <p> Meaning: <span className={classes.meaning}><em>{meaning}</em></span></p>}
                </div>
            </div>

        </>
    )
}

export default function FlashCardContainer() {
    const [words, setVocabs] = useState([])

    const handleClick = (vocab) => {
        const word = {
            ...vocab,
            state: !vocab?.state
        }
        setVocabs({ ...words, [[vocab?.word]]: word })
    }

    useEffect(() => {
        const words = Object.keys(vocabs).reduce((cur, acc) => (cur[acc] = {
            word: acc,
            meaning: vocabs[acc]
        }, cur), {})
        // setVocabs(words)
    }, [vocabs]);

    /* function to get all vocabs from firestore in realtime */
    useEffect(() => {
        const q = query(collection(db, 'vocabs'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setVocabs(querySnapshot.docs.map(doc => doc.data()).reduce((cur, acc) => (cur[acc.word] = {
                ...acc
            },cur), {}))
        })
    }, [])

    return <section>
        {
            Object.keys(words).map(vocab => <FlashCard key={vocab} vocab={words[vocab]} onCardClick={handleClick} />)
        }
    </section>
}
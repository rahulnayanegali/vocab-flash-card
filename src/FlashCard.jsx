import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import classes from './FlashCard.module.css'

// firebase 
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from './firebase'
import ToggleButton from "./ToggleButton";


function FlashCard({ vocab, onCardClick }) {
    const { speak } = useSpeechSynthesis();
    const { word, meaning, meanings } = vocab;
    const [ checked, setChecked ] = useState(false);

    const handleCardClick = (e) => {
        e.preventDefault();
        if ((e.target.tagName !== 'IMG') && (e.target.tagName !== 'BUTTON')) {
            onCardClick(vocab);
        }
    }

    const handleChecked = (event) => {
        event.stopPropagation(); 
        setChecked(!checked);
    }
    return (
        <>
            <div className={`${classes.card} ${classes.frontface}` } onClick={handleCardClick}>
                <div className={classes.vocab} style={checked ? {backgroundColor: '#C3E5AE'} : {}}>
                <div className={classes.toggle}><ToggleButton checked={checked} onChecked={handleChecked}   /></div>
                    <div className={classes.wordContainer} >
                        <button className={classes.speakerBtn} onClick={() => speak({ text: word })}><img className={classes.speaker} src={window.location.origin + '/images/Speaker_Icon.svg'} /></button>
                        <h1 >{word}</h1>                        
                    </div>
                    <p className={classes.meaningParent} style={vocab?.state ? { visibility: "unset" } : { visibility: "hidden" }}>
                        Meaning: <span className={classes.meaning}>
                            {
                                meanings ? <em>{meanings.join(', ')}</em> : <em>{meaning}</em>
                            }
                            </span>
                    </p>
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

    /* function to get all vocabs from firestore in realtime */
    useEffect(() => {
        const q = query(collection(db, 'vocabs'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setVocabs(querySnapshot.docs.map(doc => doc.data()).reduce((cur, acc) => (cur[acc.word] = {
                ...acc
            }, cur), {}))
        })
    }, [])

return <section className={classes.flashCardContainer}>
        {
            Object.keys(words).map(vocab => <FlashCard key={vocab} vocab={words[vocab]} onCardClick={handleClick} />)
        }
    </section>
}
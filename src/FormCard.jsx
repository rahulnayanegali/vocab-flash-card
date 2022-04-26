import React, { useEffect, useState } from "react";
import classes from './App.module.css'

export default function FormFlashCard({ onSubmit }) {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');

    const letters = /^[A-Za-z]+$/;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!word.length) return alert('Word cannot be empty')
        if (!meaning.length) return alert('Meaning cannot be empty')
        if (!word.match(letters)) return alert('Word must only be single alphapet');
        if (!meaning.match(letters)) return alert('meaning must only be single alphapet');
        onSubmit({ word, meaning })
    }


    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {/* <label>
                {`Word: `}
            </label> */}
                <input type="text" placeholder="Word" name="name" spellCheck='true' className={classes.inputMeaning} value={word} onChange={(e) => { setWord(e.target.value) }} />
            {/* <label>
                {`Meaning: `}
            </label> */}
                <input type="text" name="name" placeholder="Meaning" value={meaning} spellCheck='true' className={classes.inputMeaning} onChange={(e) => { setMeaning(e.target.value) }} />
            <button type="submit" value="Add Flash Card" className={classes.button}>Add Flash Card</button>
        </form>
    )
}
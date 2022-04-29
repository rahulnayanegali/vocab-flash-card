import React, { useState } from 'react';
import classes from './App.module.css'
import FlashCard from './FlashCard';
import FormFlashCard from './FormCard';

// firebase
import { db } from './firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

function App() {
  const colors = ['#49FF00', '#FBFF00', '#FF9300', '#FF0000'];
  const [vocabslength, setVocabslength] = useState(0);
  const [markColor, setMarkColor] = useState(colors[0])
  const handleSubmit = async ({ word, meanings }) => {
    try {
      await addDoc(collection(db, 'vocabs'), {
        word,
        meanings,
        created: Timestamp.now()
      })
      return true;
    } catch (err) {
      alert(err)
    }
  }

  const getVocabslength = (vocabslength) => {
    vocabslength && setVocabslength(vocabslength);}

  return (
    <>
      <div className={classes.header}><span>Vocabulary Flash Cards({vocabslength})</span>
      <span className={classes.colorPallete}>
        {
          colors.map((color,index) => <span onClick={() => setMarkColor(color)} key={color+index} style={{background:color, width:'30px', height:'30px' }}></span>)
        }
      </span>
      </div>
      <FormFlashCard onSubmit={handleSubmit}/>
      <FlashCard getVocabslength={getVocabslength} markColor={markColor}/>
    </>
  );
}

export default App;

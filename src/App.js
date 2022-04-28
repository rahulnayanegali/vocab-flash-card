import classes from './App.module.css'
import FlashCard from './FlashCard';
import FormFlashCard from './FormCard';

// firebase
import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function App() {
  const handleSubmit = async ({word, meanings}) => {
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
  return (
    <>
      <div className={classes.header}>Vocabulary Flash Cards</div>
      <FormFlashCard onSubmit={handleSubmit}/>
      <FlashCard />
    </>
  );
}

export default App;

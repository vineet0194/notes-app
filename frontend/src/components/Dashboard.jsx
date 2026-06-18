import { useContext } from 'react';
import { NotesContext } from '../context/index.jsx';
import Note from './Note.jsx';
import '../index.css'

export default function Dashboard(){
    const { notes } = useContext(NotesContext);
    return (
        <div className='notesContainer'>
            {
              notes.map((note, index)=>{
              return (
                <Note key={index} note={note} />
              )})
            }
        </div>
    )
}
import { useContext } from 'react';
import { NotesContext } from '../context/index.jsx';
import { Navigate } from 'react-router-dom';
import Note from './Note.jsx';
import '../index.css'

export default function Dashboard(){
    const { user, loading: userLoading } = useContext(NotesContext);
    const { notes, loading: notesLoading } = useContext(NotesContext);
    
    if (userLoading || notesLoading){
        return <div>Loading...</div>
    }

    // if (!user) {
    //     return <Navigate to="/auth/login" replace />
    // }

    return (
        <div className='notesContainer'>
            {
              notes.map((note, index)=>{
              return (
                <Note key={notes._id} note={note} />
              )})
            }
        </div>
    )
}
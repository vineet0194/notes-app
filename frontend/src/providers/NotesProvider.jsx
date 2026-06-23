import axios from "axios";
import { useState, useEffect } from "react";
import { NotesContext } from "../context";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function NotesProvider( {children} ){
    const [ notes, setNotes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }
        
        const fetchNotes = async() =>{
            try{
                const notesData = await axios.get(backendURL+'notes', {
                    "headers": {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setNotes(notesData.data.notes || []);
            } catch(error){
                console.error(error);
            } finally{
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                loading
            }}
        >
            {children}
        </NotesContext.Provider>
    )
}
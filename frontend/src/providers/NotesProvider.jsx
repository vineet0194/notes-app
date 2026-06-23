import { useState } from "react";
import { NotesContext } from "../context";

export default function NotesProvider( {children} ){
    const [ notes, setNotes ] = useState([]);
    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes
            }}
        >
            {children}
        </NotesContext.Provider>
    )
}
import { createContext } from "react";

export const NotesContext = createContext({
    notes:[],
    setNotes: ()=>{}
});

export const UserContext = createContext({
    user: null,
    setUser: ()=>{},
    loading: true,
    setLoading: ()=>{}
});
import { createContext } from "react";

export const NotesContext = createContext({
    notes:[],
    setNotes: ()=>{},
    loading: false,
    setLoading: ()=>{}
});

export const UserContext = createContext({
    user: null,
    setUser: ()=>{},
    loading: false,
    setLoading: ()=>{}
});
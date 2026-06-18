import { createContext } from "react";

export const NotesContext = createContext({
    notes:[{
        _id: '01',
        userId: '454',
        title: 'test note',
        content: 'test content',
        createdAt: 'abhi abhi',
        lastUpdatedAt: ''
    },{
        _id: '01',
        userId: '454',
        title: 'test note',
        content: 'test content',
        createdAt: 'abhi abhi',
        lastUpdatedAt: ''
    },{
        _id: '01',
        userId: '454',
        title: 'test note',
        content: 'test content',
        createdAt: 'abhi abhi',
        lastUpdatedAt: ''
    }],
    setNotes: ()=>{}
});

export const UserContext = createContext({
    user: {
        id: "001",
        firstName: "Vineet",
        lastName: "Singh",
        username: "vineet0194",
        email: "vineet.singh0194@gmail.com"
    },
    token: "",
    setUser: () => {}
});
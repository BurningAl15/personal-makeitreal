import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import { useUserData } from './useUserData';

interface NoteType {
    id: string;
    type: string;
    name: string;
    content: string;
}

export const useNotes = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState<boolean>(false);
    const {userData} = useUserData();


    const getNotes = async () => {
        try {
            setIsLoading(true);
            const jsonValue = await AsyncStorage.getItem('@user');
            const { email } = jsonValue != null ? JSON.parse(jsonValue) : null;
            const response = await axios.get(`${BASE_URL}/notes/${email}`);
            // console.log('GET: ', response.data.data);
            const newNotes = {...response.data.data}.notes.map((note:any) => ({
                id: note._id,
                type: note.type,
                name: note.name,
                content: note.content,
            }));
            // console.log('UPDATED: ', newNotes);
            setNotes(newNotes);
            setIsLoading(false);
        } catch (error) {
            console.log('>>> ',error);
        }
    };

    const getSpecificNotes = async (type) => {
        try {
            setIsLoading(true);
            const jsonValue = await AsyncStorage.getItem('@user');
            const { email } = jsonValue != null ? JSON.parse(jsonValue) : null;
            const response = await axios.get(`${BASE_URL}/notes/${email}/${type}`);
            // console.log('GET: ', response.data.data);
            const newNotes = {...response.data.data}.notes.map((note:any) => ({
                id: note._id,
                type: note.type,
                name: note.name,
                content: note.content,
            }));
            // console.log('UPDATED: ', newNotes);
            setNotes(newNotes);
            setIsLoading(false);
        } catch (error) {
            console.log('>>> ',error);
        }
    };

    const addNote = async ({type,name,content,image,list}) => {
        try {
            const newNote = {
                user: userData,
                type: type,
                name: name,
                content: content,
                image: image,
                list: list,
            };
            console.log('NEW NOTE: ', newNote);
            const response = await axios.post(`${BASE_URL}/notes`, newNote);
            setTrigger(!trigger);
        } catch (error) {
            console.log('>>> ',error);
        }
    };

    const editNote = async ({id, type,name,content,image,list}) => {
        try {
            const newNote = {
                user: userData,
                type: type,
                name: name,
                content: content,
            };
            console.log('NEW NOTE: ', newNote);
            const response = await axios.post(`${BASE_URL}/notes`, newNote);
            setTrigger(!trigger);
        } catch (error) {
            console.log('>>> ',error);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            console.log("DELETE NOTE: ", noteId);
            const config = {
                data:{
                    noteId,
                },
            };
            const response = await axios.delete(`${BASE_URL}/notes`, config);
            console.log("RESPONSE: ", response.data);
            setTrigger(!trigger);
        } catch (error) {
            console.log('>>> ',error);
        }
    };

    const hasElements:boolean = notes.length > 0;

    const getNoteNumbers:number = notes.length;

    return {
        trigger,
        notes,
        isLoading,
        hasElements,
        getNoteNumbers,
        getNotes,
        getSpecificNotes,
        addNote,
        editNote,
        deleteNote,
        setTrigger,
    };
};

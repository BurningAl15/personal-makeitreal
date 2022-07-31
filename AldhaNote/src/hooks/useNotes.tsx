import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config/config';
import {useUserData} from './useUserData';

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
      const {email} = jsonValue != null ? JSON.parse(jsonValue) : null;
      const response = await axios.get(`${BASE_URL}/notes/${email}`);
      const newNotes = {...response.data.data}.notes.map((note: any) => ({
        id: note._id,
        type: note.type,
        name: note.name,
        content: note.content,
      }));
      setNotes(newNotes);
      setIsLoading(false);
    } catch (error) {
      console.error('GET NOTES:', error);
    }
  };

  const getSpecificNotes = async type => {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem('@user');
      const {email} = jsonValue != null ? JSON.parse(jsonValue) : null;
      const response = await axios.get(`${BASE_URL}/notes/${email}/${type}`);
      const newNotes = {...response.data.data}.notes.map((note: any) => ({
        id: note._id,
        type: note.type,
        name: note.name,
        content: note.content,
      }));
      setNotes(newNotes);
      setIsLoading(false);
    } catch (error) {
      console.error('SPECIFIC NOTE:', error);
    }
  };

  const addNote = async ({type, name, content, image, list}) => {
    try {
      const newNote = {
        user: userData,
        type: type,
        name: name,
        content: content,
        image: image,
        list: list,
      };
      const response = await axios.post(`${BASE_URL}/notes`, newNote);
      setTrigger(!trigger);
    } catch (error) {
      console.error('ADD NOTE:', error);
    }
  };

  const editNote = async ({id, type, name, content, image, list}) => {
    try {
      const newNote = {
        noteId: id,
        user: userData,
        type: type,
        name: name,
        content: content,
        image: image,
        list: list,
      };
      const response = await axios.patch(`${BASE_URL}/notes`, newNote);
      setTrigger(!trigger);
    } catch (error) {
      console.error('EDIT NOTE:', error);
    }
  };

  const deleteNote = async noteId => {
    try {
      const config = {
        data: {
          noteId,
          user: userData,
        },
      };
      const response = await axios.delete(`${BASE_URL}/notes`, config);
      setTrigger(!trigger);
    } catch (error) {
      console.error('DELETE NOTE:', error);
    }
  };

  const hasElements: boolean = notes.length > 0;

  const getNoteNumbers: number = notes.length;

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

import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Context } from "../types/Types";

const praxContextDefaultValue: Context = {
    appState: {
      promptHistory: [],
      promptText: '',
      setPromptText: () => {return null}
    }
}

export const PraxContext = createContext<Context>(praxContextDefaultValue)

export const usePraxContext = () => {
    const [promptHistory, setPromptHistory] = useState([]);
    const [promptText, setPromptText] = useState('');
    const output: Context = {
      appState: {
        promptHistory: promptHistory,
        promptText: promptText,
        setPromptText: setPromptText
      }
    }
    const allPrompts = () => {
      axios
        .get('http://localhost:8000/api/prompts')
        .then((res) => setPromptHistory(res.data))
        .catch((err) => console.log(err));
    }
  
    useEffect(() => {
      allPrompts();
    },[])
  
    return (output);
}
  
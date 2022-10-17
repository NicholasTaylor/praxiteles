import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Prompts } from "../types/Types";

const promptsContextDefaultValue: Prompts = {
    prompts: []
}

export const PromptContext = createContext<Prompts>(promptsContextDefaultValue)

export const usePromptContext = () => {
    const [prompts, setPrompts] = useState([]);
    const allPrompts = () => {
      console.log('This started.');
      axios
        .get('http://localhost:8000/api/prompts')
        .then((res) => setPrompts(res.data))
        .catch((err) => console.log(err));
      console.log('This ended.');
    }
  
    useEffect(() => {
      allPrompts();
    },[])
  
    return ({
        prompts
    });
}
  
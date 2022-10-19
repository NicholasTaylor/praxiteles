import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Context, DiffusionModel } from "../types/Types";

const praxContextDefaultValue: Context = {
    appState: {
      promptHistory: [],
      promptText: '',
      setPromptText: () => {return null},
      diffusionModels: [],
      setDiffusionModels: () => {return null}
    }
}

export const PraxContext = createContext<Context>(praxContextDefaultValue)

export const usePraxContext = () => {
    const diffusionModelsDefault: DiffusionModel[] = []
    const [promptHistory, setPromptHistory] = useState([]);
    const [promptText, setPromptText] = useState('');
    const [diffusionModels, setDiffusionModels] = useState(diffusionModelsDefault);
    const output: Context = {
      appState: {
        promptHistory: promptHistory,
        promptText: promptText,
        setPromptText: setPromptText,
        diffusionModels: diffusionModels,
        setDiffusionModels: setDiffusionModels
      }
    }
    const getAllPrompts = () => {
      axios
        .get('http://localhost:8000/api/prompts')
        .then((res) => setPromptHistory(res.data))
        .catch((err) => console.log(err));
    }
    const getAllModels = () => {
      axios
        .get('http://localhost:8000/api/diffusionmodels')
        .then((res) => setDiffusionModels(res.data))
        .catch((err) => console.log(err));
    }
  
    useEffect(() => {
      getAllPrompts();
      getAllModels();
    },[])
  
    return (output);
}
  
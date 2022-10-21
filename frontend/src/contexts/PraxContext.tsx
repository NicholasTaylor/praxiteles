import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Context, DiffusionModel } from "../types/Types";

const praxContextDefaultValue: Context = {
    appState: {
      promptHistory: [],
      promptText: '',
      setPromptText: () => {return null},
      diffusionModels: [],
      setDiffusionModels: () => {return null},
      diffusionModel: 0,
      setDiffusionModel: () => {return null}
    }
}

export const PraxContext = createContext<Context>(praxContextDefaultValue)

export const usePraxContext = () => {
    const diffusionModelsDefault: DiffusionModel[] = []
    const diffusionModelDefault: Number = 0;
    const [promptHistory, setPromptHistory] = useState([]);
    const [promptText, setPromptText] = useState('');
    const [diffusionModels, setDiffusionModels] = useState(diffusionModelsDefault);
    const [diffusionModel, setDiffusionModel] = useState(diffusionModelDefault);
    const output: Context = {
      appState: {
        promptHistory: promptHistory,
        promptText: promptText,
        setPromptText: setPromptText,
        diffusionModels: diffusionModels,
        setDiffusionModels: setDiffusionModels,
        diffusionModel: diffusionModel,
        setDiffusionModel: setDiffusionModel
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
        .then((res) => {
          setDiffusionModels(res.data)
          return res.data;
        })
        .then((data) => {
          if (data.length > 0){
            setDiffusionModel(data[0].id)
          }
        })
        .catch((err) => console.log(err));
    }
  
    useEffect(() => {
      getAllPrompts();
      getAllModels();
    },[])
  
    return (output);
}
  
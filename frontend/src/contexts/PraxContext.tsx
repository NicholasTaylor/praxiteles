import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Context, DiffusionModel, InitImg } from "../types/Types";

const blankDisp = () => {return null};

const praxContextDefaultValue: Context = {
    appState: {
      componentsOpen: 0,
      setComponentsOpen: blankDisp,
      initImgs: [],
      setInitImgs: blankDisp,
      initImg: 0,
      setInitImg: blankDisp,
      initImgTitle: '',
      setInitImgTitle: blankDisp,
      promptHistory: [],
      resultsImgs: [],
      promptText: '',
      setPromptText: blankDisp,
      diffusionModels: [],
      setDiffusionModels: blankDisp,
      diffusionModel: 0,
      setDiffusionModel: blankDisp
    }
}

export const PraxContext = createContext<Context>(praxContextDefaultValue)

export const usePraxContext = () => {
    const initImgsDefault: InitImg[] = [];
    const initImgDefault: Number = 0;
    const [componentsOpen, setComponentsOpen] = useState(0);
    const [initImgs, setInitImgs] = useState(initImgsDefault);
    const [initImg, setInitImg] = useState(initImgDefault);
    const [initImgTitle, setInitImgTitle] = useState('');
    const diffusionModelsDefault: DiffusionModel[] = [];
    const diffusionModelDefault: Number = 0;
    const [promptHistory, setPromptHistory] = useState([]);
    const [resultImgs, setResultImgs] = useState([]);
    const [promptText, setPromptText] = useState('');
    const [diffusionModels, setDiffusionModels] = useState(diffusionModelsDefault);
    const [diffusionModel, setDiffusionModel] = useState(diffusionModelDefault);
    const output: Context = {
      appState: {
        componentsOpen: componentsOpen,
        initImgs: initImgs,
        setInitImgs: setInitImgs,
        initImg: initImg,
        setInitImg: setInitImg,
        initImgTitle: initImgTitle,
        setInitImgTitle: setInitImgTitle,
        setComponentsOpen: setComponentsOpen,
        promptHistory: promptHistory,
        resultsImgs: resultImgs,
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

    const getAllResultImgs = () => {
      axios
        .get('http://localhost:8000/api/resultimgs/')
        .then((res) => setResultImgs(res.data))
        .catch((err) => console.log(err));
    }

    const getAllInitImgs = () => {
      axios
        .get('http://localhost:8000/api/initimgs/')
        .then((res) => setInitImgs(res.data))
        .catch((err) => console.log(err));
    }
  
    useEffect(() => {
      getAllPrompts();
      getAllModels();
      getAllResultImgs();
      getAllInitImgs();
    },[])
  
    return (output);
}
  
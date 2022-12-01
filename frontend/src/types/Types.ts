import React from "react";

export interface Prompt {
    id?: Number,
    prompt_text: String,
    diff_model: Number,
    websocket_guid: String,
    create_date: String,
    img?: Number
}

export interface ResultImg {
    id: Number,
    title: String,
    img_path: String,
    init_img?: Number,
    prompt: Number,
    diff_model: Number,
    guidance_scale?: Number,
    strength?: Number,
    create_date: Date,
}

export interface DiffusionModel {
    id: Number,
    display_name: String,
    hf_repo_location: String,
    revision: String
}

export interface InitImg {
    id: Number,
    title: String,
    img: String,
    create_date: Date
}

export interface Context {
    appState: {
        componentsOpen: number,
        setComponentsOpen: React.Dispatch<React.SetStateAction<number>>,
        initImgs: InitImg[],
        setInitImgs: React.Dispatch<React.SetStateAction<InitImg[]>>,
        initImg: Number,
        setInitImg: React.Dispatch<React.SetStateAction<Number>>,
        initImgTitle: string,
        setInitImgTitle: React.Dispatch<React.SetStateAction<string>>,
        promptHistory?: Prompt[],
        resultsImgs?: ResultImg[],
        promptText: string,
        setPromptText: React.Dispatch<React.SetStateAction<string>>,
        diffusionModels: DiffusionModel[],
        setDiffusionModels: React.Dispatch<React.SetStateAction<DiffusionModel[]>>,
        diffusionModel: Number,
        setDiffusionModel: React.Dispatch<React.SetStateAction<Number>>,
        isOngoingPrompt: boolean,
        setIsOngoingPrompt: React.Dispatch<React.SetStateAction<boolean>>,
        websocketGuid: string,
        setWebsocketGuid: React.Dispatch<React.SetStateAction<string>>
    }
}

export interface ModelResponseProps {
    headline?: string;
}

export interface Props {
    children: React.ReactElement;
}

export interface OpenCloseProps extends React.HTMLProps<HTMLDivElement> {
    idname: string,
    isopening?: Boolean
}
import React from "react";

export interface Prompt {
    id: Number,
    prompt_text: String,
    create_date: Date
}

export interface DiffusionModel {
    id: Number,
    display_name: String,
    hf_repo_location: String,
    revision: String
}

export interface Context {
    appState: {
        promptHistory?: Prompt[],
        promptText: string,
        setPromptText: React.Dispatch<React.SetStateAction<string>>,
        diffusionModels: DiffusionModel[],
        setDiffusionModels: React.Dispatch<React.SetStateAction<DiffusionModel[]>>,
        diffusionModel: Number,
        setDiffusionModel: React.Dispatch<React.SetStateAction<Number>>,
    }
}

export interface ModelResponseProps {
    headline?: string;
}

export interface Props {
    children: React.ReactElement;
}
import React from "react";

export interface Prompt {
    id: Number,
    prompt_text: String,
    is_img_search: Boolean,
    create_date: Date
}

export interface Context {
    appState: {
        promptHistory?: Prompt[],
        promptText: string,
        setPromptText: React.Dispatch<React.SetStateAction<string>>
    }
}

export interface Props {
    children: React.ReactElement;
}
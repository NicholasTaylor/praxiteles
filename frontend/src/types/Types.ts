import React from "react";

export interface Prompt {
    id: Number,
    prompt_text: String,
    is_img_search: Boolean,
    create_date: Date
}

export interface Prompts {
    prompts: Prompt[]
}

export interface Props {
    children: React.ReactElement;
}
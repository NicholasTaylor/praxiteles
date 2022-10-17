import { useContext } from 'react';
import { Prompt } from '../types/Types';
import { PromptContext } from '../contexts/PromptContext';

const PromptHistory = () => {
    const { prompts } = useContext(PromptContext)
    return(
        <div>
            <h2>
                Recent Prompt History
            </h2>
            <ul>
                {prompts.map((prompt: Prompt) =>
                    <li key={prompt.id.toString()}>
                        {prompt.prompt_text}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default PromptHistory;
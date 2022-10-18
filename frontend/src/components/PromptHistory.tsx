import { useContext } from 'react';
import { Prompt } from '../types/Types';
import { PraxContext } from '../contexts/PraxContext';

const PromptHistory = () => {
    const { appState } = useContext(PraxContext)
    return(
        <div>
            <h2>
                Recent Prompt History
            </h2>
            <ul>
                {appState.promptHistory?.map((prompt: Prompt) =>
                    <li key={prompt.id.toString()}>
                        {prompt.prompt_text}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default PromptHistory;
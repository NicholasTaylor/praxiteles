import { css, jsx } from '@emotion/react'
import { useContext } from 'react';
import { PraxContext } from '../contexts/PraxContext';

/** @jsxRuntime classic */
/** @jsx jsx */

const PromptForm = () => {
    const { appState } = useContext(PraxContext)
    return (
        <div>
            <input
                type='text'
                placeholder='Enter your prompt here. (77 words or fewer)'
                value={appState.promptText}
                onChange={(e) => appState.setPromptText(e.target.value)}
            />
        </div>
    )
}

export default PromptForm;
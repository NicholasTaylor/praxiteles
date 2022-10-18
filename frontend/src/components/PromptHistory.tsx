/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react'
import { useContext } from 'react';
import { Prompt } from '../types/Types';
import { PraxContext } from '../contexts/PraxContext';
import { fontWeight, space, trueGray } from '../constants/style';

const PromptHistory = () => {
    const { appState } = useContext(PraxContext)
    return(
        <div
            css={css`
                border: 1px solid ${trueGray};
                padding: ${space[4]};
                flex-basis: calc(33% - (${space[4]} * 2));
            `}
        >
            <h2
                css={css`
                    font-weight: ${fontWeight['semibold']};
                    margin: 0;
                `}
            >
                Recent Prompt History
            </h2>
            <ul
                css={css`
                    margin: 0;
                    padding: 0;
                    li {
                        list-style-type: none;
                        text-align: left;
                    }
                `}
            >
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
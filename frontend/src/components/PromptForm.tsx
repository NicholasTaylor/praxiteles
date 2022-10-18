/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useContext } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { avantGarde, fontFamily, space, fontSize, fontWeight, trueGray } from '../constants/style';

const PromptForm = () => {
    const { appState } = useContext(PraxContext)
    return (
        <div>
            <input
                type='text'
                placeholder='Enter your prompt here. (77 words or fewer)'
                value={appState.promptText}
                onChange={(e) => appState.setPromptText(e.target.value)}
                css={css`
                    width: 50%;
                    font-size: ${fontSize[3]};
                    padding: ${space[4]};
                    border-radius: ${space[4]};
                    border: ${space[1]} solid ${trueGray};
                    font-weight: ${fontWeight['semibold']};
                `}
            />
        </div>
    )
}

export default PromptForm;
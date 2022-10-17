import { css, jsx } from '@emotion/react'

/** @jsxRuntime classic */
/** @jsx jsx */

const PromptForm = () => {
    return (
        <div>
            <input
                type='text'
                placeholder='Enter your prompt here. (77 words or fewer)'            />
        </div>
    )
}

export default PromptForm;
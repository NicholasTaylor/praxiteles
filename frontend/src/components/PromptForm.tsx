/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useContext } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { space, fontSize, fontWeight, trueGray } from '../constants/style';
import { DiffusionModel } from '../types/Types';
import iconCamera from '../images/icon-camera.png';
import BlackButton from '../UI/BlackButton';

const PromptForm = () => {
    const { appState } = useContext(PraxContext);
    const submitPrompt = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                prompt_text: appState.promptText,
                diff_model: appState.diffusionModel,
                create_date: new Date().toISOString()
            })
        }
        fetch('http://localhost:8000/api/prompt/create', requestOptions)
        /*.then((res) => {
            if(res.status === 200){
                setResponseHead('Success');
            }
            else {
                setResponseHead('Error');
            }
            return res.json();
        })
        .then((data) => {
            setResponseMsg(data.detail)
        })
        .catch((err) => {
            setResponseMsg(err);
            setResponseHead('Error')
        })*/;
    }
    return (
        <div>
            <div
                css={css`
                    display:flex;
                    justify-content: center;
                `}
            >
                {appState.diffusionModels.length > 0 &&
                    <select
                        name="model"
                        id="model"
                        css={css`
                            font-size: ${fontSize[3]};
                            padding: ${space[4]};
                            border-radius: ${space[4]} 0 0 ${space[4]};
                            border: ${space[1]} solid ${trueGray};
                            font-weight: ${fontWeight['semibold']};
                            box-sizing: border-box;
                            display: inline-block;           
                        `}
                        onChange={(e) => appState.setDiffusionModel(Number(e.target.value))}
                    >
                            <option
                                value={appState.diffusionModels[0].id.toString()}
                            >
                                Model
                            </option>
                        {appState.diffusionModels?.map((diff_model: DiffusionModel) =>
                            <option
                                key={diff_model.id.toString()}
                                value={diff_model.id.toString()}
                            >
                                {diff_model.display_name}
                            </option>
                        )}
                    </select>
                }
                <input
                    type='text'
                    placeholder='Enter your prompt here. (77 words or fewer)'
                    value={appState.promptText}
                    onChange={(e) => appState.setPromptText(e.target.value)}
                    css={css`
                        width: 45%;
                        font-size: ${fontSize[3]};
                        padding: ${space[4]};
                        border: ${space[1]} solid ${trueGray};
                        border-width: ${space[1]} 0;
                        font-weight: ${fontWeight['semibold']};
                        display: inline-block;
                    `}
                />
                <img
                    src={iconCamera}
                    alt="Search by img"
                    css={css`
                        font-size: ${fontSize[3]};
                        padding: ${space[4]};
                        border: ${space[1]} solid ${trueGray};
                        border-width: ${space[1]};
                        border-radius: 0 ${space[4]} ${space[4]} 0;
                        font-weight: ${fontWeight['semibold']};
                        display: inline-block;
                        width: 41.72px;
                    `}
                />
            </div>
            <div
                css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    margin: ${space[3]} 0 0 0;
                    div {
                        padding: 0 ${space[4]};
                    }
                `}
            >
                <BlackButton
                    onClick={submitPrompt}
                >
                    Generate
                </BlackButton>
            </div>
        </div>
    )
}

export default PromptForm;
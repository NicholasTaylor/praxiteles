/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { space, fontSize, fontWeight, trueGray } from '../constants/style';
import { DiffusionModel } from '../types/Types';
import iconCamera from '../images/icon-camera.png';
import BlackButton from '../UI/BlackButton';
import Logo from './Logo';
import HandleClick from './HandleClick';
import InitImgSelect from './InitImgSelect';

const PromptForm = () => {
    const { appState } = useContext(PraxContext);
    const submitPrompt = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const body = appState.initImg ? {
            prompt_text: appState.promptText,
            img: appState.initImg,
            diff_model: appState.diffusionModel,
            create_date: new Date().toISOString()
        } : {
            prompt_text: appState.promptText,
            diff_model: appState.diffusionModel,
            create_date: new Date().toISOString()
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
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
                    margin: ${space[4]} 0 0 0;
                    display:flex;
                    justify-content: center;
                    .promptForm__imgSearch_btn {
                        height: calc(${fontSize[6]} - (${space[1]} * 2));
                    }
                `}
            >
                <div
                    css={css`
                        padding: 0 ${space[5]} 0 0;
                        align-self: center;
                    `}
                >
                    <Logo />
                </div>
                {appState.diffusionModels.length > 0 &&
                    <select
                        name="model"
                        id="model"
                        css={css`
                            font-size: ${fontSize[2]};
                            border-radius: ${space[4]} 0 0 ${space[4]};
                            border: ${space[1]} solid ${trueGray};
                            font-weight: ${fontWeight['semibold']};
                            box-sizing: border-box;
                            display: inline-block;   
                            padding: 0 0 0 ${space[3]};        
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
                        width: 25%;
                        font-size: ${fontSize[2]};
                        border: ${space[1]} solid ${trueGray};
                        border-width: ${space[1]} 0;
                        padding: 0 ${space[3]};
                        font-weight: ${fontWeight['semibold']};
                        display: inline-block;
                    `}
                />
                <div
                    css={css`
                        border: ${space[1]} solid ${trueGray};
                        border-width: ${space[1]} 0;
                        display: flex;
                        align-items: center;
                    `}
                >
                    <InitImgSelect />
                </div>
                <div
                    className='promptForm__imgSearch_btn'
                    css={css`
                        font-size: ${fontSize[2]};
                        border: ${space[1]} solid ${trueGray};
                        border-width: ${space[1]};
                        border-radius: 0 ${space[4]} ${space[4]} 0;
                        font-weight: ${fontWeight['semibold']};
                        display: inline-block;
                    `}
                >
                    <HandleClick
                        idname='initImgManagerRoot'
                        isopening={true}
                        className="promptForm__imgSearch_btn"
                    >
                        <img
                            src={iconCamera}
                            alt="Search by img"
                            css={css`
                                display: block;
                                height: calc(100% - (${space[2]} * 2));
                                padding: ${space[2]} ${space[3]};
                            `}
                        />
                    </HandleClick>
                </div>
                <div
                    css={css`
                        padding: 0 0 0 ${space[5]};
                        align-self: center;
                    `}
                >
                    <BlackButton
                        onClick={submitPrompt}
                    >
                        Generate
                    </BlackButton>
                </div>
            </div>
        </div>
    )
}

export default PromptForm;
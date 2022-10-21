/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useContext } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { avantGarde, fontFamily, fontSize, fontWeight, space } from '../constants/style';
import { DiffusionModel } from '../types/Types';
import BlackButton from '../UI/BlackButton';
import HandleAddModel from '../functions/handleAddModel';
import WhiteLink from '../UI/WhiteLink';

const ModelManager = () => {
    const { appState } = useContext(PraxContext);
    const handleClose = () => {
        const modelManagerRoot = document.getElementById('modelManagerRoot');
        modelManagerRoot!.style.opacity = '0';
    }
    return (
        <div
            id='modelManagerRoot'
            css={css`
                transition: ease-out .1s;
                opacity: 0;
            `}
        >
            <div
                css={css` 
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 201;
                    position: absolute;
                    top: 0;
                    left: 0;
                `}
                onClick={handleClose}             
            >
            </div>
            <div
                css={css`
                    width: 40vw;
                    background-color: #FFFFFF;
                    z-index: 202;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                `}
            >
                <div
                    css={css`
                        width: 90%;
                        margin: 1em auto;
                    `}
                >
                    <div
                        css={css`
                            text-align:center;
                            text-transform: uppercase;
                        `}
                    >
                        <h1
                            css={css`
                                font-family: ${avantGarde}, ${fontFamily};
                                font-size: ${fontSize[4]};
                                margin: 0;
                            `}
                        >
                            Model Manager
                        </h1>
                    </div>
                    <div>
                        {appState.diffusionModels.length > 0 &&
                            <div>
                                <div
                                    css={css`
                                        margin: ${space[4]} 0;
                                    `}
                                >
                                    <div
                                        css={css`
                                            display: flex;
                                            flex-flow: row nowrap;
                                        `}
                                    >
                                        <div
                                            css={css`
                                                flex: 1 0 33%;
                                            `}
                                        >
                                            <strong>Name</strong>
                                        </div>
                                        <div
                                            css={css`
                                                flex: 1 0 33%;
                                            `}
                                        >
                                            <strong>Location</strong>
                                        </div>
                                        <div
                                            css={css`
                                                flex: 1 0 33%;
                                            `}
                                        >
                                            <strong>Revision</strong>
                                        </div>
                                    </div>
                                    {appState.diffusionModels?.map((diff_model: DiffusionModel) =>
                                        <div
                                            key={diff_model.id.toString()}
                                            css={css`
                                                display: flex;
                                                flex-flow: row nowrap;
                                            `}
                                        >
                                            <div
                                                css={css`
                                                    flex: 1 0 33%;
                                                `}
                                            >
                                                {diff_model.display_name}
                                            </div>
                                            <div
                                                css={css`
                                                    flex: 1 0 33%;
                                                `}
                                            >
                                                {diff_model.hf_repo_location}
                                            </div>
                                            <div
                                                css={css`
                                                    flex: 1 0 33%;
                                                `}
                                            >
                                                {diff_model.revision}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    css={css`
                                        width: 100%;
                                        position: relative;
                                        height: calc(1em + (${space[3]} * 2));
                                        div {
                                            display:inline-block;
                                            position: absolute;
                                        }
                                    `}
                                >
                                    <div
                                        css={css`
                                            margin: ${space[3]} 0;
                                        `}
                                    >
                                        <WhiteLink
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </WhiteLink>
                                    </div>
                                    <div
                                        css={css`
                                            right: 0;
                                        `}
                                    >
                                        <BlackButton
                                            onClick={HandleAddModel}
                                        >
                                            Add Model
                                        </BlackButton>
                                    </div>
                                </div>
                            </div>
                        }
                        {appState.diffusionModels.length === 0 &&
                            <div
                                css={css`
                                    text-align:center;
                                `}
                            >
                                <div
                                    css={css`
                                        font-weight: ${fontWeight['semibold']};
                                    `}
                                >
                                    You have no models installed yet. Set one up!
                                </div>
                                <div>
                                    <BlackButton
                                        onClick={HandleAddModel}
                                    >
                                        Add Model
                                    </BlackButton>
                                </div>
                            </div>
                        }
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default ModelManager;
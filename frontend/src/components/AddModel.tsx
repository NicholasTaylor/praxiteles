/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useContext, useState } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { avantGarde, fontFamily, space, fontSize, fontWeight, trueGray } from '../constants/style';
import { DiffusionModel } from '../types/Types';
import WhiteLink from '../UI/WhiteLink';
import BlackButton from '../UI/BlackButton';

const AddModel = () => {
    const { appState } = useContext(PraxContext);
    const [name, setName] = useState('');
    const [repo, setRepo] = useState('');
    const [revision, setRevision] = useState('');
    const handleClose = () => {
        const addModelRoot = document.getElementById('addModelRoot');
        addModelRoot!.style.opacity = '0';
    }
    return (
        <div
            id='addModelRoot'
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
                    z-index: 301;
                    position: absolute;
                    top: 0;
                    left: 0;
                `}
                onClick={handleClose}                
            >
            </div>
            <div
                css={css`
                    width: 33vw;
                    background-color: #FFFFFF;
                    z-index: 302;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    padding: ${space[2]}
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
                                margin: 0 0 ${space[4]} 0;
                            `}
                        >
                            Add A Model
                        </h1>
                    </div>
                    <div
                        css={css`
                            input {
                                width: calc(100% - (${space[3]} * 2));
                                font-size: ${fontSize[1]};
                                padding: ${space[3]};
                                border-radius: ${space[3]};
                                border: ${space[1]} solid ${trueGray};
                                font-weight: ${fontWeight['semibold']};
                                display: block;
                                margin: 0 0 ${space[4]} 0;
                            }
                            label {
                                font-family: ${avantGarde}, ${fontFamily};
                                text-transform: uppercase;
                                font-weight: ${fontWeight['bold']};
                                font-size: ${fontSize[2]};
                            }
                        `}
                    >
                        <label
                            htmlFor='praxName'
                        >
                            Model Nickname
                        </label>
                        <input
                            id='praxName'
                            type='text'
                            placeholder='ex: Stable Diffusion v1.4'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label
                            htmlFor='praxRepo'
                        >
                            Author/Repo
                        </label>
                        <input
                            id='praxRepo'
                            type='text'
                            placeholder='ex: CompVis/stable-diffusion-v1-4'
                            value={repo}
                            onChange={(e) => setRepo(e.target.value)}
                        />
                        <label
                            htmlFor='praxRevision'
                        >
                            Revision
                        </label>
                        <input
                            id='praxRevision'
                            type='text'
                            placeholder='ex: Main'
                            value={revision}
                            onChange={(e) => setRevision(e.target.value)}
                        />
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
                            <BlackButton>
                                Submit
                            </BlackButton>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default AddModel;
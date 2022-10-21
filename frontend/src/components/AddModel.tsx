/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { avantGarde, fontFamily, space, fontSize, fontWeight, trueGray } from '../constants/style';
import WhiteLink from '../UI/WhiteLink';
import BlackButton from '../UI/BlackButton';
import AddModelResponse from './AddModelResponse';

const AddModel = () => {
    const [name, setName] = useState('');
    const [repo, setRepo] = useState('');
    const [revision, setRevision] = useState('');
    const [responseHead, setResponseHead] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const handleClose = () => {
        const addModelRoot = document.getElementById('addModelRoot');
        addModelRoot!.style.opacity = '0';
    }
    const createModel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                display_name: name,
                hf_repo_location: repo,
                revision: revision
            })
        }
        fetch('http://localhost:8000/api/diffusionmodel/create', requestOptions)
        .then((res) => {
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
        });
      }
    useEffect(()=>{
        if (responseMsg.length > 0){
            const addModelMsgRoot = document.getElementById('addModelMsgRoot');
            addModelMsgRoot!.style.opacity = '1';
        }
    },[responseMsg])
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
                            <BlackButton
                                onClick={createModel}
                            >
                                Submit
                            </BlackButton>
                        </div>
                    </div>
                </div>                
            </div>
            <AddModelResponse
                headline={responseHead}
            >
                {responseMsg}
            </AddModelResponse>
        </div>
    )
}

export default AddModel;
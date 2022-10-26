/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import React, { useContext, useEffect, useState } from 'react';
import { avantGarde, fontFamily, space, fontSize, fontWeight, trueGray } from '../constants/style';
import WhiteLink from '../UI/WhiteLink';
import BlackButton from '../UI/BlackButton';
import HandleClick from './HandleClick';
import { PraxContext } from '../contexts/PraxContext';
import AddInitImgMsg from './AddInitImgMsg';

const AddInitImg = () => {
    const blankFile = new File([""], "filename.txt", {type: "text/plain", lastModified: new Date().getTime()});
    const { appState } = useContext(PraxContext);
    const [newInitImg, setNewInitImg] = useState(blankFile);
    const [newInitImgTitle, setNewInitImgTitle] = useState('');
    const [responseHead, setResponseHead] = useState('');
    const [responseMsg, setResponseMsg] = useState('');

    const openMsgComponent = () => {
        const addInitImgMsgRoot = document.getElementById('addInitImgMsgRoot');
        addInitImgMsgRoot!.style.opacity = '1';
        const output = appState.componentsOpen + 1;
        appState.setComponentsOpen(output); 
    }

    const createInitImg = (e: React.SyntheticEvent) => {
        console.log('1');
        e.stopPropagation();
        if (newInitImg && newInitImgTitle){
            console.log('2');
            let formData = new FormData();
            formData.append('img', newInitImg);
            formData.append('title', newInitImgTitle);
            formData.append('create_date', new Date().toISOString());
            const requestOptions = {
                method: 'POST',
                body: formData
            }
            fetch('http://localhost:8000/api/initimg/create', requestOptions)
            .then((res) => {
                if(res.status === 200){
                    console.log('3');
                    setResponseHead('Success');
                }
                else {
                    console.log('4');
                    setResponseHead('Error');
                }
                console.log('5');
            })
            .then(() => {
                console.log('6');
                setResponseMsg('The image uploaded successfully.')
            })
            .then(()=>{
                console.log('7');
                openMsgComponent();
            })/*
            .catch((err) => {
                setResponseMsg(err);
                setResponseHead('Error');
                openMsgComponent();
            });*/
        }
        console.log('8');
        return false;
    }
    return (
        <div
            id='addInitImgRoot'
            css={css`
                transition: ease-out .1s;
                opacity: 0;
            `}
        >
            <HandleClick
                idname='addInitImgRoot'
            >
                <div
                    css={css`
                        width: 100%;
                        height: 100vh;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 301;
                        position: absolute;
                        top: 0;
                        left: 0;
                    `}
                >
                </div>
            </HandleClick>
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
                            Upload Init Img
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
                            htmlFor='praxTitle'
                        >
                            Image Title
                        </label>
                        <input
                            id='praxTitle'
                            type='text'
                            placeholder='ex: me.jpg'
                            value={newInitImgTitle}
                            onChange={(e) => setNewInitImgTitle(e.target.value)}
                        />
                        <label
                            htmlFor='praxImg'
                        >
                            Image
                        </label>
                        <input
                            id='praxImg'
                            type='file'
                            onChange={(e) => {
                                let files = e.target.files
                                if (files) {
                                    setNewInitImg(files[0]);
                                }
                            }}
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
                            <HandleClick
                                idname='addInitImgRoot'
                            >
                                <WhiteLink>
                                    Cancel
                                </WhiteLink>
                            </HandleClick>
                        </div>
                        <div
                            css={css`
                                right: 0;
                            `}
                        >
                            <BlackButton
                                onClick={(e) => createInitImg(e)}
                            >
                                Submit
                            </BlackButton>
                        </div>
                    </div>
                </div>                
            </div>
            <AddInitImgMsg
                headline={responseHead}
            >
                {responseMsg}
            </AddInitImgMsg>
        </div>
    )
}

export default AddInitImg;
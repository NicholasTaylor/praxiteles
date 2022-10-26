/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import React, { useContext, useState } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { avantGarde, fontFamily, fontSize, fontWeight, space, trueGray } from '../constants/style';
import { InitImg } from '../types/Types';
import BlackButton from '../UI/BlackButton';
import WhiteLink from '../UI/WhiteLink';
import HandleClick from './HandleClick';

const InitImgManager = () => {
    const { appState } = useContext(PraxContext);
    const [img, setImg] = useState();
    const selectInitImg = (e: React.SyntheticEvent, key: string) => {
        e.preventDefault();
        console.log('Testing');
        /*
        if (img){
            appState.setInitImg(key);
            const currentOpen = appState.componentsOpen;
            const component = document.getElementById('initImgManagerRoot');
            component!.style.opacity = '0';
            const output = currentOpen - 1;
            appState.setComponentsOpen(output);
        }*/
    }
    return (
        <div
            id='initImgManagerRoot'
            css={css`
                transition: ease-out .1s;
                opacity: 0;
            `}
        >
            <HandleClick
                idname='initImgManagerRoot'
            >
                <div
                    css={css`
                        width: 100%;
                        height: 100vh;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 201;
                        position: absolute;
                        top: 0;
                        left: 0;
                    `}
                >
                </div>
            </HandleClick>
            <div
                css={css`
                    width: 50vw;
                    height: 50vh;
                    overflow-x: hidden;
                    overflow-y: scroll;
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
                        position: relative;
                        padding: ${space[4]} ${space[5]};
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
                            Init Images
                        </h1>
                    </div>
                    <div
                        css={css`
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            height: calc(1em + (${space[3]} * 2));
                            div {
                                display:inline-block;
                                position: relative;
                            }
                        `}
                    >
                        <HandleClick
                            idname='initImgManagerRoot'
                        >
                            <div
                                css={css`
                                    margin: ${space[3]} 0;
                                `}
                            >
                                <WhiteLink
                                >
                                    Cancel
                                </WhiteLink>
                            </div>
                        </HandleClick>
                        <HandleClick
                            idname='addInitImgRoot'
                            isopening={true}
                        >
                            <BlackButton
                            >
                                Upload Image
                            </BlackButton>
                        </HandleClick>
                    </div>
                    <div>
                        {appState.initImgs.length > 0 &&
                            <div>
                                <div
                                    css={css`
                                        margin: ${space[4]} 0;
                                        display: flex;
                                        flex-flow: row wrap;
                                    `}
                                >
                                    {appState.initImgs?.map((init_img: InitImg) =>
                                        <div
                                            key={init_img.id.toString()}
                                            css={css`
                                                flex: 0 calc(25% - ((${space[4]} * 4) + 2px));
                                                padding: ${space[4]};
                                                margin: ${space[4]};
                                                border: 1px solid ${trueGray};
                                            `}
                                            onClick={(e) => {selectInitImg(e, init_img.id.toString())}}
                                        >
                                            <h1
                                                css={css`
                                                    font-family: ${avantGarde}, ${fontFamily};
                                                    font-size: ${fontSize[3]};
                                                    text-transform: uppercase;
                                                    margin: 0 0 ${space[3]} 0;
                                                    line-height: 1;
                                                `}
                                            >
                                                {init_img.title}
                                            </h1>
                                            <a
                                                href="#"
                                                css={css`
                                                    text-decoration: none;
                                                    border: 0;
                                                `}
                                            >
                                                <img
                                                    src={`http://localhost:8000${init_img.img}`}
                                                    alt={init_img.title.toString()}
                                                    css={css`
                                                        width: 100%;
                                                        height: auto;
                                                    `}
                                                />
                                            </a>
                                            <caption
                                                css={css`
                                                    display:block;
                                                    font-size:${fontSize[1]};
                                                    text-align: left;
                                                    line-height: 1;
                                                    div {
                                                        margin: ${space[3]} 0;
                                                    }
                                                    div:first-of-type {
                                                        margin: ${space[1]} 0 ${space[3]} 0;
                                                    }
                                                `}
                                            >
                                                <div>
                                                    <strong>Date Generated:</strong> {new Date(init_img.create_date).toDateString()} {new Date(init_img.create_date).toTimeString()}
                                                </div>
                                            </caption>
                                        </div>
                                    )}
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
                                    You have no init images yet. Upload one!
                                </div>
                                <div>
                                    <HandleClick
                                        idname='addInitImgRoot'
                                        isopening={true}
                                    >
                                        <BlackButton
                                        >
                                            Upload Image
                                        </BlackButton>
                                    </HandleClick>
                                </div>
                            </div>
                        }
                    </div>
                </div>             
            </div>
        </div>
    )
}

export default InitImgManager;
/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { avantGarde, fontFamily, space, fontSize } from '../constants/style';
import { ModelResponseProps } from '../types/Types';
import BlackButton from '../UI/BlackButton';
import HandleClick from './HandleClick';

const AddModelResponse = (props: PropsWithChildren<ModelResponseProps>) => {
    return (
        <div
            id='addModelMsgRoot'
            css={css`
                transition: ease-out .1s;
                opacity: 0;
            `}
        >
            <HandleClick
                idName='addModelMsgRoot'
            >
                <div
                    css={css`
                        width: 100%;
                        height: 100vh;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 401;
                        position: absolute;
                        top: 0;
                        left: 0;
                    `}
                >
                </div>
            </HandleClick>
            <div
                css={css`
                    width: 20vw;
                    background-color: #FFFFFF;
                    z-index: 402;
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
                                margin: 0;
                            `}
                        >
                            {props.headline}
                        </h1>
                    </div>
                    <div
                        css={css`
                            padding: ${space[5]} 0;
                            text-align:center;
                        `}
                    >
                        {props.children}
                    </div>
                    <div
                        css={css`
                            width: 100%;
                            position: relative;
                            text-align: center;
                            height: calc(1em + (${space[3]} * 2));  
                            div {
                                display:inline-block;
                                position: absolute;
                            }                         
                        `}
                    >
                        <HandleClick
                            idName='addModelMsgRoot'
                        >
                            <BlackButton>
                                OK
                            </BlackButton>
                        </HandleClick>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default AddModelResponse;
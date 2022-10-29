/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useContext, useEffect, useState } from "react";
import { fontSize, fontWeight, space } from '../constants/style';
import { PraxContext } from "../contexts/PraxContext";
import { InitImg } from '../types/Types';

const InitImgSelect = () => {
    const { appState } = useContext(PraxContext)
    const [selectedInitImg, setSelectInitImg] = useState<any>();
    useEffect(()=>{
        fetch(`http://localhost:8000/api/initimg/${appState.initImg}`)
        .then((res)=> {
            return res.json()
        })
        .then((data)=>{
            setSelectInitImg(data)
        })
        .catch((err)=>{
            setSelectInitImg(null);
        })
    },[appState.initImg])
    if ( selectedInitImg ){
        const unSelect = () => {
            appState.setInitImg(0);
        }
        return(
            <div>
                <div
                    css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: center;
                        align-items: center;
                        margin: 0 ${space[3]};
                        div {
                            margin: 0 ${space[3]} 0 0;
                            display: inline-block;
                            font-weight: ${fontWeight['semibold']};
                        }
                        div:last-of-type {
                            margin: 0;
                        }
                    `}
                >
                    <div>
                        <img
                            src={`http://localhost:8000${selectedInitImg.img}`}
                            css={css`
                                width: auto;
                                height: ${fontSize[4]};
                            `}
                        />
                    </div>
                    <div>
                        {selectedInitImg.title.length > 13 ? `${selectedInitImg.title.substring(0,10)}...` : selectedInitImg.title}
                    </div>
                    <div
                        onClick={()=>{unSelect()}}
                    >
                        X
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div></div>
        )
    }
}

export default InitImgSelect;
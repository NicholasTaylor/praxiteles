/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useCallback, useEffect } from 'react';
import { avantGarde, fontFamily, fontSize, space, trueGray } from '../constants/style';
import { usePraxContext } from '../contexts/PraxContext';
import { ResultImg } from '../types/Types';

const ResultImgGallery = () => {    
    const { appState } = usePraxContext();
    const onNewImg = (e: MessageEvent) => {
        const data = JSON.parse(e.data)
        if (e.data.type === 'send_result_img' && e.data.result_img_id){
            const result_img_id = data.result_img_id
            const payload = {
                method: 'GET',
                id: result_img_id
            }
            fetch(`http://localhost:8000/api/resultimg/${result_img_id}`, payload)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const divRoot = document.getElementById('ongoingPromptGallery')
                    const newDiv = document.createElement('div');
                    const newImg = new Image();
                    newImg.src = `http://localhost:8000/${data.img_path}`;
                    newImg.alt = data.title.toString();
                    newDiv.appendChild(newImg);
                    divRoot?.insertBefore(newDiv, divRoot?.firstChild);
                    
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }
    /*const addNewResultImg = (resultImgId: Number) => {
        const ws = new WebSocket(`ws://localhost:8000/ws/ResultImg/${resultImgId}`);
        ws.onopen = (ev: Event) => {
            console.log('open', ev);
            ws.send(JSON.stringify({
                'result_img_id': resultImgId
            }))
        }
        ws.onmessage = (e: MessageEvent) => {
            onNewImg(e)
        }
    }*/
    const createWs = useCallback(() => {
        if (appState.isOngoingPrompt && appState.websocketGuid){
            const ws = new WebSocket(`ws://localhost:8000/ws/OngoingPrompt/${appState.websocketGuid}`);
            console.log('Firing.');
            ws.onmessage = (e: MessageEvent) => {
                onNewImg(e)
            }
            appState.setIsOngoingPrompt(false);
        }
    },[appState])
    useEffect(()=>{
        createWs();
    },[appState.isOngoingPrompt, createWs])
    return(
        <div>
            {appState.resultsImgs!.length > 0 &&
                <div
                    css={css`
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: space-evenly;
                    `}
                >
                    {appState.resultsImgs?.map((resultImg: ResultImg) =>
                        <div 
                            key={resultImg.id.toString()}
                            css={css`
                                flex: 0 calc(25% - ((${space[4]} * 4) + 2px));
                                padding: ${space[4]};
                                margin: ${space[4]};
                                border: 1px solid ${trueGray};
                            `}
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
                                {resultImg.title}
                            </h1>
                            <a 
                                href={`http://localhost:8000/${resultImg.img_path}`}
                                css={css`
                                    text-decoration: none;
                                    border: 0;
                                `}
                                rel="noreferrer"
                                target="_blank"
                            >
                                <img
                                    src={`http://localhost:8000/${resultImg.img_path}`}
                                    alt={resultImg.title.toString()}
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
                                    <strong>Date Generated:</strong> {new Date(resultImg.create_date).toDateString()} {new Date(resultImg.create_date).toTimeString()}
                                </div>
                                <div>
                                    <strong>Prompt:</strong> {appState.promptHistory?.find(item => item.id === resultImg.prompt)?.prompt_text}
                                </div>
                                <div>
                                    <strong>Model:</strong> {appState.diffusionModels?.find(item => item.id === resultImg.diff_model)?.display_name}
                                </div>
                                {resultImg.guidance_scale &&
                                    <div>
                                        <strong>Guidance Scale:</strong> {resultImg.guidance_scale?.toString()}
                                    </div>
                                }
                                {resultImg.strength &&
                                    <div>
                                        <strong>Strength:</strong> {resultImg.strength?.toString()}
                                    </div>
                                }
                            </caption>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default ResultImgGallery;
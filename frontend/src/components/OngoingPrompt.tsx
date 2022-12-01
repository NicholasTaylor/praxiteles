/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useEffect, useRef, useState } from "react"
import { space } from '../constants/style';
import BlackButton from '../UI/BlackButton';
import HandleClick from './HandleClick';

const OngoingPrompt = () => {
    const [testId, setTestId] = useState('')
    const collectionRef = useRef();
    const socketRef: React.MutableRefObject<any> = useRef();
    /*const testSocket = useRef<WebSocket | null>(null);*/
    const onNewImg = (e: MessageEvent) => {
        const data = JSON.parse(e.data)
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
    /*const testSocket = new WebSocket(`ws://localhost:8000/ws/ResultImg/${testId}`);*/
    const testWS = () => {
        const testSocket = new WebSocket(`ws://localhost:8000/ws/ResultImg/${testId}`);
        testSocket.onopen = (ev: Event) => {
            console.log('open', ev);
            testSocket.send(JSON.stringify({
                'result_img_id': testId
            }))
        }
        testSocket.onmessage = (e: MessageEvent) => {
            onNewImg(e)
        }
    }
    useEffect(() => {
        const collection = collectionRef.current;
        const throttle = (callback: Function, delay: Number) => {
            let previousCall = new Date().getTime();
            return function() {
                const time = new Date().getTime();
                if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            }
        }
        const onNewImg = (e: MessageEvent) => {
            const result_img_id = e.data.id
            fetch(`http://localhost:8000/api/resultimg/${result_img_id}`, {method: 'GET'})
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
        socketRef.current = new WebSocket(`ws://${window.location.host}`)
        socketRef.current.onopen = (e: MessageEvent) => {
            console.log('open', e)
        }
        socketRef.current.onmessage = (e: MessageEvent) => {
            onNewImg(e)
        }
    },[])
    return (
        <div
            id='ongoingPromptRoot'
            css={css`
                transition: ease-out .1s;
                opacity: 0;
            `}
        >
            <HandleClick
                idname='ongoingPromptRoot'
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
                    width: 85vw;
                    height: 85vh;
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
                    id='ongoingPromptGallery'
                    css={css`
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: space-evenly;
                        div {
                            flex: 0 calc(25% - ((${space[4]} * 4) + 2px));
                            padding: ${space[4]};
                            margin: ${space[4]};
                            img {
                                width: 100%;
                                height: auto;
                            }
                        }
                    `}
                >
                </div>
                <div>
                    <input 
                        type='text'
                        placeholder='ID?'
                        onChange={(e) => {
                            setTestId(e.target.value)
                        }}
                    >

                    </input>
                    <BlackButton
                        onClick={() => {testWS()}}
                    >
                        Test
                    </BlackButton>
                </div>
            </div>
        </div>
    )
}

export default OngoingPrompt;
/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { type } from '@testing-library/user-event/dist/type';
import { useContext } from 'react';
import { fontSize, space } from '../constants/style';
import { PraxContext } from '../contexts/PraxContext';
import { ResultImg } from '../types/Types';

const ResultImgGallery = () => {    
    const { appState } = useContext(PraxContext);
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
                                flex: 0 calc(25% - (${space[4]} * 2));
                                padding: ${space[4]};
                            `}
                        >
                            <img
                                src={`http://localhost:8000/${resultImg.img_path}`}
                                alt={resultImg.title.toString()}
                                css={css`
                                    width: 100%;
                                    height: auto;
                                `}
                            />
                            <caption
                                css={css`
                                    display:block;
                                    font-size:${fontSize[1]};
                                    text-align: left;
                                    line-height: 1;
                                    div {
                                        margin: ${space[3]} 0;
                                    }
                                    div:first-child {
                                        margin: ${space[1]} 0 ${space[3]} 0;
                                    }
                                `}
                            >
                                <div>
                                    <strong>Title:</strong> {resultImg.title}
                                </div>
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
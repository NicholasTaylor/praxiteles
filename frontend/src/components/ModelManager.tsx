/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useContext } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { avantGarde, fontFamily, space, fontSize, fontWeight, trueGray } from '../constants/style';
import { DiffusionModel } from '../types/Types';

const ModelManager = () => {
    const { appState } = useContext(PraxContext)
    return (
        <div>
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
            >
            </div>
            <div
                css={css`
                    width: 80vw;
                    height: 80vh;
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
                            `}
                        >
                            Model Manager
                        </h1>
                    </div>
                    <div>
                        {appState.diffusionModels.length > 0 &&
                            <table
                                cellPadding={0}
                                cellSpacing={0}
                                border={0}
                            >
                                <tbody>
                                    <th>
                                        <td>
                                            Name
                                        </td>
                                        <td>
                                            Location
                                        </td>
                                        <td>
                                            Revision
                                        </td>
                                    </th>
                                    {appState.diffusionModels?.map((diff_model: DiffusionModel) =>
                                        <tr key={diff_model.id.toString()}>
                                            <td>
                                                {diff_model.display_name}
                                            </td>
                                            <td>
                                                {diff_model.hf_repo_location}
                                            </td>
                                            <td>
                                                {diff_model.revision}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        }
                        {appState.diffusionModels.length === 0 &&
                            <div
                                css={css`
                                    text-align:center;
                                    font-family: ${fontFamily};
                                    font-weight: ${fontWeight['semibold']};
                                `}
                            >
                                You have no models installed yet. Set one up!
                            </div>
                        }
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default ModelManager;
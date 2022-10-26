/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { avantGarde, fontFamily, fontSize, fontWeight, space } from '../constants/style';
import WhiteLink from '../UI/WhiteLink';
import HandleClick from './HandleClick';

const Nav = () => {
    return(
        <div
            css={css`
                width: 50%;
                position: absolute;
                top: ${space[1]};
                left: ${space[3]};
                z-index: 1000;
                font-size: ${fontSize[2]};
                button, a {
                    font-family: ${avantGarde}, ${fontFamily};
                    text-transform: uppercase;
                    font-weight: ${fontWeight['bold']};
                    font-size: ${fontSize[2]};
                }                            
            `}
        >
            <div 
                css={css`
                    margin: ${space[3]} 0;
                `}
            >
                <ul
                    css={css`
                        margin:0;
                        padding:0;
                        display: flex;
                        flex-flow: row nowrap;
                        li {
                            list-style-type: none;
                            margin: 0 ${space[4]} 0 0;
                        }
                    `}
                >
                    <li>
                        <HandleClick
                            idname='modelManagerRoot'
                            isopening={true}
                        >
                            <WhiteLink
                                href="#"
                            >
                                Models
                            </WhiteLink>
                        </HandleClick>
                    </li>
                    <li>
                        <HandleClick
                            idname='initImgManagerRoot'
                            isopening={true}
                        >
                            <WhiteLink
                                href="#"
                            >
                                Init Images
                            </WhiteLink>
                        </HandleClick>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav;
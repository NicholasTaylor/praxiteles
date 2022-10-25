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
                    idName='modelManagerRoot'
                    isOpening={true}
                >
                    <WhiteLink
                        href="#"
                    >
                        Models
                    </WhiteLink>
                </HandleClick>
            </div>
        </div>
    )
}

export default Nav;
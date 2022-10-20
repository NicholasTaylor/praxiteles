/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { avantGarde, fontFamily, fontSize, fontWeight, space } from '../constants/style';
import HandleModelManager from '../functions/handleModelManager';

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
            <a 
                css={css`
                    margin: ${space[3]} 0;
                `}
                onClick={HandleModelManager}
            >
                Model Manager
            </a>
        </div>
    )
}

export default Nav;
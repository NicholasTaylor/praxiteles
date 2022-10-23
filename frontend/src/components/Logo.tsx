/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { avantGarde, fontFamily, space, fontSize, fontWeight } from '../constants/style';

const Logo = () => {
    return(
        <h1
            css={css`
            font-family: ${avantGarde}, ${fontFamily}; 
            font-weight: ${fontWeight['bold']};
            font-style: normal;
            text-transform: uppercase;
            font-size: ${fontSize[5]};
            letter-spacing: -0.09em;
            height: 100%;
            margin: 0;
            position: relative;
            top: 25%;
            `}
                >
            Pr<span css={css`font-feature-settings: "salt";`}>a</span>xiteles
        </h1>
    )
}

export default Logo;
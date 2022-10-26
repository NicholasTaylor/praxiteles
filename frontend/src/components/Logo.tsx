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
            line-height: 1;
            text-transform: uppercase;
            font-size: ${fontSize[5]};
            letter-spacing: -0.09em;
            margin: ${space[3]} 0 0 0;
            `}
                >
            Pr<span css={css`font-feature-settings: "salt";`}>a</span>xiteles
        </h1>
    )
}

export default Logo;
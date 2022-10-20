/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import React from 'react';
import { avantGarde, fontFamily, fontSize, fontWeight } from '../constants/style';

const WhiteLink: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
    children,
    ...props
}) => {
    return(
        <a 
            {...props}
            css={css`
                font-family: ${avantGarde}, ${fontFamily};
                text-transform: uppercase;
                font-weight: ${fontWeight['bold']};
                font-size: ${fontSize[2]};
                color: initial;
                text-decoration: none;
            `}
        >
            { children }
        </a>
    )
}

export default WhiteLink;
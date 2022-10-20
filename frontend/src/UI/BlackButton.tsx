/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import React from 'react';
import { avantGarde, fontFamily, fontSize, fontWeight, space } from '../constants/style';
import { Props, LinkProps } from '../types/Types';

const BlackButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => {
    return(
        <button 
            {...props}
            css={css`
                font-family: ${avantGarde}, ${fontFamily};
                text-transform: uppercase;
                font-weight: ${fontWeight['bold']};
                font-size: ${fontSize[2]};
                background-color: black;
                color: white;
                border-radius: ${space[2]};
                padding: ${space[3]} ${space[2]};
            `}
        >
            { children }
        </button>
    )
}

export default BlackButton;
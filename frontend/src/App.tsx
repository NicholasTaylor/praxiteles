/** @jsxRuntime classic */
/** @jsx jsx */

import './App.css';
import { css, jsx } from '@emotion/react';
import { PraxContext, usePraxContext } from './contexts/PraxContext';
import Logo from './components/Logo';
import PromptHistory from './components/PromptHistory';
import PromptForm from './components/PromptForm';
import WebFonts from './components/WebFonts';
import { fontFamily, pragmatica, space } from './constants/style';

function App() {
  const praxContextValue = usePraxContext();

  return (
    <PraxContext.Provider value={praxContextValue}>
      <WebFonts />
      <div>
        <div
          css={css`
            width: 100vw;
            min-height:100vh;
            position: relative;
          `}
        >
          <div
            css={css`
              input, textarea, select {
                font-family: inherit;
              }
              width: 90%;
              text-align: center;
              font-family: ${fontFamily};
              position:absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);

            `}
          >
            <Logo />
            <PromptForm />
            <div
              css={css`
                margin: ${space[5]} 0;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
              `}
            >
              <PromptHistory />
            </div>
          </div>
        </div>
      </div>
    </PraxContext.Provider>
  );
}

export default App;

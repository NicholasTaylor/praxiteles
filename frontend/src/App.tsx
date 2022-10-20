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
import ModelManager from './components/ModelManager';
import AddModel from './components/AddModel';
import Nav from './components/Nav';

function App() {
  const praxContextValue = usePraxContext();

  return (
    <PraxContext.Provider value={praxContextValue}>
      <WebFonts />
      <div
        css={css`
          font-family: ${fontFamily};
          input, textarea, select {
            font-family: inherit;
          }
        `}
      >
        <Nav />
        <AddModel />
        <ModelManager />
        <div
          css={css`
            width: 100vw;
            min-height:100vh;
            position: relative;
          `}
        >
          <div
            css={css`
              width: 90%;
              text-align: center;
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

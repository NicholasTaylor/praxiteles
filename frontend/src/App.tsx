/** @jsxRuntime classic */
/** @jsx jsx */

import './App.css';
import { css, jsx } from '@emotion/react';
import { PraxContext, usePraxContext } from './contexts/PraxContext';
import PromptForm from './components/PromptForm';
import WebFonts from './components/WebFonts';
import { fontFamily, space } from './constants/style';
import ModelManager from './components/ModelManager';
import AddModel from './components/AddModel';
import Nav from './components/Nav';
import ResultImgGallery from './components/ResultImgGallery';
import { useEffect } from 'react';
import InitImgManager from './components/InitImgManager';
import AddInitImg from './components/AddInitImg';

function App() {
  const praxContextValue = usePraxContext();
  useEffect(()=>{
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    body!.style.overflow = html!.style.overflow = praxContextValue.appState.componentsOpen === 0 ? 'initial' : 'hidden';
  },[praxContextValue.appState.componentsOpen])

  return (
    <PraxContext.Provider value={praxContextValue}>
      <WebFonts />
      <div
        css={css`
          font-family: ${fontFamily};
          input, textarea, select, caption {
            font-family: inherit;
          }
        `}
      >
        <Nav />
        <AddModel />
        <AddInitImg />
        <InitImgManager />
        <ModelManager />
        <div
          css={css`
            width: 100%;
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
              transform: translateX(-50%);
            `}
          >
            <PromptForm />
            <ResultImgGallery />
            <div
              css={css`
                margin: ${space[5]} 0;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
              `}
            >
            </div>
          </div>
        </div>
      </div>
    </PraxContext.Provider>
  );
}

export default App;

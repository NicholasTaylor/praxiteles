/** @jsxRuntime classic */
/** @jsx jsx */

import './App.css';
import { css, jsx } from '@emotion/react'
import { PraxContext, usePraxContext } from './contexts/PraxContext'
import PromptHistory from './components/PromptHistory';
import PromptForm from './components/PromptForm';
import WebFonts from './components/WebFonts';

function App() {
  const praxContextValue = usePraxContext();

  return (
    <PraxContext.Provider value={praxContextValue}>
      <WebFonts />
      <div>
        <h1
          css={css`
            font-family: itc-avant-garde-gothic-pro, sans-serif; font-weight: 700; 
            font-style: normal;
            text-transform: uppercase;
          `}
      >
          Praxiteles
        </h1>
        <PromptForm />
        <PromptHistory />
      </div>
    </PraxContext.Provider>
  );
}

export default App;

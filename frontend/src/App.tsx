import './App.css';
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
        <h1>Praxiteles</h1>
        <PromptForm />
        <PromptHistory />
      </div>
    </PraxContext.Provider>
  );
}

export default App;

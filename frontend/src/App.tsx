import './App.css';
import { PraxContext, usePraxContext } from './contexts/PraxContext'
import PromptHistory from './components/PromptHistory';

function App() {
  const praxContextValue = usePraxContext();

  return (
    <PraxContext.Provider value={praxContextValue}>
      <div>
        <h1>Praxiteles</h1>
        <PromptHistory />
      </div>
    </PraxContext.Provider>
  );
}

export default App;

import './App.css';
import { PromptContext, usePromptContext } from './contexts/PromptContext'
import PromptHistory from './components/PromptHistory';

function App() {
  const promptContextValue = usePromptContext();

  return (
    <PromptContext.Provider value={promptContextValue}>
      <div>
        <h1>Praxiteles</h1>
        <PromptHistory />
      </div>
    </PromptContext.Provider>
  );
}

export default App;

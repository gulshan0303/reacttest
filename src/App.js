import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';

import { MathJaxContext } from 'better-react-mathjax';
function App() {
  return (
    <div className="App">
      <MathJaxContext>
      <Home/>
      </MathJaxContext>
    
    </div>
  );
}

export default App;

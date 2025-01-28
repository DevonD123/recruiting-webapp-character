import React from 'react';
import './App.css';
import { CharacterProvider } from './context/characterContext';
import Layout from './components/layout';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <CharacterProvider>
          <Layout />
        </CharacterProvider>
      </section>
    </div>
  );
};

export default App;

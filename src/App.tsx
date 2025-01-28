import React from 'react';
import './App.css';
import CharacterList from './components/characters/CharacterList';
import { CharacterListProvider } from './context/characterListContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Creator</h1>
      </header>
      <section className="App-section">
        <CharacterListProvider>
          <CharacterList />
        </CharacterListProvider>
      </section>
    </div>
  );
}

export default App;

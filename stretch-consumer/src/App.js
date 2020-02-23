import React from 'react';
import SearchForm from './components/SearchForm';
import Projects from './components/Projects';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Projects />
        <SearchForm />
      </header>
    </div>
  );
}

export default App;

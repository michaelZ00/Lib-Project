import './App.css'
import { Routes, Route } from 'react-router-dom';
import Library from './Library';
import SavedBooks from './SavedBooks';
import Navbar from './components/NavBar';

function App() {
  return (
  
    <div className="app">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/SavedBooks" element={<SavedBooks />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
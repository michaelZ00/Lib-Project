import './App.css'
import { Routes, Route } from 'react-router-dom';
import Library from './Library';
import SavedBooks from './SavedBooks';
import Navbar from './components/NavBar';

function App() {
  return (
  
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/SavedBooks" element={<SavedBooks />} />
      </Routes>
    </div>
  )
}

export default App;
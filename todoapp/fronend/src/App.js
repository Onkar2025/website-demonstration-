import { HashRouter as Router, Routes, Route} from 'react-router-dom';


import './App.css';
import NotesList from './pageses/Noteslist';
import Header from './component/header';
import NotePage from './pageses/notepage';
function App() {
  return (
    <Router>
    <div className="container , dark">
      <div className='app'>
        <Header/>
        <Routes>
        <Route path='/' exact element = {<NotesList/>} /> 
        <Route path='/notes/:id' element={<NotePage />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;

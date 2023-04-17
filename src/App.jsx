import './App.css'
import Home from './components/Home/Home'
import ToDo from './components/ToDo/ToDo'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/todo' element={<ToDo />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import HomeStudent from './components/HomeStudent';
import HomeTeacher from './components/HomeTeacher';
import { ToastContainer } from 'react-toastify';
import Quiz from './components/Quiz';
import Dashboard from './components/DashBoard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homeStudent" element={<HomeStudent />} />
          <Route path="/homeTeacher" element={<HomeTeacher />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
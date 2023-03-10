import {BrowserRouter as Routers, Routes, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { AuthProvider } from './context/Auth';
import Register from './components/Register';
import Login from './components/Login';
import Navbars from './components/Navbars';
import PublicationManage from './components/PublicationManage';
import Publications from './components/Publications';
import Home from './components/Home';
import Footer from './components/Footer';
import Publication from './components/Publication';
import EventManage from './components/EventManage';
import Events from './components/Events';
import Event from './components/Event';

function App() {
  return (
    <Routers>
      <AuthProvider>
        <Navbars />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/publications' element={<Publications />} />
          <Route path='/publication/:id' element={<Publication />} />
          <Route path='/events' element={<Events />} />
          <Route path='/event/:id' element={<Event />} />
          <Route path='/manage/publications' element={<PublicationManage />} />
          <Route path='/manage/events' element={<EventManage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Routers>
  );
}

export default App;

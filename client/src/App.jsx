import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Projects from './pages/Projects'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import FooterCom from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/projects' element={<Projects />}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard />}/>
          </Route>
        </Routes>
        <FooterCom />
      </BrowserRouter>
    </>
  )
}

export default App;
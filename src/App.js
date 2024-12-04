import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './pages/home';
import { Login } from './login/login';
import { Signup } from './login/signup';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './pages/store';
import { HomeLogin } from './login/homelogin';
function App() {
  return (
      <><Provider store={store}>
            <CookiesProvider>
                <BrowserRouter>
                        <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/" element={<HomeLogin />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                        </Routes>
                </BrowserRouter>
            </CookiesProvider>
          </Provider>
      </>
  );
}

export default App;

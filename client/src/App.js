import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/login';

import Alert from './components/alert/Alert';

import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/home';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';
import PageRender from './customRouter/PageRender';
import Register from './pages/register';
import PrivateRouter from './customRouter/PrivateRouter';
import Header from './components/header/Header';

function App() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])

    return (
        <Router>
            <Alert />

            <input type="checkbox" id="theme" />
            <div className="App">
                <div className="main">
                    {auth.token && <Header />}
                    <Routes>
                        <Route path="/" element={auth.token ? <Home /> : <Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/:page" element={<PrivateRouter><PageRender /></PrivateRouter>} />
                        <Route path="/:page/:id" element={<PrivateRouter><PageRender /></PrivateRouter>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

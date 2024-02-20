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
import StatusModal from './components/StatusModal';
import { getPosts } from './redux/actions/postAction';

function App() {
    const auth = useSelector(state => state.auth)
    const status = useSelector(state => state.status)
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])

    useEffect(() => {
        if(auth.token) dispatch(getPosts(auth.token))
    }, [dispatch, auth.token])

    return (
        <Router>
            <Alert />

            <input type="checkbox" id="theme" />
            <div className={`App ${(status || modal) && 'mode'}`}>
                <div className="main">
                    {auth.token && <Header />}
                    {status && <StatusModal />}
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

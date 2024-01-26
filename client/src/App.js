import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PageRender from './PageRender';
import Login from './pages/login';

import Alert from './components/alert/Alert';

import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/home';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';

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
                    <Routes>
                        <Route path="/" element={auth.token ? <Home /> : <Login />} />
                        <Route path="/:page" element={<PageRender />} />
                        <Route path='/:page/:id' element={<PageRender />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

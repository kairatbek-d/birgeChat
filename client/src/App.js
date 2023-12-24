import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PageRender from './PageRender';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/:page" element={<PageRender />} />
                <Route path='/:page/:id' element={<PageRender />} />
            </Routes>
        </Router>
    );
}

export default App;

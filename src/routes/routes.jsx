import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage';
import Profile from '../pages/Profile'
import Login from '../pages/Login'

function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default RoutesApp;
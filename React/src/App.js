import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import YourCred from './components/YourCred';
import StoreCred from './components/StoreCred';
// import DelCred from './components/DelCred';
import ChangeCred from './components/ChangeCred';

const App = () => {
    return (
        <Router>
            <div>
                {/* <nav>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Login</Link>
                </nav> */}
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/yourcred" element={<YourCred />} />
                    <Route path="/storecred" element={<StoreCred />} /> {/* Add route for StoreCred */}
                    <Route path="/changecred/:userId" component={ChangeCred} />
                    {/* <Route path="/delcred" element={<DelCred/>}/> */}
                    <Route path="/" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

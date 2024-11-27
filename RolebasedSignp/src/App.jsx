import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/LoginPage';
import AdminDashboard from './Pages/AdminDashboard';
import EditorPage from './Pages/EditorPage';
import ViewerPage from './Pages/ViewerPage';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path='/editor' element={<EditorPage/>}/>
                <Route path='/viewer' element={<ViewerPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;

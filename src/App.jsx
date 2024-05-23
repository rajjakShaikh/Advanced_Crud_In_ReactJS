import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Pages/home';
import Create from './component/Pages/create';
import Todo from './component/Pages/todo';
import Footer from './component/Pages/footer';
import Listofusers from './component/Pages/listofusers';
import Read from './component/Pages/read';
import Test from './component/Pages/test';
import ProtectedRoute from './component/protectedroute';
import Login from './component/login';
import { AuthProvider } from './component/authContext';
import NotFound from './component/Pages/NotFound';
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
       
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
          <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
          <Route path="/create/listofusers" element={<ProtectedRoute><Listofusers /></ProtectedRoute>} />
          <Route path="/create/listofusers/:id" element={<ProtectedRoute><Read /></ProtectedRoute>} />
          <Route path='*' element={<NotFound />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

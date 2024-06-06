import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Pages/home';
import Create from './component/Pages/create';
import Todo from './component/Pages/todo';
import Footer from './component/Pages/footer';
import Listofusers from './component/Pages/listofusers';
import Read from './component/Pages/read';
import Test from './component/Pages/test';
// import ProtectedRoute from './component/protectedroute';
// import Login from './component/login';
// import { AuthProvider } from './component/authContext';
import NotFound from './component/Pages/NotFound';
export default function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
       
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/create" element={<Create />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/create/listofusers" element={<Listofusers />} />
          <Route path="/create/listofusers/:id" element={<Read />} />
          <Route path='*' element={<NotFound />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    // </AuthProvider>
  );
}

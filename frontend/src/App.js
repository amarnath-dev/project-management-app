import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("../src/pages/Home"));
const Project = React.lazy(() => import("../src/pages/Project"));
const Form = React.lazy(() => import("../src/pages/Form"));
const Signup = React.lazy(() => import("../src/pages/Signup"));
const Signin = React.lazy(() => import("../src/pages/Signin"));

function App() {
  return (
    <React.Suspense>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/' element={<Home />} />
          <Route path='/project' element={<Project />} />
          <Route path='/new' element={<Form />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;

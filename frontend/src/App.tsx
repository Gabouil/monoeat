import './components/_reset.scss'
import './components/_global.scss'
import Home from "./components/templates/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./components/templates/Login/Login.tsx";
import Register from "./components/templates/Register/Register.tsx";
import NotFound from "./components/templates/404/404.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Home/>
                }/>
                <Route path="/connexion" element={
                    <Login/>
                }/>
                <Route path="/inscription" element={
                    <Register/>
                }/>
                <Route path="/menu" element={
                    <Home/>
                }/>
                <Route path="/a-propos" element={
                    <Home/>
                }/>
                <Route path="/faq" element={
                    <Home/>
                }/>
                <Route path="/contact" element={
                    <Home/>
                }/>
                <Route path="/mentions-legales" element={
                    <Home/>
                }/>
                <Route path="/profile" element={
                    <Home/>
                }/>
                <Route path="/:404" element={
                    <NotFound/>
                }/>
            </Routes>
        </>
    )
}

export default App
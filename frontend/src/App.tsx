import './components/_reset.scss'
import './components/_global.scss'
import Home from "./components/templates/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Home/>
                }
                />
                <Route path="/menu" element={
                    <Home/>
                }
                />
                <Route path="/a-propos" element={
                    <Home/>
                }
                />
                <Route path="/faq" element={
                    <Home/>
                }
                />
                <Route path="/contact" element={
                    <Home/>
                }
                />
                <Route path="/mentions-legales" element={
                    <Home/>
                }
                />
            </Routes>
        </>
    )
}

export default App
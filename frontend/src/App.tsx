import './components/_reset.scss'
import './components/_global.scss'
import Header from "./components/molecules/global/Header/Header.tsx";
import Home from "./components/templates/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={
                        <Home />
                    }
                    />
                </Routes>
            </main>
        </>
    )
}

export default App
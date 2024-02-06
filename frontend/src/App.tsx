import './components/_reset.scss'
import './components/_global.scss'
import Home from "./components/templates/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./components/templates/Login/Login.tsx";
import Register from "./components/templates/Register/Register.tsx";
import NotFound from "./components/templates/404/404.tsx";
import Backoffice from "./components/templates/Backoffice/Backoffice.tsx";
import BackofficeUsers from "./components/templates/Backoffice/BackofficeUsers.tsx";
import BackofficeRecipes from "./components/templates/Backoffice/BackofficeRecipes.tsx";
import BackofficeIngredients from "./components/templates/Backoffice/BackofficeIngredients.tsx";
import BackofficeOrders from "./components/templates/Backoffice/BackofficeOrders.tsx";
import BackofficeUserId from "./components/templates/Backoffice/BackofficeUserId.tsx";

function App() {

    return (
        <>
            <Routes>
                {/* user */}
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

                {/* backoffice */}
                <Route path="/backoffice" element={
                    <Backoffice/>
                }/>
                <Route path="/backoffice/users" element={
                    <BackofficeUsers/>
                }/>
                <Route path="/backoffice/users/:id" element={
                    <BackofficeUserId/>
                }/>
                <Route path="/backoffice/recipes" element={
                    <BackofficeRecipes/>
                }/>
                <Route path="/backoffice/ingredients" element={
                    <BackofficeIngredients/>
                }/>
                <Route path="/backoffice/orders" element={
                    <BackofficeOrders/>
                }/>

                {/* 404 */}
                <Route path="*" element={
                    <NotFound/>
                }/>
            </Routes>
        </>
    )
}

export default App
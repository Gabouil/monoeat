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
import BackofficeUserAdd from "./components/templates/Backoffice/BackofficeUserAdd.tsx";
import BackofficeIngredientId from "./components/templates/Backoffice/BackofficeIngredientId.tsx";
import BackofficeIngredientAdd from "./components/templates/Backoffice/BackofficeIngredientAdd.tsx";
import BackofficeRecipeAdd from "./components/templates/Backoffice/BackofficeRecipeAdd.tsx";
import BackofficeRecipeId from "./components/templates/Backoffice/BackofficeRecipeId.tsx";
import BackofficeMenus from "./components/templates/Backoffice/BackofficeMenus.tsx";
import BackofficeMenuEdit from "./components/templates/Backoffice/BackofficeMenuEdit.tsx";
import Menu from "./components/templates/Menu/Menu.tsx";
import Information from "./components/templates/Tunnel/Information.tsx";

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
                    <Menu/>
                }/>
                <Route path="/information" element={
                    <Information />
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
                <Route path="/backoffice/users/add" element={
                    <BackofficeUserAdd/>
                }/>
                <Route path="/backoffice/users/:id" element={
                    <BackofficeUserId/>
                }/>
                <Route path="/backoffice/recipes" element={
                    <BackofficeRecipes/>
                }/>
                <Route path="/backoffice/recipes/add" element={
                    <BackofficeRecipeAdd/>
                }/>
                <Route path="/backoffice/recipes/:id" element={
                    <BackofficeRecipeId/>
                }/>
                <Route path="/backoffice/ingredients" element={
                    <BackofficeIngredients/>
                }/>
                <Route path="/backoffice/ingredients/add" element={
                    <BackofficeIngredientAdd/>
                }/>
                <Route path="/backoffice/ingredients/:id" element={
                    <BackofficeIngredientId/>
                }/>
                <Route path="/backoffice/orders" element={
                    <BackofficeOrders/>
                }/>
                <Route path="/backoffice/menus" element={
                    <BackofficeMenus/>
                }/>
                <Route path="/backoffice/menus/:date" element={
                    <BackofficeMenuEdit/>
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
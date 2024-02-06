import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <UserProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </UserProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
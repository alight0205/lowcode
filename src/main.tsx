import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.min.css'
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

import { createBrowserRouter } from "react-router-dom";

import Layout from './Components/Layout/Layout';

import Home from "./Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path:'/',
                element: <Home />,
            }
        ]
    }
])

export { router };
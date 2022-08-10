import { ReactElement, Suspense } from "react";
import Home from "../pages/home/index";
import Login from "../pages/login/index";
import BaseLayout from "../layouts/BaseLayout";
import { Navigate } from "react-router";

//- 懒加载优化
const lazyLoad = (children: ReactElement) => {
    return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

export const routes = [
    {
        path: "/",
        // element: lazyLoad(<Home />),
        element: <BaseLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" />,
            },
            {
                path: "*",
                element: <Navigate to="/home" />,
            },
            {
                path: '/home',
                element: lazyLoad(<Home />)
            }
        ],
    },
    {
        path: "/login",
        element: lazyLoad(<Login />),
    },
];

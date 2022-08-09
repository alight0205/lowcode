import { ReactElement, Suspense } from "react";
import Home from "../pages/home/index";
import Login from "../pages/login/index";
import BaseLayout from "../layouts/BaseLayout";

//- 懒加载优化
const lazyLoad = (children: ReactElement) => {
    return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

export const routes = [
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                index: true,
                element: lazyLoad(<Home />),
            }
        ],
    },
    {
        path: "/login",
        element: lazyLoad(<Login />),
    },
];

import { createBrowserRouter } from "react-router-dom";
import Layout from "./features/pages/Layout.tsx";
import GameDetailPage from "./features/pages/GameDetailPage.tsx";
import HomePage from "./features/pages/HomePage.tsx";
import ErrorPage from "./features/pages/ErrorPage.tsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'games/:gameTitle', element: <GameDetailPage /> }

        ]
    }
])



export default router
import { createBrowserRouter } from "react-router-dom";
import Layout from "./features/pages/Layout.tsx";
import GameDetailPage from "./features/pages/GameDetailPage.tsx";
import HomePage from "./features/pages/HomePage.tsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'games/:id', element: <GameDetailPage /> }

        ]
    }
])



export default router
import NavBar from "../Shared/NavBar.tsx";
import {Outlet} from "react-router-dom";

function layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default layout;
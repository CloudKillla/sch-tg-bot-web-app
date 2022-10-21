import {Route, Routes} from "react-router-dom";
import TestList from "../TestList/TestList";

const Router = () => {
    return (
        <Routes>
            <Route index element={<TestList />} />
        </Routes>
    );
}

export default Router;
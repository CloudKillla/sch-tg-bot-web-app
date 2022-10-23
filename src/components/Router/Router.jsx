import {Route, Routes} from "react-router-dom";
import TestList from "../TestList/TestList";
import Test from "../Test/Test";

const Router = () => {
    return (
        <Routes>
            <Route index element={<TestList />} />
            <Route path={`/test/:id`} element={<Test />} />
        </Routes>
    );
}

export default Router;
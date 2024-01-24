import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "../page/home";
import DemoOne from "../page/demo1";
import DemoTwo from "../page/demo2";
import Intro from "../page/intro";
import AppOne from "../page/app1";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Navigate replace to="intro" />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/demo1" element={<DemoOne />} />
          <Route path="/demo2" element={<DemoTwo />} />
          <Route path="/app1" element={<AppOne />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;

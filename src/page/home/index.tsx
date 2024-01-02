import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Menu, message } from "antd";
import "./index.less";
const App = () => {
  return (
    <div className="app-container">
      <div>左侧</div>
      <Outlet />
    </div>
  );
};
export default App;

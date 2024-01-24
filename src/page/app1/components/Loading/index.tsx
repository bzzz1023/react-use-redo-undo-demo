import { useRef, useState } from "react";
import { Input, Spin } from "antd";
import { CheckOutlined, DragOutlined } from "@ant-design/icons";
const App = (props: any) => {
  return <>{props.loading && <Spin className="loading-container" />}</>;
};

export default App;

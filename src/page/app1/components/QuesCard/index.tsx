import { useRef, useState } from "react";
import { Button, Space } from "antd";
import "./index.less";
import { CheckOutlined, DragOutlined } from "@ant-design/icons";
const App = (props: any) => {
  return (
    <div className="card-container">
      <div
        className={`content-container ${
          props.id === props.activeId ? "active-card" : ""
        }`}
      >
        <div>{props.name}</div>
        <div>{props.content}</div>
      </div>
      {props.id === props.activeId && (
        <div className="del-container" onClick={()=>{
          props.delCard(props.id)
        }}>
          <div className="del-container-active">删除</div>
        </div>
      )}
    </div>
  );
};

export default App;

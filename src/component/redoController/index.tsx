import { Button } from "antd";
import "./index.less";
import { UndoOutlined, RedoOutlined } from "@ant-design/icons";
const App = (props: any) => {
  return (
    <div className="redo-controller-container">
      <div className="btn-box">
        <Button
          disabled={props.executeIndex === -1}
          type="primary"
          icon={<UndoOutlined />}
          size={`large`}
          style={{ width: 60 }}
          onClick={async () => {
            await props.undo();
          }}
        />
        <Button
          disabled={props.commandQueue.length === props.executeIndex + 1}
          type="primary"
          icon={<RedoOutlined />}
          size={`large`}
          style={{ width: 60 }}
          onClick={async () => {
            await props.redo();
          }}
        />
      </div>
      <div className="execute-index-box">
        current execute index:{props.executeIndex}
      </div>
      {props.commandQueue.length > 0 &&
        props.commandQueue.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={
                props.executeIndex < index ? "undo-normal" : "undo-light"
              }
            >
              <div>{item.label}</div>
            </div>
          );
        })}
    </div>
  );
};
export default App;

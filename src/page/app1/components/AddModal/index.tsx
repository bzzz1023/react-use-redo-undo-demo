import { useRef, useState } from "react";
import { Input, Modal } from "antd";
import { CheckOutlined, DragOutlined } from "@ant-design/icons";
const App = (props: any) => {
  const [inputV, setInputV] = useState<any>({
    name: "",
    content: "",
  });

  return (
    <Modal
      title="Basic Modal"
      open={props.addModalOpen}
      onOk={async () => {
        await props.handleOk(inputV);
        setInputV({
          name: "",
          content: "",
        });
        props.handleCancel();
      }}
      onCancel={() => {
        setInputV({
          name: "",
          content: "",
        });
        props.handleCancel();
      }}
    >
      <div>活动名称</div>
      <Input
        value={inputV.name}
        onChange={(e) => {
          setInputV({
            ...inputV,
            name: e.target.value,
          });
        }}
      />
      <div>活动内容</div>
      <Input
        value={inputV.content}
        onChange={(e) => {
          setInputV({
            ...inputV,
            content: e.target.value,
          });
        }}
      />
    </Modal>
  );
};

export default App;

import RotateMenu from "./rotate-menu";
import React, { useState } from "react";
import "./index.less";
const App = () => {
  const arr: any[] = [
    {
      key: "0",
      label: "语文0",
    },
    {
      key: "1",
      label: "主页1",
    },
    {
      key: "2",
      label: "资料2",
    },
    {
      key: "3",
      label: "数学3",
    },
    {
      key: "4",
      label: "英语4",
    },
    {
      key: "5",
      label: "化学5",
    },
  ];

  const [state, setState] = useState<string>("3");
  const [arrState, setArrState] = useState(arr);

  const onSelect = (key: string) => {
    setState(key);
  };

  const add = () => {
    setArrState((pre: any) => {
      return [
        ...pre,
        {
          key: `${arrState.length + 1}`,
          label: "112233",
        },
      ];
    });
  };

  return (
    <div>
      <button onClick={add}>新增</button>

      <div style={{ width: 440, height: 440, border: "1px solid orange" }}>
        <RotateMenu
          items={arrState}
          width={120}
          selectedKey={state}
          direction={"right"}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export default App;

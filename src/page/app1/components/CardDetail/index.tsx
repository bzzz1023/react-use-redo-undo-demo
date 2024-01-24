import { useEffect, useState } from "react";
import { Input } from "antd";
import "./index.less";
const App = (props: any) => {
  const [form, setForm] = useState<any>({});

  const onBlurHandler = async () => {
    await props.update(form);
  };

  useEffect(() => {
    const { name, content, id } = props;
    setForm({ name, content, id });
  }, [props]);

  return (
    <div className="">
      <div>名称</div>
      <Input
        value={form.name}
        onChange={(e: any) => {
          setForm({
            ...form,
            name: e.target.value,
          });
        }}
        onBlur={onBlurHandler}
      />
      <div>内容</div>
      <Input
        value={form.content || ""}
        onBlur={onBlurHandler}
        onChange={(e: any) => {
          setForm({
            ...form,
            content: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "/intro",
    label: "基本用法",
  },
  {
    key: "/demo1",
    label: "受控组件",
  },
  {
    key: "/demo2",
    label: "非受控组件",
  },
  {
    key: "/app1",
    label: "场景一",
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  let [urlKey, setUrlKey] = useState<any>("");

  const getUrlKey = (url: string) => {
    if (url.indexOf("demo1") !== -1) {
      return "/demo1";
    } else if (url.indexOf("demo2") !== -1) {
      return "/demo2";
    } else if (url.indexOf("intro") !== -1) {
      return "/intro";
    } else if (url.indexOf("app1") !== -1) {
      return "/app1";
    }
  };

  const changeMenu = (path: string) => {
    if (path === urlKey) return;
    navigate(path, { replace: false });
    urlKey = getUrlKey(location.pathname);
    setUrlKey(urlKey);
  };

  useEffect(() => {
    urlKey = getUrlKey(location.pathname);
    setUrlKey(urlKey);
  }, [location]);

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        style={{ background: colorBgContainer }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{ height: 60, borderRight: "1px solid rgba(5, 5, 5, 0.06)" }}
        />
        <Menu
          mode="inline"
          selectedKeys={[urlKey]}
          items={items}
          onClick={({ key }) => {
            changeMenu(key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            fontSize: 20,
            paddingLeft: 24,
            background: colorBgContainer,
          }}
        >
          基于注册方法机制的撤销回退插件
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

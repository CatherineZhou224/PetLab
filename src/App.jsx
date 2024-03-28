import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AndroidOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Tabs, theme } from "antd";
import Title from "antd/es/typography/Title";
import "./App.css";
const { Header, Sider } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dog Collection",
              children: [
                {
                  key: "1-1",
                  label: "image1",
                },
              ],
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Cat Collection",
              children: [
                {
                  key: "2-1",
                  label: "image1",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Title
            level={2}
            style={{ alignSelf: "center", marginBottom: "revert" }}
          >
            Pet Lab
          </Title>
        </Header>
        <Tabs
          defaultActiveKey="2"
          items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
            const pet = ["Dog", "Cat"];
            return {
              key: i,
              label: `${pet[i]}`,
              children: `${pet[i]}`,
              icon: <Icon />,
            };
          })}
        />
      </Layout>
    </Layout>
  );
};
export default App;

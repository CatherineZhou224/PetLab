import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Tabs, theme } from "antd";
import Title from "antd/es/typography/Title";
import "./App.css";
import { DogInfo } from "./Components/DogInfo";
import { CatInfo } from "./Components/CatInfo";
import DogIcon from "./Components/DogIcon";
import CatIcon from "./Components/CatIcon";
const { Header, Sider } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { TabPane } = Tabs;

  const handleTabChange = () => {
    setActiveTab((prev) => (prev === "1" ? "2" : "1"));
  };

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
              icon: <DogIcon fill="white" />,
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
              icon: <CatIcon fill="white" />,
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
          destroyInactiveTabPane="true"
          activeKey={activeTab}
          onChange={handleTabChange}
        >
          <TabPane
            tab={
              <>
                <DogIcon style={{ marginRight: "0.5rem" }} />
                Dogs
              </>
            }
            key="1"
          >
            <DogInfo activeTab={activeTab} />
          </TabPane>
          <TabPane
            tab={
              <>
                <CatIcon style={{ marginRight: "0.5rem" }} />
                Cats
              </>
            }
            key="2"
          >
            <CatInfo activeTab={activeTab} />
          </TabPane>
        </Tabs>
      </Layout>
    </Layout>
  );
};
export default App;

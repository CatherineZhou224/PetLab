import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Tabs, theme } from "antd";
import Title from "antd/es/typography/Title";
import "../App.css";
import { DogInfo } from "./DogInfo";
import { CatInfo } from "./CatInfo";
import DogIcon from "./DogIcon";
import CatIcon from "./CatIcon";

const { Header, Sider } = Layout;
const MainContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { TabPane } = Tabs;

  const handleTabChange = () => {
    setActiveTab((prev) => (prev === "1" ? "2" : "1"));
  };

  //Pet Collection Manager
  // States for dog and cat collections
  const [dogCollection, setDogCollection] = useState([]);
  const [catCollection, setCatCollection] = useState([]);

  // Handlers for adding to collections
  const addToDogCollection = (dog) => {
    if (dogCollection.some((d) => d.label === dog.label)) {
      return alert("This dog is already in the collection.");
    }
    setDogCollection((prev) => [...prev, dog]);
  };

  const addToCatCollection = (cat) => {
    //if the cat is already in the collection, do not add it again
    if (catCollection.some((c) => c.label === cat.label)) {
      return alert("This cat is already in the collection.");
    }
    setCatCollection((prev) => [...prev, cat]);
  };

  const removeCatCollection = (catName) => {
    setCatCollection((prev) => prev.filter((cat) => cat.label !== catName));
  };

  const removeDogCollection = (dogName) => {
    setDogCollection((prev) => prev.filter((dog) => dog.label !== dogName));
  };

  const [selectedCat, setSelectedCat] = useState(null);

  // Function to handle selecting a cat from the collection
  const handleSelectCat = (cat) => {
    setSelectedCat(cat);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sider */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1", "2"]}
          // dog collection item and cat collection item
          items={[
            {
              key: "1",
              icon: <DogIcon fill="white" />,
              label: "Dog Collection",
              children: dogCollection,
            },
            {
              key: "2",
              icon: <CatIcon fill="white" />,
              label: "Cat Collection",
              children: catCollection,
            },
          ]}
        />
      </Sider>

      {/* main container */}
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
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
          <Title level={2} style={{ margin: 0 }}>
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
            <DogInfo 
              activeTab={activeTab}
              addToDogCollection={addToDogCollection}
              removeDogCollection={removeDogCollection}
              // handleSelectCat={handleSelectCat}

            />
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
            <CatInfo
              addToCatCollection={addToCatCollection}
              removeCatCollection={removeCatCollection}
              handleSelectCat={handleSelectCat}
            />
          </TabPane>
        </Tabs>
      </Layout>
    </Layout>
  );
};

export default MainContent;

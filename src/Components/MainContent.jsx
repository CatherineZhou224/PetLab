import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Tabs, theme } from "antd";
import Title from "antd/es/typography/Title";
import "../App.css";
import { DogInfo } from "./DogInfo";
import { CatInfo } from "./CatInfo";
import DogIcon from "./DogIcon";
import CatIcon from "./CatIcon";

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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

  // Function to handle selecting a cat from the collection and give it a name
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCustomizeCat = (cat) => {
    //when cat is seleted, pop up a modal to give it a name

    // setSelectedCat(cat);
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
              handleCustomizeCat={handleCustomizeCat}
            />
          </TabPane>
        </Tabs>
      </Layout>


      <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </Layout>
  );
};

export default MainContent;

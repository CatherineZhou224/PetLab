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
  const [dogCollection, setDogCollection] = useState(() => {
    const storedDogs = localStorage.getItem("dogCollection");
    return storedDogs ? JSON.parse(storedDogs) : [];
  });

  const [catCollection, setCatCollection] = useState(() => {
    const storedCats = localStorage.getItem("catCollection");
    return storedCats ? JSON.parse(storedCats) : [];
  });

  // Handlers for adding to collections
  const addToDogCollection = (dog) => {
    if (dogCollection.some((d) => d.key === dog.key)) {
      return alert("This dog is already in the collection.");
    }

    const newDog = {
      key: dog.key,
      imageUrl: dog.icon,
      label: dog.label,
    };

    setDogCollection((prev) => {
      const updatedCollection = [...prev, newDog];
      localStorage.setItem("dogCollection", JSON.stringify(updatedCollection));
      return updatedCollection;
    });

    console.log("Dog collection:", dogCollection);
  };

  const addToCatCollection = (cat) => {
    //if the cat is already in the collection, do not add it again
    if (catCollection.some((c) => c.label === cat.label)) {
      return alert("This cat is already in the collection.");
    }

    const newCat = {
      key: cat.key,
      imageUrl: cat.icon,
      label: cat.label,
    };

    setCatCollection((prev) => {
      const updatedCollection = [...prev, newCat];
      localStorage.setItem("catCollection", JSON.stringify(updatedCollection));
      return updatedCollection;
    });
  };

  const removeDogCollection = (dogName) => {
    setDogCollection((prev) => {
      const updatedCollection = prev.filter((dog) => dog.label !== dogName);
      localStorage.setItem("dogCollection", JSON.stringify(updatedCollection));
      return updatedCollection;
    });
  };

  const removeCatCollection = (catName) => {
    setCatCollection((prev) => {
      const updatedCollection = prev.filter((cat) => cat.label !== catName);
      localStorage.setItem("catCollection", JSON.stringify(updatedCollection));
      return updatedCollection;
    });
  };

  const updateCollectionName = (newName, breed) => {
    setDogCollection((prev) => {
      const updatedCollection = prev.map((dog) => {
        if (dog.key === breed) {
          return { ...dog, label: newName };
        }
        return dog;
      });
      localStorage.setItem("dogCollection", JSON.stringify(updatedCollection));
      return updatedCollection;
    });

    setCatCollection((prev) => {
      const updatedCollection = prev.map((cat) => {
        if (cat.key === breed) {
          return { ...cat, label: newName };
        }
        return cat;
      });
      localStorage.setItem("catCollection", JSON.stringify(updatedCollection));
      return updatedCollection;
    });
  };

  //image modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollectionPet, setSelectedCollectionPet] = useState({});

  const showModal = (e, pet) => {
    e.stopPropagation();
    console.log("Opening modal for pet:", pet);
    setSelectedCollectionPet(pet);
    setIsOpen(true);
    console.log("Modal open state:", isOpen);
  };

  //hover effect
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const cursorX = event.clientX,
      cursorY = event.clientY;

    setPosition({
      x: cursorX,
      y: cursorY,
    });
  };

  const handleMouseEnter = (event) => {
    event.preventDefault();
    setShowPopup(true);
    console.log("showPopup", showPopup);
    console.log("position", position);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sider */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
      >
        <div className="nav-btn-container">
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
        </div>
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
              children: dogCollection.map((dog, index) => ({
                key: dog.key,
                icon: (
                  <span>
                    <span
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeDogCollection(dog.label);
                      }}
                    >
                      ❌
                    </span>
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal(e, dog);
                        console.log("is open?", isOpen);
                      }}
                      className="image"
                      src={dog.imageUrl}
                      alt={dog.key}
                      style={{ width: "30px", height: "30px" }}
                    />
                  </span>
                ),
                label: (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(e, dog);
                      console.log("is open?", isOpen);
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {dog.label}
                  </div>
                ),
              })),
            },
            {
              key: "2",
              icon: <CatIcon fill="white" />,
              label: "Cat Collection",
              children: catCollection.map((cat, index) => ({
                key: cat.key,
                icon: (
                  <span>
                    <span
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCatCollection(cat.label);
                      }}
                    >
                      ❌
                    </span>
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal(e, cat);
                        console.log("is open?", isOpen);
                      }}
                      className="image"
                      src={cat.imageUrl}
                      alt={cat.key}
                      style={{ width: "30px", height: "30px" }}
                    />
                  </span>
                ),
                label: (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(e, cat);
                      console.log("is open?", isOpen);
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {cat.label}
                  </div>
                ),
              })),
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
          <Title 
          className="content-page-title"
          level={2} 
          style={{ margin: 0 }}>
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
              dogCollection={dogCollection}
              updateCollectionName={updateCollectionName}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedCollectionDog={selectedCollectionPet}
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
              catCollection={catCollection}
              updateCollectionName={updateCollectionName}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedCollectionCat={selectedCollectionPet}
            />
          </TabPane>
        </Tabs>
      </Layout>

      {showPopup && (
        <div
          className="popup"
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          Click on the thubnail to view the detailed image!
        </div>
      )}
    </Layout>
  );
};

export default MainContent;

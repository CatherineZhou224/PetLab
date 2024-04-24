import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { useState } from "react";
import DogIcon from "./DogIcon";
import CatIcon from "./CatIcon";

const { Sider } = Layout;
const SideBar = ({
  setShowPopup,
  setPosition,
  dogCollection,
  catCollection,
  removeDogCollection,
  removeCatCollection,
  showModal,
}) => {
  const [collapsed, setCollapsed] = useState(false); // State to handle sidebar collapse

  //hover effect

  // Function to update the position state based on mouse movement.
  const handleMouseMove = (event) => {
    const cursorX = event.clientX,
      cursorY = event.clientY;

    setPosition({
      x: cursorX,
      y: cursorY,
    });
  };

  // Function to show the popup when the mouse enters a hoverable element.
  const handleMouseEnter = (event) => {
    event.preventDefault();
    setShowPopup(true);
  };

  // Function to hide the popup when the mouse leaves the hoverable element.
  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const items = [
    {
      key: "1",
      icon: <DogIcon fill="white" />,
      label: "Dog Collection",
      children: dogCollection.map((dog) => ({
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
      children: catCollection.map((cat) => ({
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
  ];
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
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
        items={items}
      />
    </Sider>
  );
};

export default SideBar;

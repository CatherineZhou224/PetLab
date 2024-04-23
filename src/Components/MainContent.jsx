import React, { useState, useEffect } from "react";
import { Layout, theme } from "antd";
import Title from "antd/es/typography/Title";
import "../App.css";
import Sound from "./Sound";
import Tab from "./Tab";
import SideBar from "./SideBar";

const { Header } = Layout;
const MainContent = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //Pet Collection Manager
  //States for dog and cat collections
  //if the collection exists, extract it from the local storage
  //otherwise, set it to an empty array
  const [dogCollection, setDogCollection] = useState(() => {
    const storedDogs = localStorage.getItem("dogCollection");
    return storedDogs ? JSON.parse(storedDogs) : [];
  });

  const [catCollection, setCatCollection] = useState(() => {
    const storedCats = localStorage.getItem("catCollection");
    return storedCats ? JSON.parse(storedCats) : [];
  });

  //Handlers for adding to collections
  //if the dog/cat already exists in the collection, trigger the alert
  //otherwise, create a new pet and add it to the collection
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
  };

  const addToCatCollection = (cat) => {
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

  //Handlers for removing from collections
  //returning updated collection according to the remaining collection
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

  //Handlers for updating collections
  //update the dog's label to the newName given by the user
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

  //if the current tab is not the same as the data collection image you clicked on
  //do not open the modal and show a alert message
  const showModal = (e, pet) => {
    if (
      activeTab === "1" &&
      !dogCollection.some((dog) => dog.key === pet.key)
    ) {
      return alert(
        "Please switch to the cat tab before accessing the cat collection."
      );
    } else if (
      activeTab === "2" &&
      !catCollection.some((cat) => cat.key === pet.key)
    ) {
      return alert(
        "Please switch to the dog tab before accessing the dog collection."
      );
    } else {
      e.stopPropagation();
      setSelectedCollectionPet(pet);
      setIsOpen(true);
    }
  };

  //search bar resizing
  const [searchBarText, setSearchBarText] = useState(
    window.innerWidth < 1000 ? "Search" : "Search for dog breeds"
  );

  //when the page initially loads
  //adjust the search bar text according to the opening window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setSearchBarText("");
      } else if (window.innerWidth >= 500 && window.innerWidth < 1000) {
        setSearchBarText("Search");
      } else if (window.innerWidth >= 1000) {
        setSearchBarText("Search for dog breeds");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* side bar */}
      <SideBar
        setShowPopup={setShowPopup}
        setPosition={setPosition}
        dogCollection={dogCollection}
        catCollection={catCollection}
        removeDogCollection={removeDogCollection}
        removeCatCollection={removeCatCollection}
        showModal={showModal}
      />

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
          <Title className="content-page-title" level={2} style={{ margin: 0 }}>
            Pet Lab
          </Title>
        </Header>
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addToDogCollection={addToDogCollection}
          removeDogCollection={removeDogCollection}
          dogCollection={dogCollection}
          updateCollectionName={updateCollectionName}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCollectionPet={selectedCollectionPet}
          searchBarText={searchBarText}
          addToCatCollection={addToCatCollection}
          removeCatCollection={removeCatCollection}
          catCollection={catCollection}
        />
      </Layout>
      <Sound />
      {/* popup showing when hovering on the label*/}
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

import React, { useEffect, useState } from "react";
import catBreeds from "../utils/catBreeds";
import { getCatInfo } from "../utils/utils";
import { AutoComplete, Input, List } from "antd";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ImageModal from "./ImageModal";
import NameCustomizeModal from "./NameCustomizeModal";
import Chart from "./Chart";

export function CatInfo({
  addToCatCollection,
  catCollection,
  updateCollectionName,
  isOpen,
  setIsOpen,
  selectedCollectionCat,
  searchBarText,
}) {
  const [catBreed, setCatBreed] = useState("");
  const [catImage, setCatImage] = useState("");
  const [catName, setCatName] = useState("");
  const [catLength, setCatLength] = useState("");
  const [catOrigin, setCatOrigin] = useState("");
  const [catChildren, setCatChildren] = useState("");
  const [catOtherPets, setCatOtherPets] = useState("");
  const [catFamily, setCatFamily] = useState("");
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false);
  const [customNames, setCustomNames] = useState(() => {
    const storedCustomNames = localStorage.getItem("customNames.cats");
    return storedCustomNames ? JSON.parse(storedCustomNames) : {};
  });

  // Function to handle the search input by the user.
  const handleSearch = (value) => {
    const filteredBreeds = catBreeds.filter((breed) => breed.startsWith(value));
    setSearchResults(filteredBreeds);
  };

  // Set cat attributes to empty
  const handleCatInfo = () => {
    setCatBreed("");
    setCatName("");
    setCatLength("");
    setCatOrigin("");
    setCatImage("");
    setCatChildren("");
    setCatOtherPets("");
    setCatFamily("");
    setMessage("No data found for the specified cat.");
  };

  // Function called when a breed is clicked
  // It fetches or retrieves the breed info from local storage.
  const handleClick = async (breed) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(breed));
      if (existingData) {
        if (existingData === "empty") {
          handleCatInfo();
        } else {
          setCatBreed(breed);
          const customName = customNames[breed];
          setCatName(customName || existingData.name);
          setCatLength(existingData.length);
          setCatOrigin(existingData.origin);
          setCatImage(existingData.image_link);
          setCatChildren(existingData.children_friendly);
          setCatOtherPets(existingData.other_pets_friendly);
          setCatFamily(existingData.family_friendly);
          setMessage("");
        }
      } else {
        const data = await getCatInfo(breed);
        if (data.length > 0) {
          const cat = data[0];
          localStorage.setItem(breed, JSON.stringify(cat));
          setCatBreed(breed);
          const customName = customNames[breed];
          setCatName(customName || cat.name);
          setCatLength(cat.length);
          setCatOrigin(cat.origin);
          setCatImage(cat.image_link);
          setCatChildren(cat.children_friendly);
          setCatOtherPets(cat.other_pets_friendly);
          setCatFamily(cat.family_friendly);
          setMessage("");
        } else {
          localStorage.setItem(breed, JSON.stringify("empty"));
          handleCatInfo();
        }
      }
    } catch (error) {
      message.error(error);
    }
  };

  // Initialize the first breed on component mount.
  useEffect(() => {
    handleClick(catBreeds[0]);
  }, []);

  // Function to change the name of the pet on the card
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCloseSave = (petNameInput, breed) => {
    setShow(false);
    setCatName(petNameInput);
    setCustomNames((prev) => ({
      ...prev,
      [breed]: petNameInput,
    }));

    localStorage.setItem(
      "customNames.cats",
      JSON.stringify({
        ...customNames,
        [breed]: petNameInput,
      })
    );
    // Propagate name change to parent component to update app state
    updateCollectionName(petNameInput, breed);
  };

  return (
    <>
      <div className="search-breed-wrapper">
        <AutoComplete
          style={{ width: "20vw", marginBottom: 0 }}
          options={searchResults.map((breed) => ({ value: breed }))}
          onSelect={handleClick}
          onSearch={handleSearch}
          placeholder={searchBarText}
        >
          <Input.Search enterButton />
        </AutoComplete>

        <div className="breed-header">{catBreed}</div>
      </div>

      <div className="container">
        <List
          size="small"
          bordered
          dataSource={catBreeds}
          renderItem={(breed, key) => (
            <List.Item onClick={() => handleClick(breed)} key={key}>
              {breed}
            </List.Item>
          )}
          style={{ overflowY: "scroll" }}
        />

        {!catImage && message && <h3 className="alert-message">{message}</h3>}
        {catImage && !message && (
          <Card>
            <Card.Img
              variant="top"
              src={catImage}
              alt={catBreed}
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
            <Card.Body>
              <Card.Title>{catBreed && `Breed: ${catBreed}`}</Card.Title>
              <Card.Title>
                {catName &&
                  `Name: ${customNames[catBreed] || "Give your pet a name;))"}`}
              </Card.Title>
              <Card.Text>
                {catOrigin && `Origin: ${catOrigin}`}
                <br />
                {catLength && `Length: ${catLength}`}
              </Card.Text>
              <Chart
                children={catChildren}
                otherPets={catOtherPets}
                people={catFamily}
              />
              <div className="button-wrapper">
                <Button
                  onClick={handleShow}
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                >
                  Name your cat
                </Button>

                <NameCustomizeModal
                  show={show}
                  handleClose={handleClose}
                  handleCloseSave={handleCloseSave}
                  breed={catBreed}
                />

                <Button
                  variant="primary"
                  onClick={() =>
                    addToCatCollection({
                      key: catBreed,
                      icon: catImage,
                      label: catName,
                    })
                  }
                >
                  Add to collection
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}

        {/* image modal */}
        {/* when the key matches with the selection key, open the image modal */}
        {isOpen &&
          catCollection.map((cat) => {
            if (cat.key === selectedCollectionCat.key) {
              return (
                <ImageModal
                  key={cat.key}
                  src={cat.imageUrl}
                  alt={cat.key}
                  caption={cat.label}
                  handleCloseSave={handleCloseSave}
                  onClose={() => setIsOpen(false)}
                  updateCollectionName={updateCollectionName}
                />
              );
            }
          })}
      </div>
    </>
  );
}

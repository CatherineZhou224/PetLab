import React, { useEffect, useState } from "react";
import { AutoComplete, Input, List, message } from "antd";
import { getDogBreeds, getDogInfo } from "../utils/utils";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Chart from "./Chart";
import ImageModal from "./ImageModal";
import NameCustomizeModal from "./NameCustomizeModal";

export function DogInfo({
  addToDogCollection,
  dogCollection,
  updateCollectionName,
  isOpen,
  setIsOpen,
  selectedCollectionDog,
  searchBarText,
}) {
  const [breeds, setBreeds] = useState([]);
  const [dogBreed, setDogBreed] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dogName, setDogName] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [dogHeight, setDogHeight] = useState("");
  const [dogWeight, setDogWeight] = useState("");
  const [dogChildren, setDogChildren] = useState("");
  const [dogOtherDog, setDogOtherDog] = useState("");
  const [dogStranger, setDogStranger] = useState("");
  const [message, setMessage] = useState("");

  // Retrieve custom names from local storage or initialize as an empty object
  const [customNames, setCustomNames] = useState(() => {
    const storedCustomNames = localStorage.getItem("customNames.dogs");
    return storedCustomNames ? JSON.parse(storedCustomNames) : {};
  });

  // Handles search functionality and updates search results based on filter
  const handleSearch = (value) => {
    const filteredBreeds = breeds.filter((breed) => breed.startsWith(value));
    setSearchResults(filteredBreeds);
  };

  // Set dog attributes to empty
  const handleDogInfo = () => {
    setDogBreed("");
    setDogName("");
    setDogHeight("");
    setDogWeight("");
    setDogImage("");
    setDogChildren("");
    setDogOtherDog("");
    setDogStranger("");
    setMessage("No data found for the specified dog.");
  };

  // Handles selecting a dog breed, fetches its data, or uses cached data
  const handleSelect = async (breed) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(breed));
      if (existingData) {
        if (existingData === "empty") {
          handleDogInfo();
        } else {
          setDogBreed(breed);
          const customName = customNames[breed];
          setDogName(customName || existingData.name);
          setDogImage(existingData.image_link);
          setDogHeight(existingData.min_height_female);
          setDogWeight(existingData.min_weight_female);
          setDogChildren(existingData.good_with_children);
          setDogOtherDog(existingData.good_with_other_dogs);
          setDogStranger(existingData.good_with_strangers);
          setMessage("");
        }
      } else {
        const data = await getDogInfo(breed);
        if (data.length > 0) {
          const dog = data[0];
          localStorage.setItem(breed, JSON.stringify(dog));
          setDogBreed(breed);
          const customName = customNames[breed];
          setDogName(customName || dog.name);
          setDogHeight(dog.min_height_female);
          setDogWeight(dog.min_weight_female);
          setDogImage(dog.image_link);
          setDogChildren(dog.good_with_children);
          setDogOtherDog(dog.good_with_other_dogs);
          setDogStranger(dog.good_with_strangers);
          setMessage("");
        } else {
          localStorage.setItem(breed, JSON.stringify("empty"));
          handleDogInfo();
        }
      }
    } catch (error) {
      setMessage("Error fetching dog information. Please try again later.");
    }
  };

  //Initially load the data when page is rendered
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await getDogBreeds();
        const breedNames = Object.keys(data.message);
        handleSelect(breedNames[0]); // Call handleSelect with the first breed in the list
        setBreeds(breedNames);
        localStorage.setItem("breeds", JSON.stringify(breedNames));
      } catch (error) {
        message.error("Error fetching dog breeds:", error.message);
      }
    };

    try {
      const initialBreeds = JSON.parse(localStorage.getItem("breeds"));
      if (initialBreeds) {
        setBreeds(initialBreeds);
        handleSelect(initialBreeds[0]);
      } else {
        fetchBreeds();
      }
    } catch (error) {
      message.error("Error parsing JSON:", error.message);
    }
  }, []);

  // Function to change the name of the pet on the card
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);
  const handleCloseSave = (petNameInput, breed) => {
    setShow(false);
    setDogName(petNameInput);
    setCustomNames((prev) => ({
      ...prev,
      [breed]: petNameInput,
    }));

    localStorage.setItem(
      "customNames.dogs",
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
          onSelect={handleSelect}
          onSearch={handleSearch}
          placeholder={searchBarText}
        >
          <Input.Search enterButton />
        </AutoComplete>

        <div className="breed-header">{dogBreed}</div>
      </div>

      <div className="container">
        <List
          size="small"
          bordered
          dataSource={breeds}
          renderItem={(breed) => (
            <List.Item onClick={() => handleSelect(breed)}>
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </List.Item>
          )}
          style={{ overflowY: "auto"}}
        />

        {!dogImage && message && <h3 className="alert-message">{message}</h3>}
        {dogImage && !message && (
          <Card>
            <Card.Img
              variant="top"
              src={dogImage}
              alt={dogBreed}
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
            <Card.Body>
              <Card.Title>{dogBreed && `Breed: ${dogBreed}`}</Card.Title>
              <Card.Title>
                {dogName &&
                  `Name: ${customNames[dogBreed] || "Give your pet a name;))"}`}
              </Card.Title>
              <Card.Text>
                {dogWeight && `Weight: ${dogWeight} pounds`}
                <br />
                {dogHeight && `Height: ${dogHeight} inches`}
              </Card.Text>
              <Chart
                children={dogChildren}
                otherPets={dogOtherDog}
                people={dogStranger}
              />
              <div className="button-wrapper">
                <Button
                  onClick={handleShow}
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                >
                  Name your dog
                </Button>

                <NameCustomizeModal
                  show={show}
                  handleClose={handleClose}
                  handleCloseSave={handleCloseSave}
                  breed={dogBreed}
                />

                <Button
                  variant="primary"
                  onClick={() => {
                    addToDogCollection({
                      key: dogBreed,
                      icon: dogImage,
                      label: dogName,
                    });
                  }}
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
          dogCollection.map((dog) => {
            if (dog.key === selectedCollectionDog.key) {
              return (
                <ImageModal
                  key={dog.key}
                  src={dog.imageUrl}
                  alt={dog.key}
                  caption={dog.label}
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

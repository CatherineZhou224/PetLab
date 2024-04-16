import React, { useEffect, useState } from "react";
import { AutoComplete, Input, List } from "antd";
import { getDogBreeds, getDogInfo } from "../utils/utils";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BarChart } from "@mui/x-charts/BarChart";

import ImageModal from "./ImageModal";
import NameCustomizeModal from "./NameCustomizeModal";

export function DogInfo({
  addToDogCollection,
  removeDogCollection,
  dogCollection,
  updateCollectionName,
}) {
  const [breeds, setBreeds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dogName, setDogName] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [dogChildren, setDogChildren] = useState("");
  const [dogOtherDog, setDogOtherDog] = useState("");
  const [dogStranger, setDogStranger] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = (value) => {
    const filteredBreeds = breeds.filter((breed) => breed.startsWith(value));
    setSearchResults(filteredBreeds);
  };

  const handleSelect = async (breed) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(breed));
      if (existingData) {
        if (existingData === "empty") {
          setDogName("");
          setDogImage("");
          setDogChildren("");
          setDogOtherDog("");
          setDogStranger("");
          setMessage("No data found for the specified dog.");
        } else {
          setDogName(existingData.name);
          setDogImage(existingData.image_link);
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
          setDogName(dog.name);
          setDogImage(dog.image_link);
          setDogChildren(dog.good_with_children);
          setDogOtherDog(dog.good_with_other_dogs);
          setDogStranger(dog.good_with_strangers);
          setMessage("");
        } else {
          localStorage.setItem(breed, JSON.stringify("empty"));
          setDogName("");
          setDogImage("");
          setDogChildren("");
          setDogOtherDog("");
          setDogStranger("");
          setMessage("No data found for the specified dog:(");
        }
      }
    } catch (error) {
      console.error("Error fetching dog information:", error);
      setMessage("Error fetching dog information. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await getDogBreeds();
        const breedNames = Object.keys(data.message);
        setBreeds(breedNames);
        localStorage.setItem("breeds", JSON.stringify(breedNames));
      } catch (error) {
        console.error("Error fetching dog breeds:", error);
      }
    };

    try {
      const initialBreeds = localStorage.getItem("breeds");
      console.log("Initial breeds from localStorage:", initialBreeds);

      if (initialBreeds) {
        setBreeds(JSON.parse(initialBreeds));
      } else {
        fetchBreeds();
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    handleSelect("affenpinscher");
  }, []);

  const handleRemoveClick = (e, dogName) => {
    e.stopPropagation(); // Prevents List.Item onClick from being triggered
    removeDogCollection(dogName);
  };

  // hover effect
  // const [showPopup, setShowPopup] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (event) => {
  //   const cursorX = event.clientX,
  //     cursorY = event.clientY;
  //   const itemLeft = event.target.getBoundingClientRect().left,
  //     itemTop = event.target.getBoundingClientRect().top;

  //   const positionX = cursorX - itemLeft,
  //     positionY = cursorY - itemTop - window.scrollY;

  //   setPosition({
  //     x: positionX,
  //     y: positionY,
  //   });
  // };

  // const handleMouseEnter = (event) => {
  //   event.preventDefault();
  //   setShowPopup(true);
  //   console.log("showPopup", showPopup);
  //   console.log("position", position);
  // };

  // const handleMouseLeave = () => {
  //   setShowPopup(false);
  // };

  //image modal
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const showModal = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up further
    const index = e.currentTarget.alt.split(" ")[1];

    if (index !== undefined) {
      setIsOpen(true);
      setSelectedCollectionIndex(parseInt(index, 10)); // Parse the index to ensure it's a number
      console.log("Selected Collection Index:", index);
    } else {
      console.error("Invalid index extracted from alt attribute");
    }
  };

  // Function to handle selecting a pet from the collection and give it a name
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);
  const handleCloseSave = (petNameInput) => {
    setShow(false);
    setDogName(petNameInput);
  };

  return (
    <>
      <AutoComplete
        style={{ width: 300, marginBottom: 20 }}
        options={searchResults.map((breed) => ({ value: breed }))}
        onSelect={handleSelect}
        onSearch={handleSearch}
        placeholder="Search for dog breeds"
      >
        <Input.Search enterButton />
      </AutoComplete>

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
          style={{ width: "300px", maxHeight: "600px", overflowY: "scroll" }}
        />

        <div>
          {!dogImage && message && <h3>{message}</h3>}
          {dogImage && !message && (
            <Card style={{ width: "25rem" }}>
              <Card.Img
                variant="top"
                src={dogImage}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{dogName && `Name: ${dogName}`}</Card.Title>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["Children", "Other Dogs", "Strangers"],
                      label: "Friendliness Level with Other Species",
                    },
                  ]}
                  series={[
                    {
                      data: [dogChildren, dogOtherDog, dogStranger],
                    },
                  ]}
                  width={400}
                  height={300}
                />
                {/* {showPopup && (
                  <div
                    className="popup"
                    style={{
                      position: "absolute",
                      left: `${position.x + 150}px`,
                      top: `${position.y + 250}px`,
                      // pointerEvents: 'none',
                    }}
                  >
                    Click me!
                  </div>
                )} */}

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
                />

                <Button
                  variant="primary"
                  onClick={() => {
                    addToDogCollection({
                      key: `dog ${dogCollection.length}`,
                      icon: (
                        <span>
                          <span
                            className="remove-button"
                            onClick={(e) => handleRemoveClick(e, dogName)}
                          >
                            ❌
                          </span>
                          <img
                            onClick={(e) => showModal(e)}
                            className="image"
                            src={dogImage}
                            alt={`dog ${dogCollection.length}`}
                            style={{ width: "30px", height: "30px" }}
                          />
                        </span>
                      ),
                      label: dogName,
                    });
                  }}
                >
                  Add to collection
                </Button>
              </Card.Body>
            </Card>
          )}

          {/* image modal */}
          {isOpen &&
            dogCollection.map((dog, index) => {
              if (index === selectedCollectionIndex) {
                return (
                  <ImageModal
                    key={index}
                    src={dog.icon.props.children[1].props.src}
                    alt={`dog ${index}`}
                    caption={dogName}
                    handleCloseSave={handleCloseSave}
                    onClose={() => setIsOpen(false)}
                    updateCollectionName={updateCollectionName}
                  />
                );
              }
            })}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import catBreeds from "../utils/catBreeds";
import { getCatInfo } from "../utils/utils";
import { AutoComplete, Input, List } from "antd";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BarChart } from "@mui/x-charts/BarChart";

import ImageModal from "./ImageModal";
import NameCustomizeModal from "./NameCustomizeModal";

export function CatInfo({
  addToCatCollection,
  catCollection,
  updateCollectionName,
  isOpen,
  setIsOpen,
  selectedCollectionCat,
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

  const [customNames, setCustomNames] = useState(() => {
    const storedCustomNames = localStorage.getItem("customNames");
    return storedCustomNames ? JSON.parse(storedCustomNames) : {};
  });

  const handleSearch = (value) => {
    const filteredBreeds = catBreeds.filter((breed) => breed.startsWith(value));
    setSearchResults(filteredBreeds);
  };

  const handleClick = async (breed) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(breed));
      if (existingData) {
        if (existingData === "empty") {
          setCatBreed("");
          setCatName("");
          setCatLength("");
          setCatOrigin("");
          setCatImage("");
          setCatChildren("");
          setCatOtherPets("");
          setCatFamily("");
          setMessage("No data found for the specified cat.");
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
          setCatBreed("");
          setCatName("");
          setCatLength("");
          setCatOrigin("");
          setCatImage("");
          setCatChildren("");
          setCatOtherPets("");
          setCatFamily("");
          setMessage("No data found for the specified cat.");
        }
      }
    } catch (error) {
      console.error("Error fetching cat information:", error);
      setMessage("Error fetching cat information. Please try again later.");
    }
  };

  useEffect(() => {
    handleClick("Abyssinian");
  }, []);


   // Function to change the name of the pet on the card
   const [show, setShow] = useState(false);
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
 
     console.log("Custom cat names:", customNames);
   };


  return (
    <>
      <AutoComplete
        style={{ width: 300, marginBottom: 0 }}
        options={searchResults.map((breed) => ({ value: breed }))}
        onSelect={handleClick}
        onSearch={handleSearch}
        placeholder="Search for cat breeds"
      >
        <Input.Search enterButton />
      </AutoComplete>

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
          style={{ width: "300px", maxHeight: "600px", overflowY: "scroll" }}
        />
        <div>
          {!catImage && message && <h3 className="alert-message">{message}</h3>}
          {catImage && !message && (
            <Card style={{ width: "95%" }}>
              <Card.Img
                variant="top"
                src={catImage}
                alt={catBreed}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
              <Card.Title>{catBreed && `Breed: ${catBreed}`}</Card.Title>
                <Card.Title>
                  {catName &&
                    `Name: ${
                      customNames[catBreed] || "Give your pet a name;))"
                    }`}
                </Card.Title>
                <Card.Text>
                  {catOrigin && `Origin: ${catOrigin}`}
                  <br />
                  {catLength && `Length: ${catLength}`}
                </Card.Text>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["with Children", "with Dogs", "with Strangers"],
                      label: "Friendliness Level",
                    },
                  ]}
                  series={[
                    {
                      data: [catChildren, catOtherPets, catFamily],
                    },
                  ]}
                  width={400}
                  height={250}
                />
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
              </Card.Body>
            </Card>
          )}

          {/* image modal */}
          {isOpen &&
            catCollection.map((cat, index) => {
              console.log("selectedCollectionCat", selectedCollectionCat);
              console.log("what cat", cat);
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
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Children", "Other Pets", "Family"],
              label: "Friendliness Level with Other Species",
            },
          ]}
          series={[
            {
              data: [catChildren, catOtherPets, catFamily],
            },
          ]}
          width={400}
          height={300}
        />
      </div>
    </>
  );
}

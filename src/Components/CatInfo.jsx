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
  removeCatCollection,
  catCollection,
  updateCollectionName,
}) {
  const [catImage, setCatImage] = useState("");
  const [catName, setCatName] = useState("");
  const [catLength, setCatLength] = useState("");
  const [catOrigin, setCatOrigin] = useState("");
  const [catChildren, setCatChildren] = useState("");
  const [catOtherPets, setCatOtherPets] = useState("");
  const [catFamily, setCatFamily] = useState("");
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (value) => {
    const filteredBreeds = catBreeds.filter((breed) => breed.startsWith(value));
    setSearchResults(filteredBreeds);
  };

  const handleClick = async (breed) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(breed));
      if (existingData) {
        if (existingData === "empty") {
          setCatName("");
          setCatLength("");
          setCatOrigin("");
          setCatImage("");
          setCatChildren("");
          setCatOtherPets("");
          setCatFamily("");
          setMessage("No data found for the specified cat.");
        } else {
          setCatName(existingData.name);
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
          setCatName(cat.name);
          setCatLength(cat.length);
          setCatOrigin(cat.origin);
          setCatImage(cat.image_link);
          setCatChildren(cat.children_friendly);
          setCatOtherPets(cat.other_pets_friendly);
          setCatFamily(cat.family_friendly);
          setMessage("");
        } else {
          localStorage.setItem(breed, JSON.stringify("empty"));
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

  const handleRemoveClick = (e, catName) => {
    e.stopPropagation(); // Prevents List.Item onClick from being triggered
    removeCatCollection(catName);
  };

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
    setCatName(petNameInput);
  };

  return (
    <>
      <AutoComplete
        style={{ width: 300, marginBottom: 20 }}
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
          {!catImage && message && <h3>{message}</h3>}
          {catImage && !message && (
            <Card style={{ width: "25rem" }}>
              <Card.Img
                variant="top"
                src={catImage}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{catName && `Name: ${catName}`}</Card.Title>
                <Card.Text>
                  {catOrigin && `Origin: ${catOrigin}`}
                  <br />
                  {catLength && `Length: ${catLength}`}
                </Card.Text>
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
                />

                <Button
                  variant="primary"
                  onClick={() =>
                    addToCatCollection({
                      key: `cat ${catCollection.length}`,
                      icon: (
                        <span>
                          <span
                            className="remove-button"
                            onClick={(e) => handleRemoveClick(e, catName)}
                          >
                            ❌
                          </span>
                          <img
                            onClick={(e) => showModal(e)}
                            className="image"
                            src={catImage}
                            alt={`cat ${catCollection.length}`}
                            style={{ width: "30px", height: "30px" }}
                          />
                        </span>
                      ),
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
              if (index === selectedCollectionIndex) {
                return (
                  <ImageModal
                    key={index}
                    src={cat.icon.props.children[1].props.src}
                    alt={`cat ${index}`}
                    caption={catName}
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

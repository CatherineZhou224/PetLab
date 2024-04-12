import React, { useEffect, useState } from "react";
import { AutoComplete, Input, List, Typography, Card } from "antd";
import { getDogBreeds, getDogInfo } from "../utils/utils";
import { Button } from "react-bootstrap";

export function DogInfo(
  { addToDogCollection, removeCatCollection, handleSelectCat }
) {
  const [breeds, setBreeds] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  // const [selectedBreed, setSelectedBreed] = useState(null);
  const [dogName, setDogName] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBreeds = async () => {
      const data = await getDogBreeds();
      const breedNames = Object.keys(data.message);
      setBreeds(breedNames);
      // setSearchResults(breedNames);
    };
    fetchBreeds();
    handleSelect("affenpinscher");
  }, []);

  // const handleSearch = (value) => {
  //   const filteredBreeds = breeds.filter((breed) => breed.startsWith(value));
  //   setSearchResults(filteredBreeds);
  // };

  const handleSelect = async (breed) => {
    try {
      const data = await getDogInfo(breed);
      if (data.length > 0) {
        const dog = data[0];
        setDogName(dog.name);
        setDogImage(dog.image_link);
        setMessage();
      } else {
        setDogName();
        setDogImage();
        setMessage("No data found for the specified dog.");
      }
    } catch (error) {
      console.error("Error fetching dog information:", error);
    }
  };

  const handleRemoveClick = (e, dogName) => {
    e.stopPropagation(); // Prevents List.Item onClick from being triggered
    removeCatCollection(dogName);
  };

  return (
    <>
      {/* <AutoComplete
        style={{ width: 300, marginBottom: 20 }}
        options={searchResults.map((breed) => ({ value: breed }))}
        onSelect={handleSelect}
        onSearch={handleSearch}
        placeholder="Search for dog breeds"
      >
        <Input.Search enterButton />
      </AutoComplete> */}
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
          {message && <p>{message}</p>}
          {dogName && <p>Name: {dogName}</p>}
          {dogImage && <img className="image" src={dogImage} />}
        </div>

        <Button
          variant="primary"
          onClick={() =>
            addToDogCollection({
              key: dogName,
              icon: (
                <span 
                  // onClick={() => handleSelecCat(cat)}
                >
                  <span
                    className="remove-button"
                    onClick={(e) => handleRemoveClick(e, dogName)}
                  >
                    ❌
                  </span>
                  <img
                    src={dogImage}
                    alt={dogName}
                    style={{ width: "30px", height: "30px" }}
                  />
                </span>
              ),
              label: dogName,
            })
          }
        >
          Add to collection
        </Button>

      </div>
    </>
  );
}

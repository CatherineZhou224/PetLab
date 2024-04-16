import React, { useEffect, useState } from "react";
import catBreeds from "../utils/catBreeds";
import { getCatInfo } from "../utils/utils";
import { List } from "antd";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export function CatInfo({
  addToCatCollection,
  removeCatCollection,
  handleCustomizeCat,
}) {
  const [catImage, setCatImage] = useState("");
  const [catName, setCatName] = useState("");
  const [catLength, setCatLength] = useState("");
  const [catOrigin, setCatOrigin] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async (breed) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(breed));
      if (existingData) {
        setCatName(existingData.name);
        setCatLength(existingData.length);
        setCatOrigin(existingData.origin);
        setCatImage(existingData.image_link);
        setMessage("");
      } else {
        const data = await getCatInfo(breed);
        if (data.length > 0) {
          const cat = data[0];
          localStorage.setItem(breed, JSON.stringify(cat));
          setCatName(cat.name);
          setCatLength(cat.length);
          setCatOrigin(cat.origin);
          setCatImage(cat.image_link);
          setMessage("");
          // Log or handle other properties as needed
        } else {
          setCatName("");
          setCatImage("");
          setMessage("No data found for the specified cat.");
        }
      }
    } catch (error) {
      console.error("Error fetching cat information:", error);
      setMessage("Error fetching cat information. Please try again later.");
      // Handle errors, such as network errors or server errors
    }
  };

  useEffect(() => {
    handleClick("Abyssinian");
  }, []);

  const handleRemoveClick = (e, catName) => {
    e.stopPropagation(); // Prevents List.Item onClick from being triggered
    removeCatCollection(catName);
  };

  return (
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
          <Card style={{ width: "20rem" }}>
            <Card.Img
              variant="top"
              src={catImage}
              style={{
                width: 318,
                height: 288,
                objectFit: "cover",
                transition: "transform 0.2s",
              }}
              className="zoom"
            />
            <Card.Body>
              <Card.Title>{catName && `Name: ${catName}`}</Card.Title>
              <Card.Text>
                {catOrigin && `Origin: ${catOrigin}`}
                <br />
                {catLength && `Length: ${catLength}`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() =>
                  addToCatCollection({
                    key: catName,
                    icon: (
                      <span onClick={() => handleCustomizeCat(cat)}>
                        <span
                          className="remove-button"
                          onClick={(e) => handleRemoveClick(e, catName)}
                        >
                          ❌
                        </span>
                        <img
                          src={catImage}
                          alt={catName}
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
      </div>
    </div>
  );
}

import React from "react";
import catBreeds from "../utils/catBreeds";
import { getCatInfo } from "../utils/utils";
import { useEffect, useState } from "react";
import { List } from "antd";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalImage from "react-modal-image";

export function CatInfo({
  addToCatCollection,
  removeCatCollection,
  handleCustomizeCat,
}) {
  const [catImage, setCatImage] = useState("");
  const [catName, setCatName] = useState("");
  const [catLength, setCatLength] = useState("");
  const [catOrigin, setCatOrigin] = useState("");

  const handleClick = async (item) => {
    try {
      const data = await getCatInfo(item);
      if (data.length > 0) {
        const cat = data[0];
        setCatName(cat.name);
        setCatLength(cat.length);
        setCatOrigin(cat.origin);
        setCatImage(cat.image_link);
        // Log or handle other properties as needed
      } else {
        console.log("No data found for the specified cat.");
      }
    } catch (error) {
      console.error("Error fetching cat information:", error);
      // Handle errors, such as network errors or server errors
    }
  };

  useEffect(() => {
    handleClick("Abyssinia");
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
        renderItem={(item) => (
          <List.Item onClick={() => handleClick(item)}>{item}</List.Item>
        )}
        style={{ width: "300px", maxHeight: "600px", overflowY: "scroll" }}
      />
      <div>

        <Card style={{ width: '20rem' }}>
      <Card.Img 
        variant="top" 
        as={() => 
          <ModalImage 
            small={catImage && catImage } 
            large={catImage && catImage }
            alt={catName && catName}
          />}
      />
      <Card.Body>
        <Card.Title>{catName && `Name: ${catName}`}</Card.Title>
        <Card.Text>
          {catOrigin && `Origin: ${catOrigin}`}<br/>
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

      </div>
    </div>
  );
}

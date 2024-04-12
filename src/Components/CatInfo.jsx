import React from "react";
import catBreeds from "../utils/catBreeds";
import { getCatInfo } from "../utils/utils";
import { useEffect, useState } from "react";
import { List } from "antd";
export function CatInfo() {
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
        {catName && <p>Name: {catName}</p>}
        {catOrigin && <p>Origin: {catOrigin}</p>}
        {catLength && <p>Length: {catLength}</p>}
        {catImage && <img className="image" src={catImage} />}
      </div>
    </div>
  );
}

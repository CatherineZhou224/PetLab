// Base URL for API requests to the API Ninjas service
const origin = "https://api.api-ninjas.com";
// API key for authenticating requests to API Ninjas
const apiKey = "Sa0eeELwmGo9mKcWOt544g==QUo2n0VoSX5vGfGl";

// Function to fetch a list of all dog breeds using the dog.ceo API
export const getDogBreeds = async () => {
  const url = "https://dog.ceo/api/breeds/list/all";

  const response = await fetch(url);
  return response.json();
};

// Function to fetch detailed information about a specific dog breed from API Ninjas
export const getDogInfo = async (dogBreed) => {
  const url = new URL(`${origin}/v1/dogs`);
  url.searchParams.append("name", dogBreed);

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  return response.json();
};

// Function to fetch detailed information about a specific cat breed from API Ninjas
export const getCatInfo = async (catBreed) => {
  const url = new URL(`${origin}/v1/cats`);
  url.searchParams.append("name", catBreed);

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  return response.json();
};

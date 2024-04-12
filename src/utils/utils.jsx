const origin = "https://api.api-ninjas.com";
const apiKey = "Sa0eeELwmGo9mKcWOt544g==QUo2n0VoSX5vGfGl";

export const getDogBreeds = async () => {
  const url = "https://dog.ceo/api/breeds/list/all";

  const response = await fetch(url);
  return response.json();
};

export const getDogInfo = async (dogBreed) => {
  const url = new URL(`${origin}/v1/dogs`);
  url.searchParams.append("name", { dogBreed });

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  return response.json();
};

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

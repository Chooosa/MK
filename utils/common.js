export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  
  if (className) {
    $tag.classList.add(className);
  }
  
  return $tag;
};

export const getRandomInt = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  
  return Math.floor(random);
};

export const getTime = () => {
  const date = new Date();
  const minutes = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  const seconds = `${date.getSeconds() < 10 ? "0" : ""}${date.getSeconds()}`;
  
  return `${date.getHours()}:${minutes}:${seconds}`;
};
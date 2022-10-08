const Ship = (len) => {
  const length = len;
  let numHits = 0;
  const hit = () => {
    numHits += 1;
  };
  const isSunk = () => {
    return numHits === length;
  };
  return { hit, isSunk, length };
};

export default Ship;

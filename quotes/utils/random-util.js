const RandomUtil = () => {

  const randomIndex = (length) => {
    return parseInt(Math.random() * length);
  }
  
  return {
    randomIndex,

  }
}
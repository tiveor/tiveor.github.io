const ImageUtil = () => {

  const getBackgroundImage = ({ width = 1024, height = 768 }) => {
    return `https://source.unsplash.com/random/${width}x${height}`;
  }

  return {
    getBackgroundImage,
  }
}
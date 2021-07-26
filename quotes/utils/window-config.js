const WindowConfig = () => {
  const getParams = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
  }

  const getWidthFrame = () => {
    return window.innerWidth;
  }

  const getHeightFrame = () => {
    return window.innerHeight;
  }

  const getWidthScreen = () => {
    return getWidthFrame() || window.screen.width;
  }

  const getHeightScreen = () => {
    return getHeightFrame() || window.screen.height;
  }

  return {
    getParams,
    getWidthFrame,
    getHeightFrame,
    getWidthScreen,
    getHeightScreen,
  }
}
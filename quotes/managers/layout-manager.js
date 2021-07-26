const LayoutManager = ({ width, height } = {}) => {
  const getRepeat = () => {
    return WindowConfig().getWidthFrame() <= CardManager({ width, height }).getMaxWidth()
      || WindowConfig().getHeightFrame() <= CardManager({ width, height }).getMaxHeight();
  }

  const getRepeatString = () => {
    return getRepeat() ? 'repeat' : 'no-repeat';
  }

  const randomColorVar = () => {
    return parseInt(Math.random() * 256);
  }

  const randomColorful = () => {
    return `rgba(${randomColorVar()},${randomColorVar()},${randomColorVar()}, 1)`
  }

  const randomGrayColor = () => {
    const u = randomColorVar();
    return `rgba(${u},${u},${u}, 1)`
  }

  return {
    getRepeat,
    getRepeatString,
    randomColorful,
    randomGrayColor,
  };
}
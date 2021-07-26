const CardManager = ({ width, height } = {}) => {

  const getMaxWidth = () => {
    return width || 1024;
  }

  const getMaxHeight = () => {
    return height || 768;
  }

  const getWidthCard = () => {
    const widthFrame = WindowConfig().getWidthFrame();
    return widthFrame > getMaxWidth() ? getMaxWidth() : widthFrame;
  }

  const getHeightCard = () => {
    const heightFrame = WindowConfig().getHeightFrame();
    return heightFrame > getMaxHeight() ? getMaxHeight() : heightFrame;
  }

  const getWidthCardResponsive = () => {
    return LayoutManager({ width, height }).getRepeat() ? WindowConfig().getWidthScreen() : CardManager({ width, height }).getWidthCard();
  }

  const getHeightCardResponsive = () => {
    return LayoutManager({ width, height }).getRepeat() ? WindowConfig().getHeightScreen() : CardManager({ width, height }).getHeightCard();
  }

  const getHeightForQuote = () => {
    const fixHeightGap = 100;
    return (LayoutManager({ width, height }).getRepeat() ? WindowConfig().getHeightScreen() : CardManager({ width, height }).getHeightCard()) - fixHeightGap;
  }

  return {
    getMaxHeight,
    getMaxWidth,
    getWidthCardResponsive,
    getHeightCardResponsive,
    getWidthCard,
    getHeightCard,
    getHeightForQuote,
  }
}
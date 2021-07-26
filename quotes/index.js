const MainComponent = () => {

  //GLOBALS
  const getData = () => {
    return ppg_tips;
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

  //LOCALS
  const getMaxWidth = () => {
    return 1024;
  }

  const getMaxHeight = () => {
    return 768;
  }

  const getWidthCard = () => {
    return getWidthFrame() > getMaxWidth() ? getMaxWidth() : getWidthFrame();
  }

  const getHeightCard = () => {
    return getHeightFrame() > getMaxHeight() ? getMaxHeight() : getHeightFrame();
  }

  const getRepeat = () => {
    return getWidthFrame() <= getMaxWidth() || getHeightFrame() <= getMaxHeight();
  }

  const getRepeatString = () => {
    return getRepeat() ? 'repeat' : 'no-repeat';
  }

  const getWidthCardResponsive = () => {
    return getRepeat() ? getWidthScreen() : getWidthCard();
  }

  const getHeightCardResponsive = () => {
    return getRepeat() ? getHeightScreen() : getHeightCard();
  }

  const getHeightQuote = () => {
    const fixHeightGap = 100;
    return (getRepeat() ? getHeightScreen() : getHeightCard()) - fixHeightGap;
  }

  const randomIndex = () => {
    return parseInt(Math.random() * getData().length);
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

  const getParams = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
  }

  const getBackgroundImage = ({ width, height }) => {
    return `url("https://source.unsplash.com/random/${width}x${height}")`;
  }

  const getQuote = () => {
    const tipIndex = getTipIndex();
    return { index: tipIndex, message: getData()[tipIndex] };
  }

  const get

  const getTipIndex = () => {
    const params = getParams();
    if (params.tip) {
      const tip = parseInt(params.tip);
      if (tip > 0 && tip <= getData().length) {
        return tip - 1;
      }
    }
    return randomIndex();
  }

  const renderTitle = ({ tipNumber }) => {
    return (
      <div className="container-title" >
        <span className="title">
          Tip #{tipNumber}
        </span>
        <br />
        <span className="subtitle">
          Pragmatic Programmer
        </span>
        <br />
      </div>
    )
  }

  const renderQuote = ({ height, quote }) => {
    return (
      <div className="container-quote" style={{
        height: height,
      }}>
        <span className="quote">{quote}</span>
      </div>
    )
  }

  const renderCard = ({ quote: quote }) => {
    return (
      <div className="card" style={{
        backgroundImage: getBackgroundImage({ width: getWidthCard(), height: getHeightCard() }),
        backgroundColor: randomGrayColor(),
        backgroundRepeat: getRepeatString(),
        width: getWidthCardResponsive(),
        height: getHeightCardResponsive(),
      }}>
        <div className="glass" style={{
          width: getWidthCardResponsive(),
          height: getHeightCardResponsive(),
        }}>
          {renderTitle({ tipNumber: quote.index + 1 })}
          {renderQuote({ height: getHeightQuote(), quote: quote.message })}
        </div>
      </div>
    )
  }


  return renderCard({ quote: getQuote() });
}

ReactDOM.render(
  <MainComponent />,
  document.getElementById("root")
)
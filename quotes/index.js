const MainComponent = () => {

  const getData = () => {
    return ppg_tips;
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

  const index = getTipIndex();
  const maxWidth = 1024;
  const maxHeight = 768;
  const repeat = window.innerWidth <= maxWidth || window.innerHeight <= maxHeight;

  const width = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
  const height = window.innerHeight > maxHeight ? maxHeight : window.innerHeight;
  const widthScreen = window.innerWidth || window.screen.width;
  const heightScreen = window.innerHeight || window.screen.height;

  return (
    <div className="card" style={{
      backgroundImage: getBackgroundImage({ width: width, height: height }),
      backgroundColor: randomGrayColor(),
      backgroundRepeat: (repeat ? 'repeat' : 'no-repeat'),
      width: repeat ? widthScreen : width,
      height: repeat ? heightScreen : height,
    }}>
      <div className="glass" style={{
        width: repeat ? widthScreen : width,
        height: repeat ? heightScreen : height,
      }}>
        {renderTitle({ tipNumber: index + 1 })}
        {renderQuote({ height: (repeat ? heightScreen : height) - 100, quote: getData()[index] })}
      </div>
    </div>
  )
}

ReactDOM.render(
  <MainComponent />,
  document.getElementById("root")
)
const MainComponent = () => {
  const randomIndex = () => {
    return parseInt(Math.random() * ppg_tips.length);
  }

  const randomColorVar = () => {
    return parseInt(Math.random() * 256);
  }

  const randomColor = () => {
    return `rgba(${randomColorVar()},${randomColorVar()},${randomColorVar()}, 1)`
  }

  const getParams = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
  }


  const getTipIndex = () => {
    const params = getParams();
    if (params.tip) {
      const tip = parseInt(params.tip);
      if (tip > 0 && tip <= ppg_tips.length) {
        return tip - 1;
      }
    }
    return randomIndex();
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
      backgroundImage: `url("https://source.unsplash.com/random/${width}x${height}")`,
      backgroundColor: randomColor(),
      backgroundRepeat: (repeat ? 'repeat' : 'no-repeat'),
      width: repeat ? widthScreen : width,
      height: repeat ? heightScreen : height,
    }}>
      <div className="glass" style={{
        width: repeat ? widthScreen : width,
        height: repeat ? heightScreen : height,
      }}>
        <div className="inner" >
          <span className="title">
            Tip #{index + 1}
          </span>
          <br />
          <span className="subtitle">
            Pragmatic Programmer
          </span>
          <br />
        </div>
        <div className="container" style={{
          height: (repeat ? heightScreen : height) - 100,
        }}>
          <span className="quote">{ppg_tips[index]}</span>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <MainComponent />,
  document.getElementById("root")
)
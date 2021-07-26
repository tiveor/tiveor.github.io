const CardComponent = ({ title, subtitle, message, width = 1024, height = 768 }) => {
  const renderTitle = ({ title, subtitle }) => {
    return (
      <div className="container-title">
        <span className="title">
          {title}
        </span>
        <br />
        <span className="subtitle">
          {subtitle}
        </span>
        <br />
      </div>
    )
  }

  const renderMessage = ({ height, message }) => {
    return (
      <div className="container-message" style={{
        height: height,
      }}>
        <span className="message">{message}</span>
      </div>
    )
  }

  return (
    <div className="card" style={{
      backgroundColor: LayoutManager().randomGrayColor(),
      backgroundImage: `url(${ImageUtil().getBackgroundImage({ width, height })})`,
      width: CardManager({ width, height }).getWidthCardResponsive(),
      height: CardManager({ width, height }).getHeightCardResponsive(),
    }}>
      <div className="glass" style={{
        width: CardManager({ width, height }).getWidthCardResponsive(),
        height: CardManager({ width, height }).getHeightCardResponsive(),
      }}>
        {renderTitle({ title: title, subtitle: subtitle })}
        {renderMessage({ height: CardManager({ width, height }).getHeightForQuote(), message: message })}
      </div>
    </div>
  )
}
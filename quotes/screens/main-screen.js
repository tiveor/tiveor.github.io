const MainScreen = () => {

  const getQuote = () => {
    const tipIndex = getTipIndex();
    const data = DataConfig().getData();
    return {
      index: tipIndex,
      book: DataConfig().getSource(),
      message: data[tipIndex]
    };
  }

  const getTipIndex = () => {
    const index = getParamTipIndex();
    const dataLength = DataConfig().getDataLength();
    return index !== null && ArrayUtil().isIndexInRange(index, dataLength) ? index : RandomUtil().randomIndex(dataLength);
  }

  const getParamTipIndex = () => {
    const params = WindowConfig().getParams();
    return !params.tip ? null : parseInt(params.tip - 1);
  }

  return <QuoteComponent quote={getQuote()} />
}

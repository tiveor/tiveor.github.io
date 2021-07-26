const ArrayUtil = () => {
  const isIndexInRange = (index, length) => {
    return index >= 0 && index < length;
  }

  return {
    isIndexInRange
  }
}
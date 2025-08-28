const TruncateText = (text, maxLength = 90) => {
  if (text?.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export default TruncateText;

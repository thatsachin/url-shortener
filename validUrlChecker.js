const regex = /^(?:http:\/\/|https:\/\/)?([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]{1,5})?(\/[^\s]*)?$/;

const isValidUrl = (url) => {
  return regex.test(url);
};

export default isValidUrl
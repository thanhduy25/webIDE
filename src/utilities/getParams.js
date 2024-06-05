const getParams = () => {
  const queryString = window.parent.location.search.substring(1);
  const queryList = queryString.split("&");

  const params = {};
  for (const queryItem of queryList) {
    const pair = queryItem.split("=");
    params[pair[0]] = pair[1];
  }

  return params;
};

export default getParams;

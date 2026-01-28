const api = async (url: string, token?: string) => {
  const res = await fetch("http://localhost:5000" + url, {
    headers: token ? { Authorization: token } : {}
  });
  return res.json();
};

export { api };

const save = (key, item) => {
  try {
    const json = JSON.stringify(item);
    localStorage.setItem(key, json);
  } catch (error) {
    alert(error.message);
  }
};

const load = key => {
  try {
    const item = JSON.parse(localStorage.getItem(key));
    if (item && item.length) {
      return item;
    }
    return false;
  } catch (error) {
    alert(error.message);
  }
};

export { save, load };

const mapConfig = state => {
  let x = { ...state.editorConfig };

  let currentElems = x.settings.elements;
  let keepElementsTab = false;

  for (const key in currentElems) {
    let keep = false;
    let obj = currentElems[key];
    for (const elem in obj) {
      keep = keep || obj[elem];
    }

    if (!keep) currentElems[key] = false;
    keepElementsTab = keepElementsTab || keep;
  }

  x.settings.elements = keepElementsTab ? currentElems : false;

  return x;
};

export default mapConfig;

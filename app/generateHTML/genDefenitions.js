function createDefLi(def, ul) {
  const liEl = document.createElement(`li`);
  liEl.textContent = def.definition;
  ul.append(liEl);
}

function genDefenitions(definitions) {
  if (!definitions || definitions.length === 0) return false;

  const ulEl = document.createElement(`ul`);

  if (definitions.length > 4) {
    const defAr = definitions.slice(0, 4);
    defAr.forEach((def) => createDefLi(def, ulEl));
  } else {
    definitions.forEach((def) => createDefLi(def, ulEl));
  }
  return ulEl;
}

export { genDefenitions };

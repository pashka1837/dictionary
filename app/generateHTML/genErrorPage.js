export function genErrorHtml(result, smile = undefined) {
  const errorDiv = document.createElement(`div`);
  const smileEl = document.createElement(`p`);
  const titleEl = document.createElement(`h2`);
  const messageEl = document.createElement(`p`);

  errorDiv.classList.add(`errorFetch`);
  smileEl.classList.add(`smile`);
  messageEl.classList.add(`message`);

  smileEl.innerHTML = smile ?? `&#128533;`;
  titleEl.textContent = result.title;
  messageEl.textContent = `${result.message} ${result.resolution}`;

  errorDiv.append(smileEl, titleEl, messageEl);
  return errorDiv;
}

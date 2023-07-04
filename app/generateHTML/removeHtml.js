export function removeHtmlEl() {
  const mainDiv = document.querySelector(`.main`);
  const errorDiv = document.querySelector('.errorFetch');
  const introDiv = document.querySelector(`.phoneticAndAudio`);

  mainDiv && mainDiv.remove();
  introDiv && introDiv.remove();
  errorDiv && errorDiv.remove();
}

const loadingElement = document.createElement('ion-loading');

async function showLoader({ message }) {
  loadingElement.message = message;
  document.body.appendChild(loadingElement);
  await loadingElement.present();
}

function hideLoader() {
  loadingElement && loadingElement.dismiss();
}

export default {
  show: showLoader,
  hide: hideLoader,
};

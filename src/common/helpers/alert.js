export default function alert({ header, subHeader, message, buttons }) {
  const alertEl = document.createElement('ion-alert');
  alertEl.header = header;
  alertEl.subHeader = subHeader;
  alertEl.message = message;
  alertEl.buttons = buttons;

  document.body.appendChild(alertEl);
  return alertEl.present();
}

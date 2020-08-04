const fs = require('fs');
const fetchSheet = require('@flumens/fetch-onedrive-excel'); // eslint-disable-line

const drive =
  'sites/flumensio.sharepoint.com,6230bb4b-9d52-4589-a065-9bebfdb9ce63,21520adc-6195-4b5f-91f6-7af0b129ff5c/drive';
const file = '01UPL42ZRQLXRX3QVTOFCJUWSR6AJ3D7C7';
const sheet = 'species';

function saveSpeciesToFile(data, sheetName) {
  return new Promise((resolve, reject) => {
    const fileName = `./${sheetName}.json`;
    console.log(`Writing ${fileName}`);

    fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

(async () => {
  saveSpeciesToFile(await fetchSheet({ drive, file, sheet }), 'index');

  console.log('All done! 🚀');
})();

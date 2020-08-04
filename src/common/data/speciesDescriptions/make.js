const fs = require('fs');
const fetchSheet = require('@flumens/fetch-onedrive-excel'); // eslint-disable-line

const fileID = '013SAXWCB2VHYCCDY76FF3KGKPN7T55EU2';
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
  saveSpeciesToFile(await fetchSheet(fileID, 'species'), 'index');

  console.log('All done! 🚀');
})();

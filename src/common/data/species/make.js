require('dotenv').config({ silent: true, path: '../../../../.env' }); // eslint-disable-line

const axios = require('axios');
const fs = require('fs');

async function fetch() {
  const config = {
    method: 'get',
    url:
      'https://dunescapes.brc.ac.uk/api/v2/reports?report=projects/dunescapes/vegatation_taxon_list.xml',
    headers: {
      Authorization: `Bearer ${process.env.JWT_TOKEN}`,
    },
  };

  const { data } = await axios(config);

  return data.data;
}

function saveSpeciesToFile(data) {
  return new Promise((resolve, reject) => {
    const fileName = './index.json';
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
  const data = await fetch();
  await saveSpeciesToFile(data);
  console.log('All done! 🚀 ');
})();

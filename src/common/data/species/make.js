// eslint-disable-line
require('dotenv').config({ silent: true, path: '../../../../.env' });

const axios = require('axios');
const fs = require('fs');

async function fetch() {
  const config = {
    method: 'get',
    url: `https://warehouse1.indicia.org.uk/index.php/services/rest/reports/projects/dunescapes/vegatation_taxon_list.xml`,
    headers: {
      Authorization: `Bearer ${process.env.JWT_TOKEN}`,
    },
  };

  const { data } = await axios(config);

  const sortByRecommendedId = (s1, s2) =>
    s1.preferred_taxa_taxon_list_id.localeCompare(
      s2.preferred_taxa_taxon_list_id
    );
  return data.data.sort(sortByRecommendedId);
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

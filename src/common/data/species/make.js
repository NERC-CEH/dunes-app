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

  return data.data
    .map(s => ({
      id: null,
      preferred_taxa_taxon_list_id: null,
      taxon_meaning_id: null,
      external_key: null,
      taxon: null,
      preferred_taxon: null,
      common: null,
      family_taxon: null,
      taxon_group: null,
      taxon_group_id: null,
      short_list: null,
      long_list: null,
      strandline_embryo_mobile_dune: null,
      fixed_semi_fixed_dune: null,
      dune_heath: null,
      dune_slack: null,
      positive_health: null,
      negative_health: null,
      nitro_phobe: null,
      nitro_phile: null,
      ...s,
    }))
    .sort((s1, s2) =>
      s1.preferred_taxa_taxon_list_id.localeCompare(
        s2.preferred_taxa_taxon_list_id
      )
    );
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

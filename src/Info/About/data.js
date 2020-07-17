import HeretageFund from './images/Heritage-Fund.jpg';
import Life from './images/Life.jpg';
import NationalTrust from './images/National-Trust.jpg';
import Natura from './images/Natura2000.jpg';
import NaturalEngland from './images/Natural-England.jpg';
import NaturalReserveWales from './images/Natural-Reserve-Wales.jpg';
import Plantlife from './images/Plantlife.jpg';
import TheWildlifeTrust from './images/The-Wildlife-Trust.jpg';
import WelshBilingual from './images/Welsh-Bilingual.jpg';

const data = [
  {
    id: 1,
    url: 'https://www.nationaltrust.org.uk/',
    images: NationalTrust,
    size: 6,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    id: 2,
    url: 'https://www.gov.uk/government/organisations/natural-england',
    images: NaturalEngland,
    size: 6,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    id: 3,
    url: 'https://ec.europa.eu/easme/en/life',
    images: Natura,
    size: 6,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    id: 4,
    url: 'https://ec.europa.eu/easme/en/life',
    images: Life,
    size: 6,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    id: 5,
    url: 'https://naturalresources.wales/splash?orig=%2f&lang=cy',
    images: NaturalReserveWales,
    size: 12,
    width: '150px',
    alt: 'SponsorLogo',
  },
  {
    id: 6,
    url: 'https://www.heritagefund.org.uk/',
    images: HeretageFund,
    size: 12,
    width: '150px',
    alt: 'SponsorLogo',
    language: 'en',
  },
  {
    id: 7,
    url: 'https://www.heritagefund.org.uk/cy',
    images: WelshBilingual,
    size: 12,
    width: '150px',
    alt: 'SponsorLogo',
    language: 'cy',
  },
  {
    id: 8,
    url: 'https://www.wildlifetrusts.org/',
    images: TheWildlifeTrust,
    size: 6,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    id: 9,
    url: 'https://www.plantlife.org.uk/uk',
    images: Plantlife,
    size: 6,
    width: '100px',
    alt: 'SponsorLogo',
  },
];

export default data;

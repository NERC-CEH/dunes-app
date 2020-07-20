import HeretageFund from './images/Heritage-Fund.jpg';
import Life from './images/Life.jpg';
import NationalTrust from './images/National-Trust.jpg';
import Natura from './images/Natura2000.jpg';
import NaturalEngland from './images/Natural-England.jpg';
import NaturalReserveWales from './images/Natural-Reserve-Wales.jpg';
import Plantlife from './images/Plantlife.jpg';
import TheWildlifeTrust from './images/The-Wildlife-Trust.jpg';
import WelshBilingual from './images/Welsh-Bilingual.jpg';
import UKCEH from './images/UKCEH.png';

const data = [
  {
    url: 'https://www.nationaltrust.org.uk/',
    images: NationalTrust,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    url: 'https://www.gov.uk/government/organisations/natural-england',
    images: NaturalEngland,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    url: 'https://ec.europa.eu/environment/nature/natura2000/index_en.htm',
    images: Natura,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    url: 'https://ec.europa.eu/easme/en/life',
    images: Life,
    width: '100px',
    alt: 'SponsorLogo',
  },

  {
    url: 'https://www.wildlifetrusts.org/',
    images: TheWildlifeTrust,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    url: 'https://www.plantlife.org.uk/uk',
    images: Plantlife,
    width: '100px',
    alt: 'SponsorLogo',
  },
  {
    url: 'https://www.heritagefund.org.uk/',
    images: HeretageFund,
    width: '150px',
    alt: 'SponsorLogo',
    language: 'en',
  },
  {
    url: 'https://www.heritagefund.org.uk/cy',
    images: WelshBilingual,
    width: '150px',
    alt: 'SponsorLogo',
    language: 'cy',
  },
  {
    url: 'https://naturalresources.wales/splash?orig=%2f&lang=cy',
    images: NaturalReserveWales,
    width: '150px',
    alt: 'SponsorLogo',
  },
  {
    url: 'https://www.ceh.ac.uk',
    images: UKCEH,
    width: '150px',
    alt: 'SponsorLogo',
  },
];

export default data;

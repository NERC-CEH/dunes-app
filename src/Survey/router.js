import FixedPhotographyRoutes from './FixedPhotography/router';
import PlantQuadratRoutes from './PlantQuadrat/router';
import DipwellRoutes from './Dipwell/router';
import DunesProfileRoutes from './DunesProfile/router';
import ZonationMappingRoutes from './ZonationMapping/router';

export default [
  ...FixedPhotographyRoutes,
  ...PlantQuadratRoutes,
  ...DipwellRoutes,
  ...DunesProfileRoutes,
  ...ZonationMappingRoutes,
];

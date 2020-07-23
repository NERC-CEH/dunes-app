import photographySurvey from 'Survey/FixedPhotography/config';
import plantQuadratSurvey from 'Survey/PlantQuadrat/config';
import dipwellSurvey from 'Survey/Dipwell/config';
import dunesProfileSurvey from 'Survey/DunesProfile/config';
import zonationMappingSurvey from 'Survey/ZonationMapping/config';
import DisturbanceSurvey from 'Survey/Disturbance/config';

export default {
  [photographySurvey.name]: photographySurvey,
  [plantQuadratSurvey.name]: plantQuadratSurvey,
  [dipwellSurvey.name]: dipwellSurvey,
  [dunesProfileSurvey.name]: dunesProfileSurvey,
  [zonationMappingSurvey.name]: zonationMappingSurvey,
  [DisturbanceSurvey.name]: DisturbanceSurvey,
};

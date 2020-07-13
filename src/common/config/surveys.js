import photographySurvey from 'Survey/FixedPhotography/config';
import plantQuadratSurvey from 'Survey/PlantQuadrat/config';
import dipwellSurvey from 'Survey/Dipwell/config';
import dunesProfileSurvey from 'Survey/DunesProfile/config';

export default {
  [photographySurvey.name]: photographySurvey,
  [plantQuadratSurvey.name]: plantQuadratSurvey,
  [dipwellSurvey.name]: dipwellSurvey,
  [dunesProfileSurvey.name]: dunesProfileSurvey,
};

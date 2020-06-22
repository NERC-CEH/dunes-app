import photographySurvey from './photography';
import plantQuadratSurvey from './plantQuadrat';
import dipwellSurvey from './dipwell';

export default {
  [photographySurvey.name]: photographySurvey,
  [plantQuadratSurvey.name]: plantQuadratSurvey,
  [dipwellSurvey.name]: dipwellSurvey,
};

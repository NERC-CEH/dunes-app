/** ****************************************************************************
 * App model. Persistent.
 **************************************************************************** */
import Log from 'helpers/log';
import { Model } from '@apps';
import { genericStore } from './store';

class AppModel extends Model {}

Log('AppModel: initializing');
const appModel = new AppModel(genericStore, 'app', {
  showedWelcome: false,
  language: null,
  useTraining: false,
  sendAnalytics: true,
  appSession: 0,

  favouriteSite: null,

  // tips
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,
});

export { appModel as default, AppModel };

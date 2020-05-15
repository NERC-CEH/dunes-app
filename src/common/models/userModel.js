/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import Log from 'helpers/log';
import CONFIG from 'config';
import { DrupalUserModel } from '@apps';
import { genericStore } from './store';

class UserModel extends DrupalUserModel {}

Log('UserModel: initializing');
const userModel = new UserModel(genericStore, 'user', {}, CONFIG.backend);
export { userModel as default, UserModel };

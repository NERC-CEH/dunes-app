/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import Log from 'helpers/log';
import CONFIG from 'config';
import { DrupalUserModel } from '@apps';
import * as Yup from 'yup';
import { genericStore } from './store';
import dummyTransects from './dummyTransects.json';

class UserModel extends DrupalUserModel {
  async updateTransects() {
    // TODO:
    return new Promise(resolve => {
      setTimeout(() => {
        this.attrs.transects = dummyTransects;
        this.save();
        resolve();
      }, 2000);
    });
  }

  registerSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
    fullName: Yup.string().required(),
  });
}

const defaults = {
  fullName: '',
  transects: [],
};

Log('UserModel: initializing');
const userModel = new UserModel(genericStore, 'user', defaults, CONFIG.backend);
export { userModel as default, UserModel };

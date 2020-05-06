/** ****************************************************************************
 * App model. Persistent.
 **************************************************************************** */
import Log from 'helpers/log';
import { observable, toJS, set as setMobXAttrs } from 'mobx';
import { store } from './store';

const getDefaultAttrs = () => ({
  showedWelcome: false,
  language: null,
  useTraining: false,

  sendAnalytics: true,
  appSession: 0,
});

class AppModel {
  @observable attrs = getDefaultAttrs();

  constructor() {
    Log('AppModel: initializing');
    this._init = store.find('app').then(app => {
      if (typeof app === 'string') {
        // backwards compatibility
        app = JSON.parse(app); // eslint-disable-line
      }

      if (!app) {
        Log('AppModel: persisting for the first time');
        this.save();
        return;
      }

      setMobXAttrs(this.attrs, app.attrs);
    });
  }

  async save() {
    return store.save('app', { attrs: toJS(this.attrs) });
  }

  resetDefaults() {
    setMobXAttrs(this.attrs, getDefaultAttrs());
    return this.save();
  }
}

const appModel = new AppModel();
export { appModel as default, AppModel };

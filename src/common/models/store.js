import { Store } from '@apps';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Capacitor } from '@capacitor/core';

const driverOrder = [Capacitor.isNative ? CordovaSQLiteDriver : 'indexeddb'];

export const genericStore = new Store({ storeName: 'generic', driverOrder });
export const modelStore = new Store({ storeName: 'models', driverOrder });

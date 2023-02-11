/* todo: 用于调试，上线时删除 */
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
/* 调试结束*/

import { app } from 'electron';
import electronDl from 'electron-dl';

import { performElectronStartup, setupApp } from './app/main/app';
import {
  mergePersistableValues,
  watchAndPersistChanges,
} from './app/main/data';
import { setUserDataDirectory } from './app/main/dev';
import { setupDeepLinks, processDeepLinksInArgs } from './deepLinks/main';
import { setupDownloads } from './downloads/main';
import { setupMainErrorHandling } from './errors';
import i18n from './i18n/main';
import { handleDesktopCapturerGetSources } from './jitsi/ipc';
import { setupNavigation } from './navigation/main';
import { setupNotifications } from './notifications/main';
import { setupScreenSharing } from './screenSharing/main';
import { setupServers } from './servers/main';
import { setupSpellChecking } from './spellChecking/main';
import { createMainReduxStore } from './store';
import { handleCertificatesManager } from './ui/components/CertificatesManager/main';
import dock from './ui/main/dock';
import menuBar from './ui/main/menuBar';
import {
  createRootWindow,
  showRootWindow,
  exportLocalStorage,
} from './ui/main/rootWindow';
import { attachGuestWebContentsEvents } from './ui/main/serverView';
import touchBar from './ui/main/touchBar';
import trayIcon from './ui/main/trayIcon';
import { setupUpdates } from './updates/main';
import { setupPowerMonitor } from './userPresence/main';

electronDl({ saveAs: true });

const start = async (): Promise<void> => {
  setUserDataDirectory();

  performElectronStartup();

  await app.whenReady();

  /* todo: 用于调试，上线时删除 */
  const METEOR_ID = 'ibniinmoafhgbifjojidlagmggecmpgf'
  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS, METEOR_ID])
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  /* 调试结束*/

  createMainReduxStore();

  const localStorage = await exportLocalStorage();
  await mergePersistableValues(localStorage);
  await setupServers(localStorage);

  i18n.setUp();
  await i18n.wait();

  setupApp();

  setupMainErrorHandling();

  createRootWindow();
  attachGuestWebContentsEvents();
  await showRootWindow();

  // React DevTools is currently incompatible with Electron 10
  // if (process.env.NODE_ENV === 'development') {
  //   installDevTools();
  // }

  setupNotifications();
  setupScreenSharing();

  await setupSpellChecking();

  setupDeepLinks();
  await setupNavigation();
  setupPowerMonitor();
  await setupUpdates();
  setupDownloads();
  handleCertificatesManager();

  dock.setUp();
  menuBar.setUp();
  touchBar.setUp();
  trayIcon.setUp();

  app.addListener('before-quit', () => {
    dock.tearDown();
    menuBar.tearDown();
    touchBar.tearDown();
    trayIcon.tearDown();
  });

  watchAndPersistChanges();

  // 获取可用资源的权限等处理
  handleDesktopCapturerGetSources();

  await processDeepLinksInArgs();
};

if (require.main === module) {
  start();
}

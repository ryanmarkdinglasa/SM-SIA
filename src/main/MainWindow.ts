import { app, BrowserWindow, shell, WebContents, globalShortcut } from 'electron';
import path from 'path';

import { GenericVoidFunction } from '../shared/types';
import { isDevelopment } from '../shared/utils/environment';
import MenuBuilder from './MenuBuilder';
import { resolveHtmlPath } from './utils';
import WindowManager from './windowManager';

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

type OnEventType = 'closed' | 'ready-to-show';

class MainWindow {
  private static instance: BrowserWindow | null = null;
  private static splashWindow: BrowserWindow | null = null;

  public static async createWindow(): Promise<void> {
    if (isDevelopment) {
      await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    // Create the splash window
    MainWindow.splashWindow = new BrowserWindow({
      width: 400,
      height: 300,
      frame: false,
      transparent: false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        devTools: false
      },
      
    });

    MainWindow.splashWindow.loadFile(path.join(__dirname, 'loaders/testSplash.html'));
    MainWindow.splashWindow.center();

    // Create the main window
    MainWindow.set(
      new BrowserWindow({
        width: 1100,
        height: 800,
        icon: getAssetPath('icon.png'),
        show: false,
        center: true,
        frame: false,
        resizable: false,
        fullscreenable: true,
        fullscreen: false,
        title: 'Innosoft SIA',
        visualEffectState: 'active',
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 15, y: 10 },
        webPreferences: {
          preload: app.isPackaged
            ? path.join(__dirname, 'preload.js')
            : path.join(__dirname, '../../.erb/dll/preload.js'),
          sandbox: false,
          nodeIntegration: true,
          contextIsolation: true,
          devTools: false,
        },
      }),
    );

    MainWindow.loadURL(resolveHtmlPath('index.html'));

    MainWindow.on('ready-to-show', () => {
      if (!MainWindow.exists()) {
        throw new Error('"MainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        MainWindow.minimize();
      } else {
        setTimeout(() => {
          MainWindow.show();
          MainWindow.splashWindow?.close();
        }, 10000); // 10 seconds delay
      }
    });

    MainWindow.on('closed', () => {
      MainWindow.set(null);
    });

    const windowManager = new WindowManager(MainWindow.instance!);
    globalShortcut.register('Alt+Enter', () => {
      const isFullScreen = windowManager.isFullScreen();
      windowManager.setFullScreen(!isFullScreen);
    });

    const menuBuilder = new MenuBuilder(MainWindow.instance!);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    MainWindow.getWebContents()?.setWindowOpenHandler((eventData) => {
      shell.openExternal(eventData.url);
      return { action: 'deny' };
    });
  }

  public static exists(): boolean {
    return !!MainWindow.instance;
  }

  public static getWebContents(): WebContents | null {
    return MainWindow.instance?.webContents || null;
  }

  public static loadURL(url: string): void {
    MainWindow.instance?.loadURL(url);
  }

  public static minimize(): void {
    MainWindow.instance?.minimize();
  }

  public static on(event: OnEventType, listener: GenericVoidFunction): void {
    MainWindow.instance?.on(event as any, listener);
  }

  public static set(window: BrowserWindow | null): void {
    MainWindow.instance = window;
  }

  public static show(): void {
    MainWindow.instance?.show();
  }
}

export default MainWindow;

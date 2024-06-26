import { BrowserWindow } from "electron";

class WindowManager {
    mainWindow: BrowserWindow;
    constructor(mainWindow : BrowserWindow) {
      this.mainWindow = mainWindow;
    }

    setFullScreen(isFullScreen: any) {
        this.mainWindow.setFullScreen(isFullScreen);
    }

    isFullScreen() {
        return this.mainWindow.isFullScreen();
    }
}

export default WindowManager;
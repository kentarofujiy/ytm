const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');
let tray = null;
let mainWindow = null;
let title = null;

// Create a new Electron window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'ytlogo.svg'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: false,
      // preload: path.join(__dirname, 'preload.js'), 
    }
  });
  mainWindow.loadURL('https://music.youtube.com/', { userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' }).then(() => {
   // console.log(currentURL)
  })
  // Check for unread messages using your custom logic
}
// Event handler when Electron app is ready
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    mainWindow.webContents.getTitle()
      .then((title) => {
      })
      .catch((error) => {
        console.log(error);
      });
  });
  // Create a Tray instance and set the icon
  tray = new Tray(path.join(__dirname, 'icon.png')); // Change 'icon.png' with your own icon file
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');

ipcMain.handle('parseCSV', () => {
  const data = fs.readFileSync('./src/users.csv', 'utf-8');
  return data.split('\n').map((row) => row.split(','))})

ipcMain.on('writeCSV', (e, data) => {
  const oldData = fs.readFileSync('./src/users.csv', 'utf-8');
  fs.writeFileSync('./src/users.csv', `${oldData}${data}\n`, 'utf-8')})

  ipcMain.on('reloadMainWindow', (event) => {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      mainWindow.restore();
    }
  });

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js')
    }
  })
  win.webContents.openDevTools() // DEVTOOLS

  win.loadFile('index.html')

  ipcMain.on('open-new-table', (event, table) => {
    const win = new BrowserWindow({
      width: 800,
      height: 500,
      webPreferences: {
        preload: path.join(__dirname, 'src/preload.js')
      }
    });

    win.loadFile('./src/users.html')
    win.webContents.openDevTools() // DEVTOOLS
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
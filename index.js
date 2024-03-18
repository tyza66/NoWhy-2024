import { app, BrowserWindow, Menu } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadURL(winURL)

  var menu = Menu.buildFromTemplate([
    {
      label: '快捷功能',
      submenu: [
        {
          label: '主界面',
          click: function () {
            mainWindow.loadURL(winURL + '/')
          }
        }
      ]
    },
    {
      label: '控制窗口',
      submenu: [
        {
          label: '开启全面屏',
          click: function () {
            mainWindow.setFullScreen(true);
          }
        },
        {
          label: '关闭全面屏',
          click: function () {
            mainWindow.setFullScreen(false);
          }
        },
        {
          label: '最大化窗口',
          click: function () {
            mainWindow.maximize();
          }
        },
        {
          label: '还原窗口',
          click: function () {
            mainWindow.restore();
          }
        },
        {
          label: '隐藏窗口',
          click: function () {
            mainWindow.minimize();
          }
        },
        {
          label: '刷新页面',
          click: function () {
            mainWindow.reload();
          }
        },
        {
          label: '关闭系统',
          click: function () {
            mainWindow.close();
          }
        }
      ]
    },
    {
      label: '更多信息',
      submenu: [
        {
          label: '系统信息',
          click: function () {
            mainWindow.loadURL(winURL + '/#/about')
          }
        },
        {
          label: '授权信息',
          click: function () {
            mainWindow.loadURL(winURL + '/#/about')
          }
        }
      ]
    }
  ]);
  mainWindow.setMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

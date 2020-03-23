"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  dialog
} from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

const menu = new Menu();
menu.append(new MenuItem({ label: "Hello" }));
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({ label: "Electron", type: "checkbox", checked: true })
);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

let template = [
  {
    label: "工具",
    submenu: [
      {
        label: "打开Designer",
        click: function(item: any, focusedWindow: BrowserWindow) {
          console.log("menu clicked");
          console.dir(focusedWindow);
        }
      },
      {
        label: "重载",
        accelerator: "CmdOrCtrl+R",
        click: function(item: any, focusedWindow: any) {
          if (focusedWindow) {
            // 重载之后, 刷新并关闭所有的次要窗体
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function(win) {
                if (win.id > 1) {
                  win.close();
                }
              });
            }
            focusedWindow.reload();
          }
        }
      },
      {
        label: "切换全屏",
        accelerator: (function() {
          if (process.platform === "darwin") {
            return "Ctrl+Command+F";
          } else {
            return "F11";
          }
        })(),
        click: function(item: any, focusedWindow: any) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        }
      },
      {
        label: "切换开发者工具",
        accelerator: (function() {
          if (process.platform === "darwin") {
            return "Alt+Command+I";
          } else {
            return "Ctrl+Shift+I";
          }
        })(),
        click: function(item: any, focusedWindow: any) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      },
      {
        type: "separator"
      }
    ]
  },
  {
    label: "窗口",
    role: "window",
    submenu: [
      {
        label: "最小化",
        accelerator: "CmdOrCtrl+M",
        role: "minimize"
      },
      {
        label: "关闭",
        accelerator: "CmdOrCtrl+W",
        role: "close"
      },
      {
        type: "separator"
      },
      {
        label: "重新打开窗口",
        accelerator: "CmdOrCtrl+Shift+T",
        enabled: false,
        key: "reopenMenuItem",
        click: function() {
          app.emit("activate");
        }
      }
    ]
  }
];

function addUpdateMenuItems(items: any, position: any) {
  if (process.mas) return;

  const version = app.getVersion();
  let updateItems = [
    {
      label: `Version ${version}`,
      enabled: false
    },
    {
      label: "正在检查更新",
      enabled: false,
      key: "checkingForUpdate"
    },
    {
      label: "检查更新",
      visible: false,
      key: "checkForUpdate",
      click: function() {
        require("electron").autoUpdater.checkForUpdates();
      }
    },
    {
      label: "重启并安装更新",
      enabled: true,
      visible: false,
      key: "restartToUpdate",
      click: function() {
        require("electron").autoUpdater.quitAndInstall();
      }
    }
  ];

  items.splice.apply(items, [position, 0].concat(updateItems));
}

function findReopenMenuItem() {
  const menu = Menu.getApplicationMenu();
  if (!menu) return;

  let reopenMenuItem;
  menu.items.forEach(function(item) {
    if (item.submenu) {
      item.submenu.items.forEach(function(item) {
        if ((item as any).key === "reopenMenuItem") {
          reopenMenuItem = item;
        }
      });
    }
  });
  return reopenMenuItem;
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow();
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

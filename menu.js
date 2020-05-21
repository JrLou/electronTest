// @flow
const { app, Menu, dialog,shell, BrowserWindow }  = require('electron');
const fs  =require('fs');

module.exports =  class MenuBuilder {

  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    this.subMenuHelp = {
      label: '帮助',
      submenu: [  {
        label: '修改服务器',
        click: () => {

            // let path = app.getPath('userData')+'/db/login.txt';
            // fs.unlinkSync(path)
            // this.mainWindow.webContents.reload();
            mainWindow.loadURL(this.getSetURL())

        }
      },



        {
          label: '关于我们',
          click: () => {
            shell.openExternal('http://www.zjfywh.com/');
          }
        }
      ]
    };
  }
     getSetURL(){
        return `file://${__dirname}/set/index.html`;
    }
  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }
    // this.setupDevelopmentEnvironment();
    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'ELF系统',
      submenu: [
        {
          label: 'About ELFOS',
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        { type: 'separator' },
        {
          label: '隐藏 ELF系统',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: '隐藏其他应用',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { label: '显示全部应用', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuEdit = {
      label: '编辑',
      submenu: [
        { label: '撤消', accelerator: 'Command+Z', selector: 'undo:' },
        { label: '重做', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: '剪切', accelerator: 'Command+X', selector: 'cut:' },
        { label: '拷贝', accelerator: 'Command+C', selector: 'copy:' },
        { label: '粘贴', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: '全选',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuViewDev = {
      label: '视图',
      submenu: [
        {
          label: '重新启动',
          accelerator: 'Command+R',
          click: () => {
              // //获取当前焦点的webview
             let  currWindow  = BrowserWindow.getFocusedWindow();
              if(currWindow){
                  currWindow.webContents.reload();
              }

          }
        },
        {
          label: '全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
              let  currWindow  = BrowserWindow.getFocusedWindow();
              if(currWindow){
                  currWindow.setFullScreen(!currWindow.isFullScreen());
              }

          }
        },
        {
          label: '开发者模式',
          accelerator: 'Alt+Command+I',
          click: () => {
            //输入密码可进
              let  currWindow  = BrowserWindow.getFocusedWindow();
              if(currWindow){
                  currWindow.toggleDevTools();
              }

          }
        }
      ]
    };
    const subMenuWindow = {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        { label: '关闭', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: '置顶', selector: 'arrangeInFront:' }
      ]
    };



    return [subMenuAbout, subMenuEdit, subMenuViewDev, subMenuWindow, this.subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '文件',
        submenu: [
          {
            label: '打开',
            accelerator: 'Ctrl+O'
          },
          {
            label: '关闭',
            accelerator: 'Ctrl+W',
            click: () => {
                let  currWindow  = BrowserWindow.getFocusedWindow();
                if(currWindow){
                    currWindow.close();
                }
            }
          }
        ]
      },
      {
        label: '视图',
        submenu:[
          {
            label: '重新启动',
            accelerator: 'Ctrl+R',
            click: () => {
                let  currWindow  = BrowserWindow.getFocusedWindow();
                if(currWindow){
                    currWindow.webContents.reload();
                }
            }
          },
          {
            label: '全屏',
            accelerator: 'F11',
            click: () => {
                let  currWindow  = BrowserWindow.getFocusedWindow();
                if(currWindow){
                    currWindow.setFullScreen(!currWindow.isFullScreen());
                }
            }
          },
          {
            label: '开发者模式',
            accelerator: 'Alt+Ctrl+I',
            click: () => {
                let  currWindow  = BrowserWindow.getFocusedWindow();
                if(currWindow){
                    currWindow.toggleDevTools();
                }
            }
          }
        ]
      },this.subMenuHelp
    ];

    return templateDefault;
  }
}

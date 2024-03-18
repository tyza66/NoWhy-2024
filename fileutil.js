const os = require('os');
const path = require('path');
const fs = require('fs');

// 获取当前用户的主目录路径
const homeDir = os.homedir();

// 拼接上“数据目录”目录
const documentPath = path.join(homeDir,'Documents', 'MobileStore');
//如果不存在就创建目录
if (!fs.existsSync(documentPath)) {
    fs.mkdirSync(documentPath, { recursive: true });
}

//拼接上“数据库”目录
const dbPath = path.join(documentPath, 'db');
//如果不存在就创建目录
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
}

//拼接上“导出”目录
const exportPath = path.join(documentPath, 'export');
//如果不存在就创建目录
if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath, { recursive: true });
}

export {documentPath, dbPath, exportPath}


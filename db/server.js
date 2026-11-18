// db/server.js —— 刘丁荣 2026-11-13
// 功能：Express 数据服务器(端口 3004)
//   1) GET /poems      返回 db.json 中的 poems 数组
//   2) 静态托管上级目录 000liudingrong，浏览器访问 http://localhost:3004/poems.html
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3004;
const HTTPS_PORT = 3005;

// 实现：允许跨域请求（CORS），使页面以 file:// 或其他端口打开时也能获取 /poems 数据
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// 实现：读取 db.json 并返回其中 poems 数据的接口
app.get('/poems', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: '读取 db.json 失败: ' + err.message });
    }
    res.json(JSON.parse(data));
  });
});

// 实现：静态托管 000liudingrong 目录，使 poems.html 等页面可通过本服务器访问
app.use(express.static(path.join(__dirname, '..')));

// 实现：启动 HTTP 服务器并打印访问地址
app.listen(PORT, () => {
  console.log('数据服务器已启动(HTTP): http://localhost:' + PORT + '/poems.html');
  console.log('接口地址: http://localhost:' + PORT + '/poems');
});

// 实现：启动 HTTPS 服务器（自签证书）——iPhone 的动作传感器 API 要求安全上下文，手机访问 https://<本机IP>:3005
const https = require('https');
const certFile = path.join(__dirname, 'cert.pem');
const keyFile = path.join(__dirname, 'key.pem');
if (fs.existsSync(certFile) && fs.existsSync(keyFile)) {
  try {
    const creds = { cert: fs.readFileSync(certFile), key: fs.readFileSync(keyFile) };
    https.createServer(creds, app).listen(HTTPS_PORT, () => {
      console.log('HTTPS 已启动: https://<本机IP>:' + HTTPS_PORT + '/mobile-sensor.html （手机需与电脑同一 WiFi）');
    });
  } catch (err) {
    console.log('HTTPS 启动失败: ' + err.message);
  }
}

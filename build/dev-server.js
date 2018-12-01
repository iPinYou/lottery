require('./check-versions')()
require('./watch-views')()//监视view文件变化

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

//api code
var fs = require('fs');
var render = require('json-templater/string');
var endOfLine = require('os').EOL;
var pinyin = require("node-pinyin");
var upperCamelCase = require('uppercamelcase')
var savePersons=function(persions){
  //输出文件的目录
  var outputPathDir = path.join(__dirname, '../src/static');
//输出文件
  var outputPath = outputPathDir + '/persons.js';
  var MAIN_TEMPLATE = `var Persons = [
  {{persons}}
  ];
  module.exports=Persons;`;
  var persionsTemplate=[];
  persions.forEach(p=>{
    persionsTemplate.push(`{'id':'${p.id}','name':'${p.name}','group':'${p.group}','department':'${p.department}','avatar':'${p.avatar}','state':${p.state}},`);
  })
  var template = render(MAIN_TEMPLATE, {
    persons:persionsTemplate.join(endOfLine),
  });
  fs.writeFileSync(outputPath, template);
}
var exportPersons=function(persions){
  //输出文件的目录
  var outputPathDir = path.join(__dirname, '../src/static');
//输出文件
  var outputPath = outputPathDir + '/js/persons.js';
  var MAIN_TEMPLATE = `var persons = [
  {{persons}}
  ];`;
  var persionsTemplate=[];
  persions.forEach(p=>{
    persionsTemplate.push(`{'id':'${p.id}','name':'${p.name}','group':'${p.group}','department':'${p.department}','avatar':'${p.avatar}','state':${p.state}},`);
  })
  var template = render(MAIN_TEMPLATE, {
    persons:persionsTemplate.join(endOfLine),
  });
  fs.writeFileSync(outputPath, template);
}
// // 登录
// mock.onPost('/login').reply((config) => {
//   const { username, password } = JSON.parse(config.data);
//   return new Promise((resolve, reject) => {
//     let user = null;
//     setTimeout(() => {
//       const hasUser = LoginUsers.some((u) => {
//         if (u.username === username && u.password === password) {
//           user = JSON.parse(JSON.stringify(u));
//           user.password = undefined;
//           return true;
//         }
//       });
//
//       if (hasUser) {
//         resolve([200, { code: 200, msg: '请求成功', user }]);
//       } else {
//         resolve([200, { code: 500, msg: '账号或密码错误' }]);
//       }
//     }, 100);
//   });
// });
app.post('/login',function(req,res){
  res.json({code: 200, msg: '请求成功',user:{username:'admin'}});
});
var _persions=require("../src/static/persons.js");
app.get('/person/export',function(req, res){
  exportPersons(_persions)
  res.json({code: 200, msg: '导出成功',});
});
// 获取用户列表
app.get('/person/list',function(req, res) {
  res.json({
    code: 200,
    persons: _persions,
  });
});
// 获取用户列表（分页）
app.get('/person/listpage',function(req,res){
  const { page, search } = req.query;
  let _persionsTemp = _persions;
  _persionsTemp = _persionsTemp.filter((person) => {
    person.stateMsg = person.state ? '开启' : '关闭';
    if(search && person.name.indexOf(search) > -1) return true;
    if(search && person.id.toLowerCase().indexOf(search.toLowerCase()) > -1) return true;
    if(search && person.group.indexOf(search) > -1) return true;
    if(search && person.department.indexOf(search) > -1) return true;
    if(search && person.stateMsg.indexOf(search) > -1) return true;
    if(!search)return true;
    return false;
  });
  const total = _persionsTemp.length;
  _persionsTemp = _persionsTemp.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
  res.json({code: 200, total,persons: _persionsTemp,});
});
app.get('/person/remove',function(req,res){
  let { name } = req.query;
  _persions = _persions.filter(u => u.name !== name);
  savePersons(_persions)
  res.json({code: 200, msg: '删除成功',});
});
app.get('/person/batchremove',function(req,res){
  let { names } = req.query;
  names = names.split(',');
  _persions = _persions.filter(u => !names.includes(u.name));
  savePersons(_persions)
  res.json({code: 200, msg: '删除成功',});
});
app.get('/person/edit',function(req,res){
  let {  id, name, group,department,avatar, state } = req.query;
  if(state==='true'){
    state=true;
  }else if(state==='false'){
    state=false;
  }
  // let py=pinyin(name,{style:'normal'});
  // py=py.map(p=> upperCamelCase(p.toString())).join('');
  // if(name==='李妍'){
  //   py+='1';
  // }else if(name==='李艳'){
  //   py+='2';
  // }
  // let id=py;
  avatar='static/imgs/'+id+'.jpg';
  _persions.some((u) => {
    if (u.name === name) {
      u.id=id;
      u.name = name;
      u.group = group,
      u.department = department,
      u.avatar = avatar,
      u.state = state;
    }
  });
  savePersons(_persions)
  res.json({code: 200, msg: '编辑成功',});
});
app.get('/person/add',function(req,res){
  let { id, name, group,department,avatar, state } = req.query;
  if(state==='true'){
    state=true;
  }else if(state==='false'){
    state=false;
  }
  // let py=pinyin(name,{style:'normal'});
  // py=py.map(p=> upperCamelCase(p.toString())).join('');
  // if(name==='李妍'){
  //   py+='1';
  // }else if(name==='李艳'){
  //   py+='2';
  // }
  // let id=py;
  avatar='imgs/'+id+'.jpg';
  _persions.push({
    id,
    name,
    group,
    department,
    avatar,
    state,
  });
  savePersons(_persions)
  res.json({code: 200, msg: '新增成功',});
});
app.get('/person/changestate',function(req,res){
  let {  currentState,currentName } = req.query;
  if(currentState==='true'){
    currentState=true;
  }else if(currentState==='false'){
    currentState=false;
  }
  _persions.some((u) => {
    if (u.name === currentName) {
      u.state=currentState;
    }
  });
  savePersons(_persions)
  res.json({code: 200, msg: '更改成功',});
});

//api code end


var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

  const fs = require('fs');
  const render = require('json-templater/string');
  const camelCase = require('camelcase');
  const upperCamelCase = require('uppercamelcase')
  const path = require('path');
  const endOfLine = require('os').EOL;
  const utils = require('./utils')
  let persions=require('../src/static/persons');
  let MAIN_TEMPLATE = require('../src/routes-temple').temple

  let IMPORT_TEMPLATE = 'import {{name}} from \'{{package}}\';';

//需要自动处理Import的目录
  let importDir = path.join(__dirname, '../src/static/imgs');
//输出文件的目录
  let outputPathDir = path.join(__dirname, '../src');
//输出文件
  let outputPath = outputPathDir + '/routes.js';
  let total = 0, routeFiles = [];
  utils.eachDir(importDir, {
    callback(file) {
      let curRealPath = file.path;
      let ret = file.name.match(/\.(\w+$)/);
      let strFileName = file.name.replace(/(.*\/)*([^.]+).*/ig, "$2");
      let dirName = path.dirname(curRealPath);
      let fileName = path.basename(curRealPath, '.jpg');
      routeFiles.push(fileName);
      if (ret && ret[1] == 'jpg') {//必须是jpg
        if(persions.some(p=>p.id===fileName)){
        }else{
          console.log(fileName);
        }
      }
    },
    done() {
      persions.forEach(p=>{
        if(routeFiles.some(f=>f===p.id)){
        }else{
          console.log(p.id);
        }
      })
    },
    fail(err) {
      console.log(err);
    }
  });

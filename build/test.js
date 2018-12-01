var pinyin = require("node-pinyin");
var camelCase = require('camelcase');
const upperCamelCase = require('uppercamelcase')
var py=pinyin("韩卫强",{style:'normal'});
py=py.map(p=> upperCamelCase(p.toString())).join('')
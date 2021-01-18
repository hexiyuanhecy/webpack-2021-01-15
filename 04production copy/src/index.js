/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 10:57:55
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-18 10:13:55
 * @FilePath: \webpack-01-15\04production\src\index.js
 */
import _ from '../../06Cache/src/node_modules/lodash';
import printMe from './print.js';

function component () {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['测试哎', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);
    
    return element;
}

document.body.appendChild(component());

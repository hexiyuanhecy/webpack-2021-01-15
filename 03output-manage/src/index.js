/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 10:57:55
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-15 16:10:04
 * @FilePath: \webpack-01-15\03output-manage\src\index.js
 */
import _ from 'lodash';
import printMe from './print.js';

function component () {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);
    
    return element;
}

document.body.appendChild(component());

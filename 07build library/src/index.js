/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 10:57:55
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-15 11:12:22
 * @FilePath: \webpack-01-15\src\index.js
 */
import _ from 'lodash';
function component () {
    const element = document.createElement('div');

    // lodash，现在通过一个 script 引入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());

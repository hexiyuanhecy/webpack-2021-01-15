/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 10:57:55
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-25 16:55:47
 * @FilePath: \webpack-01-15\09hot module replacement\src\index.js
 */
import _ from 'lodash';
import printMe from './print.js';
// import './style.css'

function component () {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['测试12', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);
    
    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}

/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 10:57:55
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-18 14:13:06
 * @FilePath: \webpack-01-15\05Code separation\src\index.js
 */
/* import _ from 'lodash';

function component () {
    const element = document.createElement('div');

    element.innerHTML = _.join(['测试哎', 'webpack'], ' ');

    element.appendChild(btn);
    
    return element;
}
document.body.appendChild(component());
 */

async function getComponent () {
    const element = document.createElement('div');
    const { default: _ } = await import('../../06Cache/src/node_modules/lodash');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
    // return import('lodash')
    //     .then(({ default: _ }) => {
    //         const element = document.createElement('div');

    //         element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    //         return element;
    //     })
    //     .catch((error) => 'An error occurred while loading the component');
}

getComponent().then((component) => {
    document.body.appendChild(component);
});

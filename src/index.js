/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2020-09-17 15:46:11
 * @LastEditTime: 2021-09-21 00:39:09
 * @LastEditors: rodchen
 */
import _ from 'lodash';
import module from './es6/es6Module';
import Icon from './assets/logo.svg';
import Data from './assets/data.xml';
import '@/index.css';

function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Helloeesdsdf s', 'webpack'], module.add(5, 2));
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src = Icon;
  debugger
  element.appendChild(myIcon);
  console.log(Data);
  return element;
}

document.body.appendChild(component());
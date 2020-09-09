import _ from 'lodash';
import module from './es6/es6Module';
import './index.css';

function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], module.add(1, 2));
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
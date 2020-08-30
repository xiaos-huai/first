/*
 * @Author: your name
 * @Date: 2020-07-12 15:31:25
 * @LastEditTime: 2020-07-13 08:26:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \小游戏\太空大战\index.js
 */
// 选装算法
// 顺时针 
//   x ---> y
// 2-y ---> x
// 逆时针
//   y ---> x
// 2-x ---> y
var timer;
// 9宫格位置
let boxX = 0;
let boxY = 0;
// 模型数据
let myModel = {
  0: {
    row: 0,
    col: 1
  },
  1: {
    row: 1,
    col: 0
  },
  2: {
    row: 1,
    col: 1
  },
  3: {
    row: 1,
    col: 2
  },
  4: {
    row: 2,
    col: 0
  },
  5: {
    row: 2,
    col: 2
  }
}
// 根据传入的数据创建模型
function createMoel(data, clas) {
  for (let key in data) {
    let el = document.createElement('div');
    el.className = clas;
    el.style.top = data[key].row * 10 + 'px';
    el.style.left = data[key].col * 10 + 'px';
    let box = document.querySelector('.box');
    box.appendChild(el);
  }
}
//键盘点击
function onKeyDown() {
  window.onkeydown = function (event) {
    switch (event.keyCode) {
      case 37:
        move(0);
        console.log('左');
        break;
      case 38:
        move(1);
        console.log('上');
        break;
      case 39:
        move(2);
        console.log('右');
        break;
      case 40:
        move(3);
        console.log('下');
        break;
      case 74:
        fire(3);
        console.log('发射');
        break;
    }
  }
}
// 根据最新数据，重新定位模块组位置
function redirect() {
  let mys = document.querySelectorAll('.my');
  for (let i = 0; i < mys.length; i++) {
    mys[i].style.top = (myModel[i].row + boxY) * 10 + 'px';
    mys[i].style.left = (myModel[i].col + boxX) * 10 + 'px';
  }
}
// 得出当前模块的方向
function getDirection() {
  let my = document.querySelectorAll('.my');
  if (parseInt(my[0].style.top) === parseInt(my[2].style.top)) {
    if (parseInt(my[0].style.left) - parseInt(my[2].style.left) > 0) {
      return 2;
    } else {
      return 0;
    }
  } else {
    if (parseInt(my[0].style.top) - parseInt(my[2].style.top) > 0) {
      return 3;
    } else {
      return 1;
    }
  }

}
// 旋转
function rotate() {
  for (let key in myModel) {
    let i = myModel[key].row;
    myModel[key].row = myModel[key].col;
    myModel[key].col = 2 - i;
  }
}
// 移动
function move(num) {
  let i = getDirection();
  let j = 0;
  if (i === num) {
    switch (num) {
      case 0:
        boxX--;
        break;
      case 1:
        boxY--;
        break;
      case 2:
        boxX++;
        break;
      case 3:
        boxY++;
        break;
    }
  } else {
    if (i < num) {
      j = num - i;
    } else {
      j = 4 - i + num;
    }
  }
  for (let k = 0; k < j; k++) {
    rotate()
  }
  redirect()
}
// 发射子弹
function fire() {
  // 获取my
  let mys = document.querySelectorAll('.my')
  // 获取box
  let box = document.querySelector('.box')
  // 创建div元素
  let el = document.createElement('div');
  el.className = 'bullet';
  el.style.top = mys[2].style.top;
  el.style.left = mys[2].style.left;
  el.lang = getDirection()
  box.appendChild(el)
  // 为该子弹创建定时器
  // timers[timers.length] = setInterval(function(){

  // },100)

}

function init() {
  createMoel(myModel, 'item')
  createMoel(myModel, 'my')
  onKeyDown()
  timer = setInterval(function () {
    // 判断是否越界
    let box = document.querySelector('.box');
    let els = document.querySelectorAll('.bullet');
    for (let item of els) {
      if(parseInt(item.style.left) <= 0 || parseInt(item.style.left) >= 400 || parseInt(item.style.top) <= 0 || parseInt(item.style.top) >= 360){
        box.removeChild(item);
      }
      switch (parseInt(item.lang)) {
        case 0:
          item.style.left = parseInt(item.style.left) - 10 + 'px';
          break;
        case 1:
          item.style.top = parseInt(item.style.top) - 10 + 'px';
          break;
        case 2:
          item.style.left = parseInt(item.style.left) + 10 + 'px';
          break;
        case 3:
          item.style.top = parseInt(item.style.top) + 10 + 'px';
          break;
      }
    }
  }, 100)
}
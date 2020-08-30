/*
 * @Author: your name
 * @Date: 2020-08-03 15:31:52
 * @LastEditTime: 2020-08-24 14:58:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \新建文件夹\tank 2.0.0\Tank.js
 */
// 子弹每次移动10，没20毫秒移动一次

// 获取盒子对象
let BOX = document.querySelector('.box');
// 用于存放坦克的每一个子元素
var items = [];

let Fire = function (user, data, direction) {
  // 发射子弹者
  this.user = user;
  // 子弹数据
  this.data = data;
  // 发射方向
  this.direction = direction;
  this.model = null;
  this.create()
  this.interval = setInterval(function () {
    this.move(this.direction);
    if (items[this.model.style.left + '_' + this.model.style.top]) {
      let user = items[this.model.style.left + '_' + this.model.style.top].getAttribute('data-user');
      switch (user) {
        case 'p1':
          p1.destruction();
          this.destruction(true)
          break;
        case 'p2':
          p2.destruction();
          this.destruction(true)
          break;
        default:
          BOX.removeChild(items[this.model.style.left + '_' + this.model.style.top]);
          items[this.model.style.left + '_' + this.model.style.top] = null;
          this.destruction(true)
          break;
      }
    }
    this.destruction();
  }.bind(this), 20)
}
// 创建子弹
Fire.prototype.create = function () {
  let el = document.createElement('div');
  el.setAttribute('class', 'fire');
  el.setAttribute('data-user', this.user);
  el.setAttribute('data-direction', this.direction)
  el.style.left = this.data.boxX + 'px';
  el.style.top = this.data.boxY + 'px';
  this.model = el;
  BOX.appendChild(el);
}
// 子弹移动
Fire.prototype.move = function (direction) {
  switch (direction) {
    case 0:
      this.model.style.left = parseInt(this.model.style.left) - 10 + 'px';
      break;
    case 1:
      this.model.style.top = parseInt(this.model.style.top) - 10 + 'px';
      break;
    case 2:
      this.model.style.left = parseInt(this.model.style.left) + 10 + 'px';
      break;
    case 3:
      this.model.style.top = parseInt(this.model.style.top) + 10 + 'px';
      break;
  }
}
// 子弹销毁
Fire.prototype.destruction = function (num) {
  if (num) {
    clearInterval(this.interval)
    BOX.removeChild(this.model)
  }
  if (parseInt(this.model.style.left) < 0 || parseInt(this.model.style.left) > 1200 || parseInt(this.model.style.top) < 0 || parseInt(this.model.style.top) > 600) {
    clearInterval(this.interval)
    BOX.removeChild(this.model)
  }
}


let Tank = function (user, data) {
  // 坦克角色
  this.user = user;
  // 坦克数据
  this.data = data;
  this.dataClon = Object.clone(data);
  this.model = [];
  this.create();
}
// 坦克移动
Tank.prototype.move = function (newDirection) {
  let nowDirection = this.getDirection();
  if (newDirection === nowDirection) {
    // if (true) {
    switch (newDirection) {
      case 0:
        this.dataClon.boxX--;
        break;
      case 1:
        this.dataClon.boxY--;
        break;
      case 2:
        this.dataClon.boxX++;
        break;
      case 3:
        this.dataClon.boxY++;
        break;
    }
  } 
  else {

    if (newDirection > nowDirection) {
      for (let i = 0; i < newDirection - nowDirection; i++) {
        this.rotate(true)
      }
    } else {
      for (let i = 0; i < nowDirection - newDirection; i++) {
        this.rotate(false)
      }
    }
  }
  
  this.reset();
}
// 获取当前朝向
Tank.prototype.getDirection = function () {
  let item0 = this.model[0];
  let item2 = this.model[2];
  let item0X = parseInt(item0.style.left);
  let item2X = parseInt(item2.style.left);
  let item0Y = parseInt(item0.style.top);
  let item2Y = parseInt(item2.style.top);
  if (item0X === item2X) {
    if (item0Y > item2Y) {
      return 3
    } else {
      return 1
    }
  } else {
    if (item0X > item2X) {
      return 2
    } else {
      return 0
    }
  }
}
// 创建模型 //根据数据创建坦克模型
Tank.prototype.create = function () {
  // 遍历模型数组
  let data = this.data.items
  for (let key in data) {
    let el = document.createElement('div');
    el.setAttribute('class', 'item');
    el.setAttribute('data-user', this.user);
    el.style.top = (this.data.boxY + data[key].modelY) * 10 + 'px';
    el.style.left = (this.data.boxX + data[key].modelX) * 10 + 'px';
    // 将创建的模型，添加到BOX当中
    BOX.appendChild(el);
    this.model.push(el);
    items[el.style.left + '_' + el.style.top] = el;
  }
}
// 是否越界 
Tank.prototype.hasOut = function () {

  let a = false;
  for (let i in this.dataClon.items) {
    let x = (this.dataClon.boxX + this.dataClon.items[i].modelX) * 10;
    let y = (this.dataClon.boxY + this.dataClon.items[i].modelY) * 10;
    if (x < 0 || x > 1190 || y < 0 || y > 590) {
      a = true;
      break;
    } else {}
  }
  return a;


  (this.dataClon.boxX + this.dataClon.items[i].modelX) * 10 + 'px' + '_' + ((this.dataClon.boxY + this.dataClon.items[i].modelY) * 10) + 'px'
}
// 重定位 //根据最新数据，对坦克模型，进行重新定位
Tank.prototype.reset = function () {
  // 将之前items中的位置清除
  for (let item of this.model) {
    items[item.style.left + '_' + item.style.top] = null;
  }
  // 是否越界或者下一个位置是否有item
  if (this.hasItem() || this.hasOut()) {
    this.dataClon = Object.clone(this.data);
  } else {
    this.data = Object.clone(this.dataClon);
  }
  // 重定位
  for (let i in this.model) {
    this.model[i].style.top = (this.data.boxY + this.data.items[i].modelY) * 10 + 'px';
    this.model[i].style.left = (this.data.boxX + this.data.items[i].modelX) * 10 + 'px';
    // 将新的位置添加到items当中
    items[this.model[i].style.left + '_' + this.model[i].style.top] = this.model[i];
  }
}
// 查看下一个位置是否有item 若有返回true否者返回false
Tank.prototype.hasItem = function () {
  let a = false;
  for (let i in this.dataClon.items) {
    if (items[(this.dataClon.boxX + this.dataClon.items[i].modelX) * 10 + 'px' + '_' + ((this.dataClon.boxY + this.dataClon.items[i].modelY) * 10) + 'px']) {
      a = true;
      break;
    } else {}
  }
  return a;
}
// 旋转
Tank.prototype.rotate = function (num) {
  let i;
  let data = this.dataClon.items;
  if (num) {
    // 顺时针旋转
    for (let index in data) {
      i = data[index].modelY;
      data[index].modelY = data[index].modelX;
      data[index].modelX = 2 - i;
    }
  } else {
    // 逆时针旋转
    for (let index in data) {
      i = data[index].modelX;
      data[index].modelX = data[index].modelY;
      data[index].modelY = 2 - i;
    }
  }
}
// 发射子弹
Tank.prototype.fire = function () {
  new Fire(this.user, {
    boxX: parseInt(this.model[0].style.left),
    boxY: parseInt(this.model[0].style.top)
  }, this.getDirection())
}
// 销毁
Tank.prototype.destruction = function () {
  for (let item of this.model) {
    items[item.style.left + '_' + item.style.top] = null;
    BOX.removeChild(item);
  }
  this.model.length = 0;
  setTimeout(function () {
    this.create()
  }.bind(this), 1000)
}

let Wall = function (data) {
  this.data = data;
  this.create();
}
// 创建墙体
Wall.prototype.create = function () {
  for (let i in this.data) {
    let el = document.createElement('div');
    el.setAttribute('class', 'wall');
    el.style.left = this.data[i].modelX * 10 + 'px';
    el.style.top = this.data[i].modelY * 10 + 'px';
    items[el.style.left + '_' + el.style.top] = el;
    BOX.appendChild(el);
  }
}
Wall.prototype.destruction = function () {

}


let p1 = new Tank('p1', tankModelDataP1)
let p2 = new Tank('p2', tankModelDataP2)
new Wall(wallModelData)

let obj = {
  a: false,
  w: false,
  d: false,
  s: false,
  j: false,
  left: false,
  up: false,
  right: false,
  down: false,
  '0': false
}
setInterval(function () {
  if (obj.a) {
    p1.move(0);
  }
  if (obj.w) {
    p1.move(1);
  }
  if (obj.d) {
    p1.move(2);
  }
  if (obj.s) {
    p1.move(3);
  }
  if (obj.j) {
    p1.fire()
  }

  if (obj.left) {
    p2.move(0);
  }
  if (obj.up) {
    p2.move(1);
  }
  if (obj.right) {
    p2.move(2);
  }
  if (obj.down) {
    p2.move(3);
  }
  if (obj[0]) {
    p2.fire();
  }
}, 60)
window.onkeydown = function (event) {
  switch (event.keyCode) {
    case 65:
      obj.a = true;
      break;
    case 87:
      obj.w = true;
      break;
    case 68:
      obj.d = true;
      break;
    case 83:
      obj.s = true;
      break;
    case 74:
      obj.j = true;
      break;

    case 37:
      obj.left = true;
      break;
    case 38:
      obj.up = true;
      break;
    case 39:
      obj.right = true;
      break;
    case 40:
      obj.down = true;
      break;
    case 45:
      obj[0] = true;
      break;
  }

}
window.onkeyup = function (event) {
  switch (event.keyCode) {
    case 65:
      obj.a = false;
      break;
    case 87:
      obj.w = false;
      break;
    case 68:
      obj.d = false;
      break;
    case 83:
      obj.s = false;
      break;
    case 74:
      obj.j = false;
      break;

    case 37:
      obj.left = false;
      break;
    case 38:
      obj.up = false;
      break;
    case 39:
      obj.right = false;
      break;
    case 40:
      obj.down = false;
      break;
    case 45:
      obj[0] = false;
      break;
  }

}

// console.log(items)
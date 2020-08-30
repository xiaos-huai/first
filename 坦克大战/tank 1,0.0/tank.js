/*
 * @Author: your name
 * @Date: 2020-08-02 15:34:46
 * @LastEditTime: 2020-08-03 10:23:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \新建文件夹\tank\tank.js
 */
// 用于保存那个地方有item
let tankItem = []
let fires = [];
let db1 = {
  user: 'p1',
  move: {
    moveUp: 88,
    moveDown: 83,
    moveLeft: 65,
    moveRight: 68,
  },
  fire: 74,
  db: {
    x: 0,
    y: 0,
    items: [{
        x: 1,
        y: 0
      },
      {
        x: 0,
        y: 1
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 0,
        y: 2
      },
      {
        x: 2,
        y: 2
      }
    ]
  }
}
let db2 = {
  user: 'p2',
  move: {
    moveUp: 87,
    moveDown: 83,
    moveLeft: 65,
    moveRight: 68,
  },
  fire: 74,
  db: {
    x: 100,
    y:50,
    items: [{
        x: 1,
        y: 0
      },
      {
        x: 0,
        y: 1
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 0,
        y: 2
      },
      {
        x: 2,
        y: 2
      }
    ]
  }
}
let Tank = function (data) {
  this.user = data.user;
  this.moveUp = data.move.moveUp;
  this.moveDown = data.move.moveDown;
  this.moveLeft = data.move.moveLeft;
  this.moveRight = data.move.moveRight;
  this.fire = data.fire;
  this.db = data.db;
  this.dbt = data.db;
  this.items = [];
  this.box;
  // 赋值db
  this.clone = function () {
    let dbt = {};
    for (let key in this.db) {

    }
  }
  // 判断当前位置是否有item
  this.existence = function () {
    return this.db.items.some((item, index, arr) => {
      return tankItem[(parseInt(item.x) + parseInt(this.db.x)) + '_' + (parseInt(item.y) + parseInt(this.db.y))];
    })
  }
  // 移动
  this.move = function (number) {
    // 取消当前位置的item
    this.db.items.forEach((item, index, arr) => {
      tankItem[(parseInt(item.x) + parseInt(this.db.x)) + '_' + (parseInt(item.y) + parseInt(this.db.y))] = null;
    })

    let num = this.direction();
    if (num === number) {
      switch (number) {
        case 0:
          this.db.x--;
          break;
        case 1:
          this.db.y--;
          break;
        case 2:
          this.db.x++;
          break;
        case 3:
          this.db.y++;
          break;
      }
      if (this.existence()) {
        switch (number) {
          case 0:
            this.db.x++;
            break;
          case 1:
            this.db.y++;
            break;
          case 2:
            this.db.x--;
            break;
          case 3:
            this.db.y--;
            break;
        }
      }
    } else if (num > number) {
      for (let i = 0; i < num - number; i++) {
        this.rotate(false);
      }
      if (this.existence()) {
        for (let i = 0; i < num - number; i++) {
          this.rotate(true);
        }
      }
    } else {
      for (let i = 0; i < number - num; i++) {
        this.rotate(true);
      }
      if (this.existence()) {
        for (let i = 0; i < number - num; i++) {
          this.rotate(false);
        }
      }
    }
    this.reset()

  };
  // 获取当前方向
  this.direction = function () {
    let item0 = this.items[0];
    let item2 = this.items[2];
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
  // 发射子弹
  this.fire = function () {
    let elf = document.createElement('div');
    elf.setAttribute('class', 'fire ' + this.user);
    elf.setAttribute('date-direction', this.direction())
    elf.style.top = this.items[0].style.top;
    elf.style.left = this.items[0].style.left;
    this.box.appendChild(elf)
  };
  // 旋转
  this.rotate = function (num) {
    let i;
    if (num) {
      // 顺时针旋转
      for (let index in this.db.items) {
        i = parseInt(this.db.items[index].y);
        this.db.items[index].y = parseInt(this.db.items[index].x);
        this.db.items[index].x = 2 - i;
      }
    } else {
      // 逆时针旋转
      for (let index in this.db.items) {
        i = parseInt(this.db.items[index].x);
        this.db.items[index].x = parseInt(this.db.items[index].y);
        this.db.items[index].y = 2 - i;
      }
    }
  };
  // 创建模型 并且初始化位置
  this.create = function () {
    this.box = document.querySelector('.box');
    for (let item of this.db.items) {
      let el = document.createElement('div')
      el.setAttribute('class', this.user + ' item')
      el.style.top = (parseInt(item.y) + parseInt(this.db.y)) * 10 + 'px'
      el.style.left = (parseInt(item.x) + parseInt(this.db.x)) * 10 + 'px'
      this.box.appendChild(el)
      tankItem[(parseInt(item.x) + parseInt(this.db.x)) + '_' + (parseInt(item.y) + parseInt(this.db.y))] = el;
    }
    this.items = document.querySelectorAll('.' + this.user);

  }
}
// 重新定位
Tank.prototype.reset = function () {
  for (let index in this.db.items) {
    this.items[index].style.top = (parseInt(this.db.items[index].y) + parseInt(this.db.y)) * 10 + 'px';
    this.items[index].style.left = (parseInt(this.db.items[index].x) + parseInt(this.db.x)) * 10 + 'px';
    tankItem[(parseInt(this.db.items[index].x) + parseInt(this.db.x)) + '_' + (parseInt(this.db.items[index].y) + parseInt(this.db.y))] = this.items[index]
  }
}

console.log()
var p1 = new Tank(db1)
p1.create()
var p2 = new Tank(db2)
p2.create()

window.onkeydown = function (event) {
  switch (event.keyCode) {
    case 65:
      p1.move(0);
      break;
    case 87:
      p1.move(1);
      break;
    case 68:
      p1.move(2);
      break;
    case 83:
      p1.move(3);
      break;
    case 74:
      p1.fire();
      break;

    case 37:
      p2.move(0);
      break;
    case 38:
      p2.move(1);
      break;
    case 39:
      p2.move(2);
      break;
    case 40:
      p2.move(3);
      break;
    case 45:
      p2.fire();
      break;
  }

}
setInterval(function () {
  let box = document.querySelector('.box')
  let fires = document.querySelectorAll('.fire');
  for (let item of fires) {
    fires[parseInt(item.style.left) + '_' + parseInt(item.style.top)] = null;
  }
  for (let item of fires) {
    // console.log( typeof item.getAttribute('date-direction'))
    switch (item.getAttribute('date-direction')) {
      case '0':
        item.style.left = parseInt(item.style.left) - 10 + 'px';
        break;
      case '1':
        item.style.top = parseInt(item.style.top) - 10 + 'px';
        break;
      case '2':
        item.style.left = parseInt(item.style.left) + 10 + 'px';
        break;
      case '3':
        item.style.top = parseInt(item.style.top) + 10 + 'px';
        break;
    }
    if (parseInt(item.style.top) < 0 || parseInt(item.style.top) > 600 || parseInt(item.style.left) < 0 || parseInt(item.style.left) > 1200) {
      box.removeChild(item)
    }
  }
  for (let item of fires) {
    fires[parseInt(item.style.left) + '_' + parseInt(item.style.top)] = item;
  }
  // items保存所有item
  let items = document.querySelectorAll('.item')
  for (let item of items) {
    // console.log(item.classList)
    if (fires[parseInt(item.style.left) + '_' + parseInt(item.style.top)]) {
      let box = document.querySelector('.box')
      let fireC = fires[parseInt(item.style.left) + '_' + parseInt(item.style.top)].classList;
      let isP1 = false;
      fireC.forEach(function (value, index, arr) {
        if (value === 'p1') {
          isP1 = true
        }
      })
      // 移除子弹
      box.removeChild(fires[parseInt(item.style.left) + '_' + parseInt(item.style.top)])
      fires[parseInt(item.style.left) + '_' + parseInt(item.style.top)] = null
      // 移除被击中的坦克
      if (isP1) {
        let p2s = document.querySelectorAll('.p2')
        for (let item of p2s) {
          box.removeChild(item)
        }
        setTimeout(function () {
          p2.create()
        }, 1000)

      } else {
        let p1s = document.querySelectorAll('.p1')
        for (let item of p1s) {
          box.removeChild(item)
        }
        setTimeout(function () {
          p1.create()
        }, 1000)

      }
      isP1 = false;
    }
  }
  // console.log(fires)
}, 10)

console.log(tankItem)

// 子弹不会消失 
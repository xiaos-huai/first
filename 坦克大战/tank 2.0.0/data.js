/*
 * @Author: your name
 * @Date: 2020-08-03 15:06:58
 * @LastEditTime: 2020-08-04 15:57:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \新建文件夹\tank 2.0.0\index.js
 */ 

// 定义一个坦克模型数据
let tankModelDataDemo = {
    boxX: 50,
    boxY:5,
    items: {
      0:{
        modelX: 1,
        modelY: 0
      },
      1:{
        modelX: 0,
        modelY: 1
      },
      2:{
        modelX: 1,
        modelY: 1
      },
      3:{
        modelX: 2,
        modelY: 1
      },
      4:{
        modelX: 0,
        modelY: 2
      },
      5:{
        modelX: 2,
        modelY: 2
      }
    }
};
let tankModelDataP1 ={
  boxX: 50,
  boxY:50,
  items: {
    0:{
      modelX: 1,
      modelY: 0
    },
    1:{
      modelX: 0,
      modelY: 1
    },
    2:{
      modelX: 1,
      modelY: 1
    },
    3:{
      modelX: 2,
      modelY: 1
    },
    4:{
      modelX: 0,
      modelY: 2
    },
    5:{
      modelX: 2,
      modelY: 2
    }
  }
}
let tankModelDataP2 ={
  boxX: 10,
  boxY:5,
  items: {
    0:{
      modelX: 1,
      modelY: 0
    },
    1:{
      modelX: 0,
      modelY: 1
    },
    2:{
      modelX: 1,
      modelY: 1
    },
    3:{
      modelX: 2,
      modelY: 1
    },
    4:{
      modelX: 0,
      modelY: 2
    },
    5:{
      modelX: 2,
      modelY: 2
    }
  }
}
let wallModelData = [
  {modelX:1,modelY:10},
  {modelX:2,modelY:10},
  {modelX:3,modelY:10},
  {modelX:4,modelY:10},
  {modelX:5,modelY:10},
  {modelX:6,modelY:10},
  {modelX:7,modelY:10},
  {modelX:8,modelY:10},
  {modelX:9,modelY:10},
  
  {modelX:1,modelY:11},
  {modelX:2,modelY:11},
  {modelX:3,modelY:11},
  {modelX:4,modelY:11},
  {modelX:5,modelY:11},
  {modelX:6,modelY:11},
  {modelX:7,modelY:11},
  {modelX:8,modelY:11},
  {modelX:9,modelY:11},
  
  {modelX:1,modelY:12},
  {modelX:2,modelY:12},
  {modelX:3,modelY:12},
  {modelX:4,modelY:12},
  {modelX:5,modelY:12},
  {modelX:6,modelY:12},
  {modelX:7,modelY:12},
  {modelX:8,modelY:12},
  {modelX:9,modelY:12},

  {modelX:1,modelY:30},
  {modelX:2,modelY:30},
  {modelX:3,modelY:30},
  {modelX:4,modelY:30},
  {modelX:5,modelY:30},
  {modelX:6,modelY:30},
  {modelX:7,modelY:30},
  {modelX:8,modelY:30},
  {modelX:9,modelY:30},

  {modelX:1,modelY:31},
  {modelX:2,modelY:31},
  {modelX:3,modelY:31},
  {modelX:4,modelY:31},
  {modelX:5,modelY:31},
  {modelX:6,modelY:31},
  {modelX:7,modelY:31},
  {modelX:8,modelY:31},
  {modelX:9,modelY:31},

  {modelX:10,modelY:40},
  {modelX:20,modelY:40},
  {modelX:30,modelY:40},
  {modelX:40,modelY:40},
  {modelX:50,modelY:40},
  {modelX:60,modelY:40},
  {modelX:70,modelY:40},
  {modelX:80,modelY:40},
  {modelX:90,modelY:40},
  
]
// 克隆对象
Object.defineProperty(Object.prototype, "clone", {
  value: function (obj){
    let objC = {};
    for(let key in obj){
      if(typeof obj[key] === 'object'){
        objC[key] = Object.clone(obj[key])
      }else{
        objC[key] = obj[key];
      }
    }
    return objC;
  },
  writable: false,
  enumerable: false,
  configurable: false
});




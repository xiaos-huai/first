/*
 * @Author: your name
 * @Date: 2020-08-27 21:30:50
 * @LastEditTime: 2020-08-27 23:02:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \静态网站（笔记）\拖放\index.js
 */
let pagex = undefined;
let pagey = undefined;
let activeEl = null;
let container = document.querySelector('.container');
container.addEventListener('dragover', (event) => {
  // 阻止默认事件
  event.preventDefault();
})
container.addEventListener('drop', (event) => {
  console.log(event)
  // 如果拖入的是文件
  if (event.dataTransfer.files.length) {
    // 文件的路径
    // URL.createObjectURL(file)放回一个BOMString，表示的是该文件的地址
    // event.dataTransfer.files[0]代表拖入的文件
    let imgUrl = window.URL.createObjectURL(event.dataTransfer.files[0])
    console.log(imgUrl)
    let img = new Image();
    img.src = imgUrl;
    img.style.top = event.offsetY + 'px';
    img.style.left = event.offsetX + 'px';
    img.addEventListener('mousedown', (event) => {
      pagex = event.pageX;
      pagey = event.pageY;
      activeEl = event.target;
    })
    img.addEventListener('dragend', (event) => {
      event.target.style.top = (parseInt(event.target.style.top) + event.pageY - pagey) > 0 ? parseInt(event.target.style.top) + event.pageY - pagey + 'px' : '0px';
      event.target.style.left = (parseInt(event.target.style.left) + event.pageX - pagex) > 0 ? parseInt(event.target.style.left) + event.pageX - pagex + 'px': '0px';
    })
    container.appendChild(img);
    activeEl = img;
  } else {
    // 没有拖入文件

  }

  // 阻止默认事件
  event.preventDefault();
})
window.onkeydown = function (event) {
  if(event.shiftKey){
    switch (event.keyCode) {
      case 37:
        activeEl.style.left = parseInt(activeEl.style.left) - 9 + 'px';
        break;
      case 38:
        activeEl.style.top = parseInt(activeEl.style.top) - 9 + 'px';
        break;
      case 39:
        activeEl.style.left = parseInt(activeEl.style.left) + 9 + 'px';
        break;
      case 40:
        activeEl.style.top = parseInt(activeEl.style.top) + 9 + 'px';
        break;
    }
  }
  switch (event.keyCode) {
    case 37:
      activeEl.style.left = parseInt(activeEl.style.left) - 1 + 'px';
      break;
    case 38:
      activeEl.style.top = parseInt(activeEl.style.top) - 1 + 'px';
      break;
    case 39:
      activeEl.style.left = parseInt(activeEl.style.left) + 1 + 'px';
      break;
    case 40:
      activeEl.style.top = parseInt(activeEl.style.top) + 1 + 'px';
      break;
  }
}
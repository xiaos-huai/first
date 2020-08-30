/*
 * @Author: your name
 * @Date: 2020-08-22 17:40:49
 * @LastEditTime: 2020-08-22 19:05:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \静态网站（笔记）\js\动态tab.js
 */
let that;
function Tab(id) {
  that = this;
  this.main = document.querySelector(id)
  this.navs = [];
  this.btn = null;
  this.init();
}
// 初始化
Tab.prototype.init = function() {
  this.navs = this.main.querySelectorAll('.nav');
  this.btn = this.main.querySelector('.btn')
  this.btn.addEventListener('click',this.addTab)
  for ( let el of this.navs){
    el.addEventListener('dblclick',this.editTab)
    el.addEventListener('click',this.toggleTab)
  }
}
// 切换功能
Tab.prototype.toggleTab = function() {
  let parent = this.parentNode;
  let navs = parent.querySelectorAll('.nav')
  for(let el of navs ){
    el.style.borderBottom = '2px solid #ffffff'
  }
  this.style.borderBottom = 'none'
}
// 添加功能
Tab.prototype.addTab = function() {
  let parent = this.parentNode;
  let el = document.createElement('div');
  // el.classList.toggle('dbactive')
  el.classList.add('dbactive')
  el.classList.add('nav')
  // el.className = 'nav';
  el.innerHTML = `<em>+</em><span>默认</span><input type="text" placeholder="情输入标签名">`;
  parent.insertBefore(el,this)
  that.init()
  

  let input = el.querySelector('input');
  let span = el.querySelector('span')
  let em = el.querySelector('em')
  // focus获取焦点
  input.focus();
  input.addEventListener('focusout',function (){
    if(input.value.trim() === ""){
      input.value = '默认'
    }
    span.innerText = input.value;
    span.style.display = "inline";
    input.style.display = 'none'
  })
  em.addEventListener('click',that.removeTab)
}
// 删除功能
Tab.prototype.removeTab = function() {
  let par = this.parentNode;
  let grpar = par.parentNode;
  grpar.removeChild(par)
}
// 修改功能
Tab.prototype.editTab = function() {
  let input = this.querySelector('input');
  let span = this.querySelector('span')
  span.style.display = 'none';
  input.style.display = 'inline-block'
  input.focus()
}

new Tab('#nav')
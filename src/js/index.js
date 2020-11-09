// 获取DOM元素
const listInput = document.querySelector("#listInput")
const todoOl = document.querySelector("#todo")
const doneOl = document.querySelector("#done")
const content = document.querySelector(".content")
const clearbtn = document.querySelector("#clearbtn")
const todocount = document.querySelector("#todocount")
const donecount = document.querySelector("#donecount")
const itemText = document.querySelector(".itemText")
let todonum = 0;
let donenum = 0;
// 测试一下git
let todoList = [];

// clear 清楚数据
clearbtn.onclick = function (todoList) {
  todoList = [];
  render(todoList)
  // console.log(todoList);
}

// 获取输入框输入的内容
listInput.onkeydown = function (e) {
  if (e.key === "Enter") {
    if (!e.target.value) {
      alert("请输入清单")
    } else {
      const iuputValue = e.target.value;
      // console.log(e.target.value);
      // 形成 listItem 对象存放信息
      const listItem = {
        title: iuputValue,
        isDone: false
      }
      todoList.push(listItem)
      render(todoList)
    }
  }
}

// 渲染数据
function render(todoList) {
  // 处理JSON数据 转为 字符串
  localStorage.todoList = JSON.stringify(todoList);
  // 每次渲染前，把<ol id="todo"></ol>\<ol id="done"></ol> 清空后再渲染
  todocount.innerHTML = 0
  donecount.innerHTML = 0
  todoOl.innerHTML = ""
  doneOl.innerHTML = ""
  todonum = 0;
  donenum = 0;
  // console.log(todoList);
  todoList.forEach((item, index) => {
    const liItem = document.createElement("li")
    liItem.className = "item"
    // console.log(item.title, item.isDone);
    if (!item.isDone) {
      liItem.innerHTML = `
        <input type="checkbox" data-index="${index}" class="checkbox">
        <input type="text" value="${item.title}" class="itemText" data-index="${index}">
        <span class="del" data-index="${index}">-</span>
        `
      todonum++
      // console.log(todonum);
      todocount.innerHTML = todonum
      todoOl.append(liItem)
    } else {
      liItem.innerHTML = `
        <input type="checkbox" checked data-index="${index}" class="checkbox">
        <input type="text" value="${item.title}" disabled>
        <span class="del" data-index="${index}">-</span>
        `
      donenum++
      donecount.innerHTML = donenum
      doneOl.append(liItem)
    }
  });
}

// 存入本地缓存
function handleStorage() {
  if (localStorage.todoList == undefined) {
    todoList = [];
  } else {
    // 字符串转为JSON格式
    todoList = JSON.parse(localStorage.todoList);
  }
  render(todoList)
}

todoOl.onchange = function (e) {
  const index = parseInt(e.target.dataset.index)
  todoList[index].isDone = true;
  render(todoList)
}

handleStorage()

doneOl.onchange = function (e) {
  const index = parseInt(e.target.dataset.index)
  todoList[index].isDone = false;
  render(todoList)
}

content.onclick = function (e) {
  if (e.target.className === "del") {
    const index = e.target.dataset.index
    todoList.splice(index, 1)
    render(todoList)
  }
  if (e.target.className === "itemText") {
    e.target.onblur = function () {
      const index = e.target.dataset.index
      // console.log(e.target.value);
      todoList[index].title = e.target.value
      todoList[index].isDone = false;
      // console.log(todoList[index]);
      render(todoList)
    }
  }
}
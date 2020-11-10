// 实例对象
const app = new Vue({
  el: "#app",
  data: {
    // 初始数据
    todoList: [],
    inputValue: "",
    todocount: 0,
    donecount: 0
  },
  computed: {
    // 区分正在进行 和 以及完成
    todoOl() {
      let arr = this.todoList.filter((item, index) => {
        return !item.isDone;
      })
      this.saveData()
      // 统计todo的条数
      this.todocount = arr.length;
      return arr.reverse();

    },
    doneOl() {
      let arr = this.todoList.filter((item, index) => {
        return item.isDone;
      })
      this.saveData()
      // 统计done的条数
      this.donecount = arr.length;
      return arr.reverse();
    }
  },
  methods: {
    // 双向绑定数据 
    addList(e) {
      if (e.target.value) {
        this.todoList.push({
          title: this.inputValue,
          isDone: false,
          id: this.todoList.length
        })
        this.saveData()
        this.inputValue = ""
      }
    },
    // 将数据保存到本地存储
    saveData() {
      localStorage.todoList = JSON.stringify(this.todoList)
    },
    // 改变数据的isDone
    checkDone(id) {
      this.todoList[id].isDone = !this.todoList[id].isDone
      this.saveData()
    },
    // 删除单条数据
    deleteItem(id) {
      this.todoList.splice(id, 1)
      // 重新遍历数据的长度，并给id赋值
      this.todoList.forEach((item, i) => {
        item.id = i;
      });
      this.saveData()
    },
    // 清空全部数据
    clearAll() {
      this.todoList = [];
    }
  },
  // 读取本地缓存，并写入数据
  created() {
    this.todoList = localStorage.todoList ? JSON.parse(localStorage.todoList) : [];
  },
});
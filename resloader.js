export default class ResLoader {
  constructor() {
    this.list = []
    this.res = {}
    this.load_num = 0
  }
  add(name, src) {
    this.list.push({
      name: name,
      src: src
    })
  }
  on_load_finish(fun) {
    const _self = this
    this.list.map(item => {
      console.log(item.src)
      const image = wx.createImage()
      image.src = item.src
      image.onload = function () {
        console.log(item.name + ' load')
        _self.res[item.name] = this
        _self.load_num += 1;
      }
    })
    const id = setInterval(() => {
      if(_self.load_num==_self.list.length){
        clearInterval(id)
        fun(_self.res)
      }
    }, 100)
  }
}
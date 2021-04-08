// let on_update_fn = () => {}
export default class Sprite {
  constructor(x = 0, y = 0, img, scale = 1, collision_buff = 0.8) {
    this.x = x
    this.y = y
    this.scale = scale
    this.setImg(img)
    this.vx = 0
    this.vy = 0
    this.collision_buff = collision_buff
    this.on_update = () => {}
  }
  setImg(img) {
    this.img = img
    this.width = img.width * this.scale
    this.height = img.height * this.scale
  }
  setPosition(x, y) {
    this.x = x
    this.y = y
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.on_update()
  }
  remove_from(arr) {
    const index = arr.indexOf(this)
    if (index != -1) {
      arr.splice(index, 1)
    }
  }
  collision_with(arr) {
    const self = this
    return arr.filter(item => {
      return item.x + item.width * this.collision_buff > self.x &&
        item.x < self.x + item.width * this.collision_buff && self.y + self.height * this.collision_buff > item.y &&
        self.y < item.y + item.height * this.collision_buff
    })
  }
  draw(context) {
    context.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }
}
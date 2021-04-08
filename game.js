const context = canvas.getContext('2d')
const {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync()

export default class Game {
  constructor(res_gameover) {
    this.score = 0
    this.life = 1
    this.gameover = false
    this.time = 0
    this.on_times = []
    this.on_update = () => {}
    this.player = null
    this.enemys = []
    this.bullets = []
    this.foods = []
    this.res_gameover = res_gameover
  }
  restart() {
    this.enemys = []
    this.bullets = []
    this.foods = []
    this.score = 0
    this.life = 1
    this.gameover = false
    this.time = 0
  }
  set_player(player) {
    this.player = player
  }
  add_enemy(enemy) {
    this.enemys.push(enemy)
  }
  // remove_enemy(enemy) {

  // }
  // remove_bullet(bullet) {

  // }
  // remove_food(food) {

  // }
  add_bullet(bullet) {
    this.bullets.push(bullet)
  }
  add_food(food) {
    this.foods.push(food)
  }

  on_time(time = 100, fn = () => {}) {
    this.on_times.push({
      time: time,
      fn: fn
    })
  }
  update() {
    if (this.player) {
      this.player.update()
    }
    this.enemys.map(item => item.update())
    this.bullets.map(item => item.update())
    this.foods.map(item => item.update())
  }
  render_life(x = 8, y = 30, fontSize = 20) {
    context.font = `normal ${fontSize}px serif`
    context.fillStyle = '#fff'
    context.fillText(`🧡 x ${this.life}`, x, y)
  }
  render_score(x = 10, y = 60, fontSize = 20) {
    context.font = `normal ${fontSize}px sans-serif`
    context.fillStyle = '#fff'
    context.fillText(`score: ${this.score}`, x, y)
  }
  render() {
    if (this.player) {
      this.player.draw(context)
    }
    this.enemys.map(item => item.draw(context))
    this.bullets.map(item => item.draw(context))
    this.foods.map(item => item.draw(context))
    this.render_life()
    this.render_score()
  }
  render_gameover() {
    context.drawImage(this.res_gameover, windowWidth / 2 - this.res_gameover.width / 4, windowHeight / 2 - this.res_gameover.height / 4, this.res_gameover.width / 2, this.res_gameover.height / 2)
  }
  start() {
    const step = (timestamp) => {
      context.clearRect(0, 0, windowWidth, windowHeight)
      if (!this.gameover) {
        this.time += 1
        this.on_times.map(item => {
          if (this.time % item.time == 0) {
            item.fn()
          }
        })
        this.update()
        this.on_update()
      }
      this.render()

      if (this.gameover) {
        this.render_gameover()
      }
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
}
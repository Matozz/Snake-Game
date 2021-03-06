const Gdt = require("globals");

cc.Class({
  extends: cc.Component,
  properties: {
    xSpeed: 0,
    ySpeed: 0,
    hpDrop: 0, //Hp dropped per enemy bullet
  },

  onLoad() {
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
    this.enemyBulletGroup = this.node.parent.getComponent("enemy_bullet_group");
  },

  onCollisionEnter(other, self) {
    if (other.node.group == "hero" || other.node.group == "heroBullet")
      this.enemyBulletGroup.bulletDied(this.node);
  },

  update(dt) {
    if (this.enemyBulletGroup.curState != Gdt.commonInfo.gameState.start)
      return;
    this.node.x += dt * this.xSpeed;
    this.node.y += dt * this.ySpeed;
    // console.log(this.node.y, this.node.parent);
    if (this.node.y < -this.node.parent.height / 2) {
      this.enemyBulletGroup.bulletDied(this.node);
    }
  },
});

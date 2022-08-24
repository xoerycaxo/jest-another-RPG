const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    inquirer
  .prompt({
    type: 'list',
    messege: 'What would you like to do?',
    name: 'action',
    choices: ['Attack', 'Use potion']
  })
  // destructure name from the prompt object
  .then(({ action }) => {
    if (action === 'Use potion') {
    } else {
        const damage = this.player.getAttackValue();
        this.currentEnemy.reduceHealth(damage);

        console.log(`You attacked the ${this.currentEnemy.name}`);
        console.log(this.currentEnemy.getHealth());
      }

    this.startNewBattle();
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

  });
};
Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
  };

Game.prototype.battle = function() {
  if (this.isPlayerTurn) {
    // player prompts will go here
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
  }
};


module.exports = Game;
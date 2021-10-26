import { createElement } from './common.js'

function Player(player, name, hp, img, weapon) {
  this.playerNumber = player;
  this.name = name;
  this.hp = hp;
  this.img = img;
  this.weapon = weapon;
  this.attack = function() {
    console.log(`${this.name} - Fight...`);
  };
  this.changeHp = function(damage) {
    this.hp = this.hp - damage > 0 ? this.hp - damage : 0;
  };
  this.elHP = function() {
    return document.querySelector(`.player${this.playerNumber} .life`);
  };
  this.renderHp = function() {
    const $playerLife = this.elHP();
    $playerLife.style.width = `${this.hp}%`;
  };
}

export const player1 = new Player(
  1,
  'SUBZERO', 
  100, 
  'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  ['Kori Blade', 'Ice']
);
export const player2 = new Player(
  2,
  'SCORPION',
  100,
  'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  ['Kunai', 'Blade']
);

export const createPlayer = ({ playerNumber, hp, name, img }) => {
  const $player = createElement('div', `player${playerNumber}`);
  const $progressbar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');
  
  $life.style.width = `${hp}%`;
  $name.innerHTML = name;
  $img.src = img;
  
  $player.appendChild($progressbar);
  $player.appendChild($character);
  
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  
  $character.appendChild($img);
  
  return $player;
}

import { createElement } from './common.js'

class Player {
  constructor(props) {
    this.playerNumber = props.playerNumber;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }
  
  attack = () => {
    console.log(`${this.name} - Fight...`);
  };
  
  changeHp = (damage) => {
    this.hp = this.hp - damage > 0 ? this.hp - damage : 0;
  };
  
  elHP = () => {
    return document.querySelector(`.player${this.playerNumber} .life`);
  };
  
  renderHp = () => {
    const $playerLife = this.elHP();
    $playerLife.style.width = `${this.hp}%`;
  };
  
  createPlayer = () => {
    const { playerNumber, hp, name, img } = this;
    
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
}

export const player1 = new Player({
  playerNumber: 1,
  name: 'SUBZERO', 
  hp: 100, 
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Kori Blade', 'Ice']
});

export const player2 = new Player({
  playerNumber: 2,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Blade']
});

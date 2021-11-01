import { $arenas } from './fight.js';
import { createElement } from './common.js';

export class Player {
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
  
  renderPlayer = () => {
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
    
    $arenas.appendChild($player);
  }
}

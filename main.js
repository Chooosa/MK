function Player(name, hp, img, weapon) {
  this.name = name;
  this.hp = hp;
  this.img = img;
  this.weapon = weapon;
  this.attack = function() {
    console.log(`${this.name} - Fight...`);
  }
}

const player1 = new Player(
  'Subzero', 
  77, 
  'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  ['Kori Blade', 'Ice']
);
const player2 = new Player(
  'Scorpion',
  88,
  'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  ['Kunai', 'Blade']
);

const $arenas = document.querySelector('.arenas');

function createPlayer(className, player) {
  const { hp, name, img } = player;
  
  const $player = document.createElement('div');
  $player.classList.add(className);
  
  const $progressbar = document.createElement('div');
  $progressbar.classList.add('progressbar');
  
  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = `${hp}%`;
  
  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerHTML = name;
  
  const $character = document.createElement('div');
  $character.classList.add('character');
  
  const $img = document.createElement('img');
  $img.src = img;
  
  $arenas.appendChild($player);
  
  $player.appendChild($progressbar);
  $player.appendChild($character);
  
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  
  $character.appendChild($img);
}

createPlayer('player1', player1);
createPlayer('player2', player2);

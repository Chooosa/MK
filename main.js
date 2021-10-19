const $arenas = document.querySelector('.arenas');
const $control = document.querySelector('.control');
const $attackButton = document.querySelector('.button');
const $restartButton = document.querySelector('.reloadWrap .button');

function Player(player, name, hp, img, weapon) {
  this.playerNumber = player;
  this.name = name;
  this.hp = hp;
  this.img = img;
  this.weapon = weapon;
  this.attack = function() {
    console.log(`${this.name} - Fight...`);
  }
  this.changeHp = changeHp;
  this.elHP = elHP;
  this.renderHp = renderHp;
}

const player1 = new Player(
  1,
  'Subzero', 
  100, 
  './assets/Subzero.gif',
  ['Kori Blade', 'Ice']
);
const player2 = new Player(
  2,
  'Scorpion',
  100,
  './assets/Scorpion.gif',
  ['Kunai', 'Blade']
);

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  
  if (className) {
    $tag.classList.add(className);
  }
  
  return $tag;
}

function createPlayer({ playerNumber, hp, name, img }) {
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

function getRandomInt(min, max) {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}

function changeHp(damage) {
  this.hp = this.hp - damage > 0 ? this.hp - damage : 0;
}

function elHP() {
  return document.querySelector(`.player${this.playerNumber} .life`);
}

function renderHp() {
  const $playerLife = elHP.apply(this);
  $playerLife.style.width = `${this.hp}%`;
}

function showResultLabel(name) {
  const $winTitle = createElement('div', 'winTitle');
  
  if (name) {
    $winTitle.innerHTML = `${name} win!`;
  } else {
    $winTitle.innerHTML = `Draw!`;
  }
  
  return $winTitle;
}

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  
  $button.innerHTML = 'Restart';
  $reloadWrap.appendChild($button);
  $button.addEventListener('click', function() {
    window.location.reload();
  })
  
  return $reloadWrap;
}

$attackButton.addEventListener('click', function() {
  player1.changeHp(getRandomInt(1, 20));
  player1.renderHp();
  
  player2.changeHp(getRandomInt(1, 20));
  player2.renderHp();
  
  if (player1.hp === 0 || player2.hp === 0) {
    $attackButton.disabled = true;
    $control.appendChild(createReloadButton());
  }
  
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(showResultLabel(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(showResultLabel(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(showResultLabel());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

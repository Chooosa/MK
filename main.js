const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
// const $attackButton = document.querySelector('.button');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

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
  'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  ['Kori Blade', 'Ice']
);
const player2 = new Player(
  2,
  'Scorpion',
  100,
  'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
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
  const $playerLife = this.elHP();
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
  $button.addEventListener('click', function() {
    window.location.reload();
  })
  
  $reloadWrap.appendChild($button);
  $arenas.appendChild($reloadWrap);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAtack() {
  const hit = ATTACK[getRandomInt(0, 2)];
  const defence = ATTACK[getRandomInt(0, 2)];
  
  return {
    value: getRandomInt(1, HIT[hit]),
    hit, 
    defence,
  }
}

function userAtack(form) {
  const atack = {};
  
  for (let item of form ) {
    if (item.checked && item.name === 'hit') {
      atack.value = getRandomInt(1, HIT[item.value]);
      atack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      atack.defence = item.value;
    }
    
    item.checked = false;
  }
  
  return atack;
}

function renderAtackResult(player, damage) {
  player.changeHp(damage);
  player.renderHp();
}

$formFight.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const enemy = enemyAtack();
  const user = userAtack($formFight);
  
  const enemyDamage = enemy.hit !== user.defence ? enemy.value : 0;
  const userDamage = user.hit !== enemy.defence ? user.value : 0;
  
  renderAtackResult(player1, userDamage);
  renderAtackResult(player2, enemyDamage);
  
  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.style.display = 'none';
    createReloadButton();
  }
  
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(showResultLabel(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(showResultLabel(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(showResultLabel());
  }
});

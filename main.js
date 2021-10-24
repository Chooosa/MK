import LOGS from './log.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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
  'SUBZERO', 
  100, 
  'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  ['Kori Blade', 'Ice']
);
const player2 = new Player(
  2,
  'SCORPION',
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

function renderAtackResult(player1, player2, damage) {
  player1.changeHp(damage);
  player1.renderHp();
  
  generateLogs(damage ? 'hit' : 'defence', player2, player1, damage);
}

function getTime() {
  const date = new Date();
  const minutes = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  const seconds = `${date.getSeconds() < 10 ? "0" : ""}${date.getSeconds()}`;
  return `${date.getHours()}:${minutes}:${seconds}`;
  
}

function generateLogs(type, player1, player2, damage) {
  const logType = LOGS[type];
  const name1 = player1.name.toUpperCase()
  const name2 = player2.name.toUpperCase()
  let text;
  let log;
  const time = getTime();
  
  switch (type) {
    case 'start':
      text = LOGS[type]
        .replace('[time]', time)
        .replace('[player1]', name1)
        .replace('[player2]', name2);
      break;
    case 'hit':
      log = logType[getRandomInt(0, logType.length-1)]
        .replace('[playerKick]', name1)
        .replace('[playerDefence]', name2);
      text = `[${time}] ${log} [-${damage}][${name2} - ${player2.hp}/100]`;
      break;
    case 'defence':
      log = logType[getRandomInt(0, logType.length-1)]
        .replace('[playerKick]', name1)
        .replace('[playerDefence]', name2);
      text = `[${time}] ${log} [${name2} - ${player2.hp}/100]`;
      break;
    case 'end':
      text = logType[getRandomInt(0, logType.length-1)]
        .replace('[playerWins]', name1)
        .replace('[playerLose]', name2);
      break;
    case 'draw':
      text = LOGS[type];
      break;
    default:
      text = 'Что-то даже я не понял, что произошло!';
  }
  
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.style.display = 'none';
    createReloadButton();
  }
  
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(showResultLabel(player2.name));
    generateLogs('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(showResultLabel(player1.name));
    generateLogs('end', player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(showResultLabel());
    generateLogs('draw');
  }
}

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const enemy = enemyAtack();
  const user = userAtack($formFight);
  
  const enemyDamage = enemy.hit !== user.defence ? enemy.value : 0;
  const userDamage = user.hit !== enemy.defence ? user.value : 0;
  
  renderAtackResult(player2, player1, userDamage);
  renderAtackResult(player1, player2, enemyDamage);
  
  showResult();
});

import LOGS from '../assets/log.js';
import { createElement, getRandomInt, getTime } from './common.js';
import { player1, player2 } from './Player.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const showResultLabel = (name) => {
  const $winTitle = createElement('div', 'winTitle');
  
  if (name) {
    $winTitle.innerHTML = `${name} win!`;
  } else {
    $winTitle.innerHTML = `Draw!`;
  }
  
  return $winTitle;
}

const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  
  $button.innerHTML = 'Restart';
  $button.addEventListener('click', () => {
    window.location.reload();
  })
  
  $reloadWrap.appendChild($button);
  $arenas.appendChild($reloadWrap);
}

export const enemyAtack = () => {
  const hit = ATTACK[getRandomInt(0, 2)];
  const defence = ATTACK[getRandomInt(0, 2)];
  
  return {
    value: getRandomInt(1, HIT[hit]),
    hit, 
    defence,
  }
}

export const userAtack = (form) => {
  const atack = {};
  
  for (let item of form ) {
    let { checked, name, value } = item;
    
    if (checked && name === 'hit') {
      atack.value = getRandomInt(1, HIT[value]);
      atack.hit = value;
    }
    if (checked && name === 'defence') {
      atack.defence = value;
    }
    
    item.checked = false;
  }
  
  return atack;
}

export const renderAtackResult = (player1, player2, damage) => {
  player1.changeHp(damage);
  player1.renderHp();
  
  generateLogs(damage ? 'hit' : 'defence', player2, player1, damage);
}

export const generateLogs = (type, player1, player2, damage) => {
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

export const showResult = () => {
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
import LOGS from '../../assets/log.js';
import { createElement, getRandomInt, getTime } from './common.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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
    window.location.pathname = 'index.html';
  })
  
  $reloadWrap.appendChild($button);
  $arenas.appendChild($reloadWrap);
}

const getDamageAsync = async (hit, defence) => {
  const q = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify({
        hit,
        defence,
    })
  }).then(res => res.json());
  
  return q;
}

export const getAtackResult = async (form) => {
  let hit = '';
  let defence = '';
  
  for (let item of form ) {
    let { checked, name, value } = item;
    
    if (checked && name === 'hit') {
      hit = value;
    }
    if (checked && name === 'defence') {
      defence = value;
    }
    item.checked = false;
  }
  
  const atack = await getDamageAsync(hit, defence);
  
  return atack;
}

export const renderAtackResult = (player1, player2, damage) => {
  player1.changeHp(damage);
  player1.renderHp();
  
  generateLogs(damage ? 'hit' : 'defence', player2, player1, damage);
}

export const generateLogs = (type, player1, player2, damage) => {
  const logType = LOGS[type];
  const name1 = player1.name;
  const name2 = player2.name;
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

export const showResult = (player1, player2) => {
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

export const getRandomArena = () => {
  $arenas.classList.add(`arena${getRandomInt(1, 5)}`);
}
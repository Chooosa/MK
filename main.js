const $arenas = document.querySelector('.arenas');
const $attackButton = document.querySelector('.button');

function Player(player, name, hp, img, weapon) {
  this.playerNumber = player;
  this.name = name;
  this.hp = hp;
  this.img = img;
  this.weapon = weapon;
  this.attack = function() {
    console.log(`${this.name} - Fight...`);
  }
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

function changeHp(player) {
  const $playerLife = document.querySelector(`.player${player.playerNumber} .life`);
  const damage = Math.ceil(Math.random() * 20);
  const $winTitle = document.querySelector('.winTitle');
  
  player.hp = player.hp - damage > 0 ? player.hp - damage : 0;
  $playerLife.style.width = `${player.hp}%`;
  
  if (player.hp === 0) {
    $attackButton.disabled = true;
    
    if ($winTitle) {
      playerWin();
      return;
    }
    
    const winnerName = player.playerNumber === 1 ? player2.name : player1.name;
    $arenas.appendChild(playerWin(winnerName));
  }
}

function playerWin(name) {
  let $winTitle = document.querySelector('.winTitle');
  
  if (!$winTitle) {
    $winTitle = createElement('div', 'winTitle');
    $winTitle.innerHTML = `${name} win!`;
  } else {
    $winTitle.innerHTML = `Draw!`;
  }
  
  return $winTitle;
}

$attackButton.addEventListener('click', function() {
  changeHp(player1);
  changeHp(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

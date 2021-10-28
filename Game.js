import { 
  $arenas,
  $formFight,
  generateLogs,
  enemyAtack,
  userAtack,
  renderAtackResult,
  showResult
} from './utils/fight.js';
import { createElement } from './utils/common.js'
import { player1, player2 } from './utils/Player.js';

export default class Game {
  createPlayer = (player) => {
    const { playerNumber, hp, name, img } = player;
    
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
  
  start = () => {
    $arenas.appendChild(this.createPlayer(player1));
    $arenas.appendChild(this.createPlayer(player2));

    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const enemy = enemyAtack();
      const user = userAtack($formFight);
      
      const enemyDamage = enemy.hit !== user.defence ? enemy.value : 0;
      const userDamage = user.hit !== enemy.defence ? user.value : 0;
      
      renderAtackResult(player2, player1, userDamage);
      renderAtackResult(player1, player2, enemyDamage);
      
      showResult();
    });
  }
}



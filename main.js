import { 
  $arenas,
  $formFight,
  generateLogs,
  enemyAtack,
  userAtack,
  renderAtackResult,
  showResult
} from './utils/fight.js';
import { player1, player2, createPlayer } from './utils/Player.js';

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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

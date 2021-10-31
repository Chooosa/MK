import {
  $formFight,
  generateLogs,
  getAtackResult,
  renderAtackResult,
  showResult,
  getRandomArena
} from './utils/fight.js';
import { Player } from './utils/Player.js';

export default class Game {  
  getUser = () => {
    return JSON.parse(localStorage.getItem('player1'));
  }
  
  getEnemy = async () => {
    const enemy = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    return enemy;
  }
  
  init = (player1, player2) => {
    player1.renderPlayer();
    player2.renderPlayer();
    
    getRandomArena();

    generateLogs('start', player1, player2);
  }
  
  start = async () => {
    const user = this.getUser();
    const enemy = await this.getEnemy();
    
    const player1 = new Player({
      ...user,
      playerNumber: 1,
    });
    const player2 = new Player({
      ...enemy,
      playerNumber: 2,
    });
    
    this.init(player1, player2);
    
    $formFight.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const players = await getAtackResult($formFight);
      const user = players.player1;
      const enemy = players.player2;
      
      console.log('enemy:', enemy);
      console.log('user:', user);
      
      const enemyDamage = enemy.hit !== user.defence ? enemy.value : 0;
      const userDamage = user.hit !== enemy.defence ? user.value : 0;
      
      renderAtackResult(player2, player1, userDamage);
      renderAtackResult(player1, player2, enemyDamage);
      
      showResult(player1, player2);
    });
  }
}



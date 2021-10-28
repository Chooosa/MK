class Player {
  constructor(props) {
    this.playerNumber = props.playerNumber;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }
  
  attack = () => {
    console.log(`${this.name} - Fight...`);
  };
  
  changeHp = (damage) => {
    this.hp = this.hp - damage > 0 ? this.hp - damage : 0;
  };
  
  elHP = () => {
    return document.querySelector(`.player${this.playerNumber} .life`);
  };
  
  renderHp = () => {
    const $playerLife = this.elHP();
    $playerLife.style.width = `${this.hp}%`;
  };
}

export const player1 = new Player({
  playerNumber: 1,
  name: 'SUBZERO', 
  hp: 100, 
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Kori Blade', 'Ice']
});

export const player2 = new Player({
  playerNumber: 2,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Blade']
});

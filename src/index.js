import './index.css';
import goblinImg from './assets/goblin.png';
import hammerImg from './assets/hammer.png';

class Board {
  constructor(size = 4) {
    this.size = size;
    this.cells = [];
    this.element = document.getElementById('game');
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.element.append(cell);
      this.cells.push(cell);
    }
  }
}

class Goblin {
  constructor(cells, onHit, onMissed) {
    this.cells = cells;
    this.onHit = onHit;
    this.onMissed = onMissed;
    this.currentCell = null;
  }

  appear() {
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    const cell = this.cells[randomIndex];
    const img = document.createElement('img');
    img.src = goblinImg;
    img.classList.add('goblin');
    img.addEventListener('click', () => {
      this.onHit();
      cell.remove(img);
    });
    cell.append(img);
    this.currentCell = cell;

    setTimeout(() => {
      if (cell.contains(img)) {
        cell.remove(img);
        this.onMissed();
      }
    }, 1000);
  }
}

class Game {
  constructor() {
    this.board = new Board();
    this.score = 0;
    this.missed = 0;
    this.goblin = new Goblin(this.board.cells, this.hit.bind(this), this.miss.bind(this));
    this.start();
  }

  hit() {
    this.score++;
    document.getElementById('score').textContent = `Score: ${this.score}`;
  }

  miss() {
    this.missed++;
    document.getElementById('missed').textContent = `Missed: ${this.missed}`;
    if (this.missed >= 5) {
      alert('Game Over!');
      clearInterval(this.interval);
    }
  }

  start() {
    this.interval = setInterval(() => this.goblin.appear(), 1000);
  }
}

new Game();

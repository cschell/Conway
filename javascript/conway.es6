class Game {
  constructor(width, height, seedProbability) {
    this.width = width;
    this.height = height;
    this.seedProbability = seedProbability;

    

    this.rows = Array.apply(null, Array(height))
                      .map(
                        () => {
                          return Array.apply(null, Array(width)).map(
                            () => {
                              return this.schroedingersCell();
                            }
                          );
                        }
                      );
  }

  schroedingersCell() {
    if( this.seedProbability >= Math.random()){
      return new LivingCell();
    } else {
      return new DeadCell();
    }
  }

  next() {
    var foo_rows = this.rows.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        var topCells = [];
        var bottomCells = [];
        var leftCell;
        var rightCell;

        var fromColumnIndex = columnIndex <= 1 ? 0 : columnIndex - 1;
        var toColumnIndex = columnIndex >= row.length - 1 ? row.length : columnIndex + 2

        if(rowIndex > 0 ) {
          topCells = this.rows[rowIndex - 1].slice(fromColumnIndex, toColumnIndex);
        }

        if(rowIndex < this.rows.length - 1 ) {
          bottomCells = this.rows[rowIndex + 1].slice(fromColumnIndex, toColumnIndex);
        }

        leftCell = row[columnIndex - 1];
        rightCell = row[columnIndex + 1];

        var neighbours = topCells.concat(bottomCells).concat([leftCell]).concat([rightCell])

        return cell.nextGeneration(neighbours);
      });
    });

    this.rows = foo_rows;
  }

  toString() {
    return this.rows.map((row) => {
      return row.map((cell) => {
        return cell.toString();
      }).join(' ');
    }).join("\n");
  }
}


class Cell {
  nextGeneration(neighbours) {

    switch(this.countLivingCells(neighbours)){
      case 0:
      case 1:
        return this.beDead();
      case 2:
        return this.stayAlive();
      case 3:
        return this.live();
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return this.beDead();
    }
  }

  countLivingCells(cells) {
    return  cells.filter(this.isLiving)
                 .length;
  }

  isLiving(cell) {
    return cell && cell.constructor.name === 'LivingCell';
  }
}

class LivingCell extends Cell {
  constructor() {
    this.living = true;
  }

  beDead() {
    return new DeadCell;
  }

  stayAlive() {
    return this;
  }

  live() {
    return this.stayAlive();
  }

  toString() {
    return 'x';
  }
}

class DeadCell extends Cell {
  beDead() {
    return this;
  }

  stayAlive() {
    return this.beDead();
  }

  live() {
    return new LivingCell;
  }

  toString() {
    return '_';
  }
}

var game = new Game(6, 6, 0.3);
console.log(game.toString());
console.log();
console.log();
console.log();
game.next();
console.log(game.toString());
console.log();
console.log();
console.log();
game.next();
console.log(game.toString());
console.log();
console.log();
console.log();
game.next();
console.log(game.toString());
console.log();
console.log();
console.log();
game.next();
console.log(game.toString());
console.log();
console.log();
console.log();
game.next();
console.log(game.toString());

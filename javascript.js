
//A better version

function knightMovesNew(start = [0, 0], goal = [7, 7]) {
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -2],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  const queue = [[start, null]];
  const visited = new Set();
  visited.add(start.toString());
  const parents = new Map();

  while (queue.length > 0) {
    const [current, parent] = queue.shift();
    const [x, y] = current;

    if (x === goal[0] && y === goal[1]) {
      let path = [];
      let currentNode = current;
      while (currentNode) {
        path.push(currentNode);
        currentNode = parents.get(currentNode.toString());
      }
      path.reverse;
      console.log("Path:");
      return path;
    }

    for ([dx, dy] of directions) {
      const newX = x + dx,
        newY = y + dy;
      const newPos = [newX, newY];
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < 8 &&
        newY < 8 &&
        !visited.has(newPos.toString())
      ) {
        visited.add(newPos.toString());
        queue.push([newPos, current]);
        parents.set(newPos.toString(), current);
      }
    }
  }
}


//My original clunky solution

function knightMoves(start = [0, 0], goal = [7, 7]) {
  let adjacencyList = [];
  let nodeNumber = 1;
  let goalFound = 0;
  let path = [];
  let board = [];

  //Board is used to keep track of which nodes have been visited, and their coordinates and numbers
  for (i = 0; i < 8; i++) {
    board.push([]);
    for (j = 0; j < 8; j++) {
      board[i][j] = {
        node: null,
        coords: [i, j],
      };
    }
  }

  board[(start[0], start[1])].node = 0;

  searchForGoal();

  //Creates adjacency list and searches for goal at the same time
  function searchForGoal() {
    adjacencyList[0] = createValidMoves(start);
    //j counts new adjList entries
    let j = 0;

    while (goalFound === 0) {
      for (let i = 0; adjacencyList[j] && i < adjacencyList[j].length; i++) {
        let coords = [
          adjacencyList[j][i].coords[0],
          adjacencyList[j][i].coords[1],
        ];

        if (coordsMatchGoal(coords) === true) {
          goalFound = 1;
          let current = adjacencyList[j][i];
          path.push(current.coords);

          //Trace path from goal to start
          while (current != null) {
            if (current.prev != null) {
              current = adjacencyList[current.prev[0]][current.prev[1]];
              path.push(current.coords);
            } else {
              path.push(start);
              path.reverse();
              break;
            }
          }
        }
        if (!adjacencyList[adjacencyList[j][i].node]) {
          adjacencyList[adjacencyList[j][i].node] = createValidMoves(coords, [
            j,
            i,
          ]);
        }
      }
      j++;
    }
  }

  //check if given coordinates match goal
  function coordsMatchGoal(coords) {
    if (coords[0] === goal[0] && coords[1] === goal[1]) return true;
  }

  //create array of valid moves
  function createValidMoves(start, prev = null) {
    let array = [];

    let movementOptions = [
      [start[0] + 2, start[1] + 1],
      [start[0] + 2, start[1] - 1],
      [start[0] - 2, start[1] + 1],
      [start[0] - 2, start[1] - 1],
      [start[0] + 1, start[1] + 2],
      [start[0] + 1, start[1] - 2],
      [start[0] - 1, start[1] + 2],
      [start[0] - 1, start[1] - 2],
    ];

    for (i = 0; i < movementOptions.length; i++) {
      if (
        movementOptions[i][0] <= 7 &&
        movementOptions[i][1] <= 7 &&
        movementOptions[i][0] >= 0 &&
        movementOptions[i][1] >= 0
      ) {
        let temp = nodeNumber;
        let boardPos = board[movementOptions[i][0]][movementOptions[i][1]];

        if (boardPos.node != null) {
          nodeNumber = boardPos.node;
        }
        array.push({
          node: nodeNumber,
          coords: [movementOptions[i][0], movementOptions[i][1]],
          prev: prev,
        });

        boardPos.node = nodeNumber;
        boardPos.prev = start;
        nodeNumber = temp;
        nodeNumber++;
      }
    }
    return array;
  }

  console.log("Path: ");
  console.log(path);
}


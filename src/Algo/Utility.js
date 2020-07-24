export const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const isFeasable = (i, j, grid) => {
  if (i < 0 || i >=grid.length || j < 0 || j >=grid[0].length) {
    return false;
  }
  return (grid[parseInt(i, 10)][parseInt(j, 10)] === 0 ||
      grid[parseInt(i, 10)][parseInt(j, 10)] === 4);
};

const isFeasable2 = (i, j, grid) => {
  if (i < 0 || i >=grid.length || j < 0 || j >=grid[0].length) {
    return false;
  }
  return !(grid[parseInt(i, 10)][parseInt(j, 10)] === 1 ||
      grid[parseInt(i, 10)][parseInt(j, 10)] === 3 ||
      grid[parseInt(i, 10)][parseInt(j, 10)] === 4);
};

export const neighbors = (i, j, grid) => {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isFeasable(neighbor[0], neighbor[1], grid)) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
};

export const biNeighbors = (i, j, grid) => {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isFeasable2(neighbor[0], neighbor[1], grid)) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
};

export const pathrestore = (start, end, par) => {
  let ptr = end[0];
  let path = [];
  let ok = true;
  while (ok) {
    path = [...path, ptr];
    if (ptr[0] === start[0][0] &&
        ptr[1] === start[0][1]) {
      ok = false;
    } else {
      ptr = par[ptr[0]][ptr[1]];
    }
  }
  return path.reverse();
};


import {neighbors, pathrestore} from "./Utility";
export const BFS = async function() {
  const start = this.state.start; const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const speed = this.state.speed; const grid = this.state.grid;
  this.setState({pointer: start[0]});
  const queue = [start[0]]; // queue needed in bfs
  const par = Array(height).fill().map(() => Array(width).fill([]));
  // parent array to restore the path
  par[start[0][0]][start[0][1]] = start[0];
  let ok = true;
  // grid is acting like a visited array in BFS
  while (queue.length !== 0) {
    const current = queue[0];
    queue.shift(); // pop the first item from the queue
    if (grid[current[0]][current[1]] === 1 ||
        grid[current[0]][current[1]] === 2) {
      continue;
      // if its a wall or already visited cell then continue
    }
    if (grid[current[0]][current[1]] === 3) {
      // check if again visits the start point
      if (ok) {
        ok = false;
      } else {
        continue;
      }
    }
    if (grid[current[0]][current[1]] === 4) {
      // reached goal, so terminate
      this.setState({grid});
      this.setState({pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), speed));
      break;
    } else {
      const item = neighbors(current[0], current[1], this.state.grid);
      // finding neighbours of the current cell which are unvisited and empty
      for (const neighbor of item) {
        par[neighbor[0]][neighbor[1]] = [current[0], current[1]];
        queue.push([neighbor[0], neighbor[1]]);
        // push the unvisited neighbours in the queue
      }
      if (grid[current[0]][current[1]] !== 3) {
        grid[current[0]][current[1]] = 2;
        // if not end/start, mark the node as visited
      }
      this.setState({grid, pointer: current});
      // update the state
      await new Promise((done) =>
        setTimeout(() => done(), speed)); // to slow down the speed of animation
    }
  }
  const pointer = this.state.pointer;
  if (pointer[0] !== end[0][0] || pointer[1] !== end[0][1]) {
    // display path not found
    this.showModal();
    this.setState({visual: false});
    return;
  }

  // restore path
  this.state.path = pathrestore(start, end, par);
  await this.pathdisplay(this.state.path);
};

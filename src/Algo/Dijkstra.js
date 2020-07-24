import PriorityQueue from "./customPriorityQueue";
import {directions, pathrestore} from "./Utility";

export const Dijkstra = async function() {
  const start = this.state.start; const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const queue = new PriorityQueue((a, b) => a[1] < b[1]);
  queue.push([start[0], 0]);
  const grid = this.state.grid;
  const dist = Array(height).fill().map(() =>
    Array(width).fill(100000));
  const par = Array(height).fill().map(() =>
    Array(width).fill(0));
  this.setState({path: [], pointer: start[0]});
  dist[start[0][0]][start[0][1]] = 0;
  par[start[0][0]][start[0][1]] =
      [start[0][0], start[0][1]];
  let ok = true;
  while (queue.size() !== 0) {
    const current = queue.peek()[0];
    queue.pop(); // pop the queue
    if (grid[current[0]][current[1]] === 3) {
      if (ok) {
        ok = false;
      } else {
        continue;
      } // if you are again pushing the source point, its !ok
    }
    if (grid[current[0]][current[1]] === 4) {
      // if you reach the destination, terminate
      this.setState({grid, pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), this.state.speed));
      break;
    } else {
      // dijkstra picks the minimum weight path,
      // updates it in its distance array
      const item = [];
      for (const direction of directions) {
        const neighbor = [current[0] + direction[0], current[1] + direction[1]];
        if (neighbor[0] < 0 || neighbor[0] >= grid.length ||
            neighbor[1] < 0 || neighbor[1] >=grid[0].length) {
          continue;
        }
        if (grid[neighbor[0]][neighbor[1]] !== 1) {
          item.push([neighbor[0], neighbor[1]]); // if not a wall
        }
      }
      // iterate over non wall neighbors
      for (const neighbor of item) {
        if (dist[neighbor[0]][neighbor[1]] >
            dist[current[0]][current[1]] + 1) {
          dist[neighbor[0]][neighbor[1]] = dist[current[0]][current[1]] + 1;
          par[neighbor[0]][neighbor[1]] = [current[0], current[1]];
          queue.push([[neighbor[0], neighbor[1]],
            dist[neighbor[0]][neighbor[1]]]);
          // push in the queue if the current vertex can give a shorter path
          // than previous used vertices
        }
      }
      if (grid[current[0]][current[1]] !== 3) {
        grid[current[0]][current[1]] = 2; // mark it as visited
      }
      this.setState({grid, pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), this.state.speed));
    }
  }
  if (this.state.pointer[0] !== end[0][0] ||
      this.state.pointer[1] !== end[0][1]) {
    this.showModal(); // return if path not found
    this.setState({visual: false});
    return;
  }
  this.state.path = pathrestore(start, end, par);
  await this.pathdisplay(this.state.path);
};

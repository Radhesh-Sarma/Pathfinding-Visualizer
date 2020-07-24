import PriorityQueue from "./customPriorityQueue";
import {neighbors, pathrestore} from "./Utility";
export const AStar = async function(w1, w2) {
  this.computeHeuristics();
  this.setState({path: [], pointer: this.state.start[0]});
  const height = this.state.height; const width = this.state.width;
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);
  const start = this.state.start; const end = this.state.end;
  const heuristics = this.state.heuristics; const speed = this.state.speed;
  pq.push([start[0], heuristics[start[0][0]][start[0][1]]]);
  const par = Array(height).fill().map(() => Array(width).fill([]));
  par[start[0][0]][start[0][1]] = start[0];
  const dist = Array(height).fill().map(() =>
    Array(width).fill(100000));
  dist[start[0][0]][start[0][1]] = 0;
  while (!pq.isEmpty()) {
    const grid = this.state.grid;
    const current = pq.peek()[0];
    pq.pop();
    this.setState({pointer: current});
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid, pointer: current});
      break;
    }
    const neighbor = neighbors(current[0], current[1], this.state.grid);
    for (const item of neighbor) {
      if (dist[item[0]][item[1]] === 100000 ||
          dist[current[0][current[1]]] + 1 < dist[item[0]][item[1]]) {
        dist[item[0]][item[1]] = dist[current[0]][current[1]] + 1;
        par[item[0]][item[1]] = current;
        pq.push([item, dist[item[0]][item[1]] + heuristics[item[0]][item[1]]]);
      }
    }
    grid[current[0]][current[1]] = 2;
    this.setState({grid, pointer: current});
    await new Promise((done) =>
      setTimeout(() => done(), speed));
  }
  const pointer = this.state.pointer;
  if (pointer[0] !== end[0][0] || pointer[1] !== end[0][1]) {
    this.showModal(); // return not found
    this.setState({visual: false});
    return;
  }
  this.state.path = pathrestore(start, end, par);
  await this.pathdisplay(this.state.path);
};

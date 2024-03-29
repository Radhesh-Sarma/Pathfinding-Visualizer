import {neighbors} from "./Utility";
export const DFS = async function() {
  const grid = this.state.grid;
  const flag = 1;
  const start = this.state.start; const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const speed = this.state.speed;
  const par = Array(height).fill().map(() => Array(width).fill(0));
  par[start[0][0]][start[0][1]] = [start[0][0], start[0][1]];
  let stack = [start[0]]; // stack for dfs
  let ok = true;
  const path = [];
  while (stack.length !== 0) {
    const current = stack[stack.length - 1];
    stack.pop(); // pop from stack
    if (grid[current[0]][current[1]] === 3) {
      if (ok) {
        ok = false;
      } else {
        continue;
      }
    }
    path.push([current[0], current[1]]);
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid, pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), this.state.speed));
      break;
    } else {
      if (grid[current[0]][current[1]] !== 3) {
        this.state.grid[current[0]][current[1]] = 2;
      }
      stack = stack.concat(neighbors(current[0], current[1], this.state.grid));
    }
    this.setState({grid, pointer: current});
    await new Promise((done) =>
      setTimeout(() => done(), speed));// To slow down the speed of Animation
  }
  if (flag === 0) {
    this.setState({grid});
  }
  const pointer = this.state.pointer;
  if (pointer[0] !== end[0][0] || pointer[1] !== end[0][1]) {
    this.showModal();
    this.setState({visual: false});
    return;
  }
  await this.pathdisplay(path);
};

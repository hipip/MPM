export default class Node {
  constructor(name, duration, predecessors) {
    this.name = name;
    this.duration = duration;
    this.predecessors = predecessors;
  }
}

export default class Node {
  constructor(name, duration, predecessors, successors = new Set()) {
    this.name = name;
    this.duration = duration;
    this.predecessors = predecessors;
    this.successors = successors;
  }
}

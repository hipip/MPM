import { getNodes } from "../components/TaskTable.js";
import Node from "../classes/Node.js";

const TopologicalSort = () => {
  console.log("----Topological Sort----");
  let nodes = getNodes();
  let levels = [];
  while (true) {
    const nodesWithNoPredecessors = nodes
      .filter((node) => node.predecessors.size === 0)
      .map((node) => node.name);
    if (!nodesWithNoPredecessors.length) {
      console.log("Error in Topological Sort!");
      return false;
    }
    levels.push(nodesWithNoPredecessors);
    nodes = nodes
      .filter((node) => !nodesWithNoPredecessors.includes(node.name))
      .map(
        (node) =>
          new Node(
            node.name,
            node.duration,
            node.predecessors.difference(new Set(nodesWithNoPredecessors))
          )
      );
    if (!nodes.length) break;
  }
  console.log(levels);
  return levels;
};

export default TopologicalSort;

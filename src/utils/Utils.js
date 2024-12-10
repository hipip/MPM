import Node from "../classes/Node.js";
import Popup from "../components/Popup.js";

const toggleTaskTable = () => {
  document.querySelector(".task-table").classList.toggle("hidden");
};

const topologicalSort = (graph) => {
  const inDegree = {};
  const queue = [];
  const levels = [];

  for (const nodeName in graph) {
    inDegree[nodeName] = graph[nodeName].predecessors.size;
    if (inDegree[nodeName] === 0) queue.push(nodeName);
  }

  let processedNodes = 0;
  while (queue.length > 0) {
    const currentLevel = [];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const currentNode = queue.pop();
      currentLevel.push(currentNode);
      processedNodes++;

      for (const successor of graph[currentNode].successors) {
        inDegree[successor]--;

        if (inDegree[successor] === 0) {
          queue.unshift(successor);
        }
      }
    }
    levels.push(currentLevel);
  }

  if (processedNodes < Object.keys(graph).length) {
    document.body.appendChild(
      Popup("Erreur, le graphe contient un cycle!", "red")
    );
    return false;
  }

  return levels;
};

const buildGraph = () => {
  const graph = {
    Début: new Node("Début", 0, new Set(), new Set()),
    Fin: new Node("Fin", 0, new Set(), new Set()),
  };

  document.querySelectorAll(".task-row").forEach((taskRow) => {
    const [td1, td2, td3] = taskRow.children;
    let [taskName, taskDuration, taskPredecessors] = [
      td1.children[0].value.trim(),
      td2.children[0].value,
      td3.children[0].value.split(","),
    ];
    if (taskPredecessors.length === 1 && taskPredecessors[0] === "")
      taskPredecessors = new Set(["Début"]);
    else taskPredecessors = new Set([...taskPredecessors]);

    if (taskName !== "" && taskDuration !== "")
      graph[taskName] = new Node(taskName, +taskDuration, taskPredecessors);
  });

  // metre à jour les successeurs de chaque sommet
  for (const nodeName in graph) {
    const node = graph[nodeName];
    for (const predecessor of node.predecessors) {
      graph[predecessor].successors.add(nodeName);
    }
  }

  // Ajouter le sommet Fin au successeurs des sommet qui n'ont aucun successeur
  for (const nodeName in graph) {
    const node = graph[nodeName];
    if (node.successors.size === 0 && nodeName !== "Fin") {
      node.successors.add("Fin");
      graph["Fin"].predecessors.add(nodeName);
    }
  }

  return graph;
};

export { buildGraph, topologicalSort, toggleTaskTable };

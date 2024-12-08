import { buildGraph, topologicalSort } from "./Utils.js";
import NodeElement from "../components/NodeElement.js";
import Edge from "../components/Edge.js";
import MargesTable from "../components/MargesTable.js";

export default class Mpm {
  static calculateDates() {
    const graph = buildGraph();
    const levels = topologicalSort(graph);
    if (!levels) {
      return;
    }

    // Calcul des dates de début au plus tôt
    graph["Début"].plusTot = 0;
    for (let i = 1; i < levels.length; i++) {
      for (const nodeName of levels[i]) {
        let max = -Infinity;
        for (const predecessor of graph[nodeName].predecessors) {
          const val = graph[predecessor].plusTot + graph[predecessor].duration;
          if (val > max) max = val;
        }
        graph[nodeName].plusTot = max;
      }
    }

    // Calcul des dates de début au plus tard
    graph["Fin"].plusTard = graph["Fin"].plusTot;
    for (let i = levels.length - 2; i >= 0; i--) {
      for (const nodeName of levels[i]) {
        let min = Infinity;
        for (const successor of graph[nodeName].successors) {
          const val = graph[successor].plusTard - graph[nodeName].duration;
          if (val < min) min = val;
        }
        graph[nodeName].plusTard = min;
      }
    }

    // Calcul de la marge total des tâches
    for (const nodeName in graph) {
      if (nodeName === "Début" || nodeName === "Fin") continue;
      const node = graph[nodeName];
      node.margeTotale = node.plusTard - node.plusTot;
    }

    // Calcul de la marge libre des tâches
    for (const nodeName in graph) {
      if (nodeName === "Début" || nodeName === "Fin") continue;
      const currentNode = graph[nodeName];
      let min = Infinity;
      for (const successor of currentNode.successors) {
        const newVal =
          graph[successor].plusTot - currentNode.plusTot - currentNode.duration;
        if (newVal < min) min = newVal;
      }
      currentNode.margeLibre = min;
    }

    return [graph, levels];
  }

  static renderGraph() {
    document.querySelector(".task-table").classList.add("hidden");
    const [, , WIDTH, HEIGHT] = document
      .querySelector(".svg-area")
      .getAttribute("viewBox")
      .split(" ");
    const nodesContainer = document.querySelector(".nodes-container");
    const edgesContainer = document.querySelector(".edges-container");
    const res = Mpm.calculateDates();
    if (!res) return;
    const [graph, levels] = res;

    nodesContainer.innerHTML = "";
    edgesContainer.innerHTML = "";

    const rootStyles = getComputedStyle(document.documentElement);
    const horizontalGap = parseFloat(
      rootStyles.getPropertyValue("--horizontal-gap")
    );
    const verticalGap = parseFloat(
      rootStyles.getPropertyValue("--vertical-gap")
    );

    const centerY = HEIGHT / 2;
    const levelWidth = WIDTH / levels.length;

    levels.forEach((level, levelIndex) => {
      const levelNodeCount = level.length;

      let x;
      if (levelIndex === 0) {
        x = 0;
      } else if (levelIndex === levels.length - 1) {
        x = WIDTH - horizontalGap;
      } else {
        x = levelIndex * levelWidth;
      }

      const totalVerticalSpace = HEIGHT - (levelNodeCount - 1) * verticalGap;
      const startingY = totalVerticalSpace / 2;

      level.forEach((nodeName, nodeIndex) => {
        let y;

        if (nodeName === "Début") {
          y = centerY;
        } else if (nodeName === "Fin") {
          y = centerY;
        } else if (levelNodeCount === 1) {
          y = centerY;
        } else {
          y = startingY + nodeIndex * verticalGap;
        }

        nodesContainer.appendChild(NodeElement(graph[nodeName], x, y));
      });
    });

    for (const nodeName in graph) {
      for (const successor of graph[nodeName].successors) {
        edgesContainer.appendChild(Edge(nodeName, successor));
      }
    }

    document.querySelector(".marges-table")?.remove();
    document.body.appendChild(MargesTable(graph));
  }
}

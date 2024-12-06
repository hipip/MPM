import { buildGraph, topologicalSort } from "./Utils.js";

export default class Mpm {
  static calculateDates() {
    const graph = buildGraph();
    const levels = topologicalSort(graph);

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

    console.log(graph);
  }
}

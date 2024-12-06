import { NODE_HEIGHT, NODE_WIDTH } from "../utils/Settings.js";

const NodeElement = (nodeObj, x, y) => {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
  node.classList.add("node");
  node.id = nodeObj.name;
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.classList.add("node-rect");
  rect.setAttribute("fill", "crimson");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", NODE_WIDTH);
  rect.setAttribute("height", NODE_HEIGHT);

  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  horizontalLine.classList.add("node-h-line");
  horizontalLine.setAttribute("x1", x);
  horizontalLine.setAttribute("y1", y + NODE_HEIGHT / 2);
  horizontalLine.setAttribute("x2", x + NODE_WIDTH);
  horizontalLine.setAttribute("y2", y + NODE_HEIGHT / 2);

  const verticalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  verticalLine.classList.add("node-v-line");
  verticalLine.setAttribute("x1", x + NODE_WIDTH / 2);
  verticalLine.setAttribute("y1", y);
  verticalLine.setAttribute("x2", x + NODE_WIDTH / 2);
  verticalLine.setAttribute("y2", y + NODE_HEIGHT / 2);

  const taskName = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  taskName.classList.add("node-task-name");
  taskName.setAttribute("x", x + NODE_WIDTH / 2);
  taskName.setAttribute("y", y + (NODE_HEIGHT * 3) / 4);
  taskName.setAttribute("text-anchor", "middle");
  taskName.setAttribute("dominant-baseline", "middle");
  taskName.textContent = nodeObj.name;

  node.appendChild(rect);
  node.appendChild(horizontalLine);
  node.appendChild(verticalLine);
  node.appendChild(taskName);
  return node;
};

export default NodeElement;

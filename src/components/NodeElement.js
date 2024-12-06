const NodeElement = (nodeObj, x, y) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const nodeWidth = parseFloat(rootStyles.getPropertyValue("--node-width"));
  const nodeHeight = parseFloat(rootStyles.getPropertyValue("--node-height"));

  const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
  node.classList.add("node");
  node.id = nodeObj.name;

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.classList.add("node-rect");
  rect.setAttribute("fill", "crimson");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("duration", nodeObj.duration);

  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  horizontalLine.classList.add("node-h-line");
  horizontalLine.setAttribute("x1", x);
  horizontalLine.setAttribute("y1", y + nodeHeight / 2);
  horizontalLine.setAttribute("x2", x + nodeWidth);
  horizontalLine.setAttribute("y2", y + nodeHeight / 2);

  const verticalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  verticalLine.classList.add("node-v-line");
  verticalLine.setAttribute("x1", x + nodeWidth / 2);
  verticalLine.setAttribute("y1", y);
  verticalLine.setAttribute("x2", x + nodeWidth / 2);
  verticalLine.setAttribute("y2", y + nodeHeight / 2);

  const taskName = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  taskName.classList.add("node-task-name");
  taskName.setAttribute("x", x + nodeWidth / 2);
  taskName.setAttribute("y", y + (nodeHeight * 3) / 4);
  taskName.setAttribute("text-anchor", "middle");
  taskName.setAttribute("dominant-baseline", "middle");
  taskName.textContent = nodeObj.name;

  const plusTot = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  plusTot.classList.add("node-plus-tot");
  plusTot.setAttribute("x", x + nodeWidth / 4);
  plusTot.setAttribute("y", y + nodeHeight / 4);
  plusTot.setAttribute("text-anchor", "middle");
  plusTot.setAttribute("dominant-baseline", "middle");
  plusTot.textContent = nodeObj.plusTot;

  const plusTard = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  plusTard.classList.add("node-plus-tard");
  plusTard.setAttribute("x", x + nodeWidth / 2 + nodeWidth / 4);
  plusTard.setAttribute("y", y + nodeHeight / 4);
  plusTard.setAttribute("text-anchor", "middle");
  plusTard.setAttribute("dominant-baseline", "middle");
  plusTard.textContent = nodeObj.plusTard;

  node.appendChild(rect);
  node.appendChild(horizontalLine);
  node.appendChild(verticalLine);
  node.appendChild(taskName);
  node.appendChild(plusTot);
  node.appendChild(plusTard);

  return node;
};

export default NodeElement;

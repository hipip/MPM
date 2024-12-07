const Edge = (startNode, endNode) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const nodeWidth = parseFloat(rootStyles.getPropertyValue("--node-width"));
  const nodeHeight = parseFloat(rootStyles.getPropertyValue("--node-height"));

  const startNodeElem = document.querySelector(`.node#${startNode} .node-rect`);
  const endNodeElem = document.querySelector(`.node#${endNode} .node-rect`);
  const x1 = startNodeElem.getAttribute("x");
  const y1 = startNodeElem.getAttribute("y");
  const x2 = endNodeElem.getAttribute("x");
  const y2 = endNodeElem.getAttribute("y");
  const duration = startNodeElem.getAttribute("duration");

  const cont = document.createElementNS("http://www.w3.org/2000/svg", "g");
  cont.classList.add("edge");
  cont.setAttribute("from", startNode);
  cont.setAttribute("to", endNode);

  cont.onclick = () => {
    [...document.querySelectorAll(".highlighted")].forEach((elem) =>
      elem.classList.remove("highlighted")
    );
    startNodeElem.classList.add("highlighted");
    endNodeElem.classList.add("highlighted");
    edge.classList.add("highlighted");
    console.log("clicked");
  };

  const edge = document.createElementNS("http://www.w3.org/2000/svg", "line");
  edge.classList.add("edge-line");
  edge.setAttribute("x1", +x1 + nodeWidth / 2);
  edge.setAttribute("x2", +x2 + nodeWidth / 2);
  edge.setAttribute("y1", +y1 + nodeHeight / 2);
  edge.setAttribute("y2", +y2 + nodeHeight / 2);

  const midX = (+x1 + +x2 + nodeWidth) / 2;
  const midY = (+y1 + +y2 + nodeHeight) / 2 - 10;

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.classList.add("edge-text");
  text.setAttribute("x", midX);
  text.setAttribute("y", midY);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("alignment-baseline", "central");
  text.textContent = duration;

  cont.appendChild(edge);
  cont.appendChild(text);
  return cont;
};

export default Edge;

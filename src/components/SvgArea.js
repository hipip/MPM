const SvgArea = () => {
  const cont = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  cont.classList.add("svg-area");
  cont.setAttribute(
    "viewBox",
    `0 0 ${window.innerWidth} ${window.innerHeight}`
  );

  window.onresize = () => {
    cont.setAttribute(
      "viewBox",
      `0 0 ${window.innerWidth} ${window.innerHeight}`
    );
  };

  const nodesContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  const edgesContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  edgesContainer.classList.add("edges-container");
  nodesContainer.classList.add("nodes-container");

  cont.appendChild(edgesContainer);
  cont.appendChild(nodesContainer);

  return cont;
};

export default SvgArea;

const MargesTable = (graph) => {
  const cont = document.createElement("table");
  cont.className = "marges-table";
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.textContent = "Tâche";
  const th2 = document.createElement("th");
  th2.textContent = "Marge Totale";
  const th3 = document.createElement("th");
  th3.textContent = "Marge Libre";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  thead.appendChild(tr);
  cont.appendChild(thead);

  for (const nodeName in graph) {
    if (nodeName === "Début" || nodeName === "Fin") continue;
    const node = graph[nodeName];
    cont.innerHTML += `
    <tr>
        <td>${node.name}</td>
        <td>${node.margeTotale}</td>
        <td>${node.margeLibre}</td>
    </tr>
    `;
  }

  return cont;
};

export default MargesTable;

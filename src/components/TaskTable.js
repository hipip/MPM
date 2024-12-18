import Mpm from "../utils/Mpm.js";

const newRow = () => {
  const tr = document.createElement("tr");
  tr.className = "task-row";
  const taskNameTd = document.createElement("td");
  const taskDurationTd = document.createElement("td");
  const taskPredecessorsTd = document.createElement("td");
  const deleteRowBtn = document.createElement("button");
  deleteRowBtn.className = "btn delete-row-btn";
  deleteRowBtn.textContent = "X";
  deleteRowBtn.onclick = () => {
    tr.remove();
  };

  const taskNameInput = document.createElement("input");
  taskNameInput.className = "inp task-name-inp";
  const taskDurationInput = document.createElement("input");
  taskDurationInput.type = "number";
  taskDurationInput.className = "inp task-duration-inp";
  const taskPredecessorsInput = document.createElement("input");
  taskPredecessorsInput.className = "inp task-predecessors-inp";

  taskNameTd.appendChild(taskNameInput);
  taskDurationTd.appendChild(taskDurationInput);
  taskPredecessorsTd.appendChild(taskPredecessorsInput);

  tr.appendChild(taskNameTd);
  tr.appendChild(taskDurationTd);
  tr.appendChild(taskPredecessorsTd);
  tr.appendChild(deleteRowBtn);

  return tr;
};

const TaskTable = () => {
  const container = document.createElement("div");
  container.className = "table-container";

  const table = document.createElement("table");
  table.className = "task-table";
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.textContent = "Tâche";
  const th2 = document.createElement("th");
  th2.textContent = "Durée";
  const th3 = document.createElement("th");
  th3.textContent = "Tâches antérieures";

  const lastRow = () => {
    const tfoot = document.createElement("tfoot");
    const tr = document.createElement("tr");
    const tr2 = document.createElement("tr");
    const td = document.createElement("td");
    const td2 = document.createElement("td");
    td.colSpan = 3;
    td2.colSpan = 3;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "+";
    btn.className = "btn add-task-btn";
    btn.onclick = () => {
      table.insertBefore(newRow(), tfoot);
    };

    const btn2 = document.createElement("button");
    btn2.type = "button";
    btn2.textContent = "Générer réseau MPM";
    btn2.className = "btn render-graph-btn";
    btn2.onclick = () => {
      Mpm.renderGraph();
    };

    td.appendChild(btn);
    td2.appendChild(btn2);
    tr.appendChild(td);
    tr2.appendChild(td2);
    tfoot.appendChild(tr);
    tfoot.appendChild(tr2);
    return tfoot;
  };

  const hideTableBtn = () => {
    const btn = document.createElement("button");
    btn.className = "btn hide-table-btn";
    btn.textContent = "X";
    btn.onclick = () => {
      container.classList.add("hidden");
    };
    return btn;
  };

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);

  thead.appendChild(tr);

  table.appendChild(thead);
  table.appendChild(lastRow());
  table.appendChild(hideTableBtn());

  container.appendChild(table);
  return container;
};
export default TaskTable;

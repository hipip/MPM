import Node from "../classes/Node.js";
import TopologicalSort from "../utils/TopologicalSort.js";

const getNodes = () => {
  const nodes = [];
  [...document.querySelectorAll(".task-row")].forEach((row) => {
    const [td1, td2, td3] = row.children;
    let [taskName, taskDuration, taskPredecessors] = [
      td1.children[0].value,
      td2.children[0].value,
      td3.children[0].value.split(","),
    ];
    if (taskPredecessors.length === 1 && taskPredecessors[0] === "")
      taskPredecessors = new Set();
    else taskPredecessors = new Set(taskPredecessors);
    if (taskName !== "" && taskDuration !== "")
      nodes.push(new Node(taskName, taskDuration, taskPredecessors));
  });
  return nodes;
};

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
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.textContent = "Tâche";
  const th2 = document.createElement("th");
  th2.textContent = "Durée";
  const th3 = document.createElement("th");
  th3.textContent = "Tâches antérieures";

  const addTaskButton = () => {
    const cont = document.createElement("tfoot");
    cont.className = "add-task-row";
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = "3";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Ajouter Tâche";
    btn.className = "btn add-task-btn";
    btn.onclick = () => {
      table.insertBefore(newRow(), cont);
      TopologicalSort();
    };

    td.appendChild(btn);
    tr.appendChild(td);
    cont.appendChild(tr);
    return cont;
  };

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);

  thead.appendChild(tr);

  table.appendChild(thead);
  table.appendChild(addTaskButton());

  table.className = "task-table";
  return table;
};
export default TaskTable;
export { getNodes };

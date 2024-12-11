import Button from "./components/Button.js";
import SvgArea from "./components/SvgArea.js";
import TaskTable from "./components/TaskTable.js";
import { toggleTaskTable } from "./utils/Utils.js";

document.body.appendChild(SvgArea());
document.body.appendChild(TaskTable());
document.body.appendChild(
  Button("Table des Tâches", "special-btn tasks-table-btn", () =>
    toggleTaskTable()
  )
);
window.addEventListener("keydown", (e) => {
  if (e.key === "F12" && e.ctrlKey) {
    document.querySelector(".svg-area").classList.toggle("disco");
  }
  if (e.key === "m")
    document.querySelector(".marges-table").classList.toggle("hidden");
});

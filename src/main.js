import SvgArea from "./components/SvgArea.js";
import TaskTable from "./components/TaskTable.js";
import { buildGraph } from "./utils/Utils.js";

document.body.appendChild(SvgArea());
document.body.appendChild(TaskTable());
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buildGraph();
});

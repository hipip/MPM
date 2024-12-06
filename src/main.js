import SvgArea from "./components/SvgArea.js";
import TaskTable from "./components/TaskTable.js";
import Mpm from "./utils/Mpm.js";
import { toggleTaskTable } from "./utils/Utils.js";

document.body.appendChild(SvgArea());
document.body.appendChild(TaskTable());
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") Mpm.renderGraph();
  if (e.key === "t") toggleTaskTable();
});

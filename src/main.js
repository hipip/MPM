import SvgArea from "./components/SvgArea.js";
import TaskTable from "./components/TaskTable.js";
import { toggleTaskTable } from "./utils/Utils.js";

document.body.appendChild(SvgArea());
document.body.appendChild(TaskTable());
window.addEventListener("keydown", (e) => {
  if (e.key === "t") {
    toggleTaskTable();
  }
  if (e.key === "d") {
    document.querySelector(".svg-area").classList.toggle("disco");
  }
  if (e.key === "r")
    [...document.querySelectorAll(".highlighted")].forEach((elem) =>
      elem.classList.remove("highlighted")
    );
  if (e.key === "m")
    document.querySelector(".marges-table").classList.toggle("hidden");
});

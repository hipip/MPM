import Button from "./Button.js";
import { toggleTaskTable } from "../utils/Utils.js";
import Popup from "./Popup.js";

const ButtonsContainer = () => {
  const cont = document.createElement("div");

  cont.className = "btns-container";

  cont.appendChild(
    Button("Table des Tâches", "special-btn tasks-table-btn", "#00feee", () =>
      toggleTaskTable()
    )
  );
  cont.appendChild(
    Button("Table des Marges", "special-btn tasks-table-btn", "#fe51ff", () => {
      const marginsTable = document.querySelector(".marges-table");
      if (!marginsTable) {
        document.body.appendChild(
          Popup("Veuillez Générer le réseau MPM tout d'abord !", "red")
        );
      } else {
        document.querySelector(".marges-table").classList.toggle("hidden");
      }
    })
  );

  return cont;
};

export default ButtonsContainer;

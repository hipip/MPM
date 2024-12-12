const Button = (textContent, className, color, onClick) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = textContent;
  btn.className = className;
  btn.style.setProperty("--color", color);
  btn.style.setProperty("--hover-color", color + "1F");
  btn.onclick = onClick;
  return btn;
};

export default Button;

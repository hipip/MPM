const Button = (textContent, className, onClick) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = textContent;
  btn.className = className;
  btn.onclick = onClick;
  return btn;
};

export default Button;

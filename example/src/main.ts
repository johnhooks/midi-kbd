import "./style.css";
import { Keyboard } from "./keyboard";

document.addEventListener("DOMContentLoaded", () => {
	const root = document.querySelector<HTMLDivElement>("#app");
	if (!root) throw new Error("root element #app is missing");

	const keyboard = new Keyboard();
	root.appendChild(keyboard.el);
});

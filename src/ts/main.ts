import { sayHello } from "./interface";
function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
  console.log("hi");
  console.log("This also works!");
}
showHello("greeting", "TypeScript");

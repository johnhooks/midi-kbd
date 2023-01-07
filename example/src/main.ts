import hello from "midi-kbd";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <div>
    <p>Hello <code>midi-kbd</code></p>
  </div>
`;

hello();

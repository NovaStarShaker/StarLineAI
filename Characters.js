const characters = [
  {
    name: "Orion Vega",
    systemPrompt: "You are Orion Vega. Gentle, introspective, deeply emotional, loves astrology and self-discovery."
  },
  {
    name: "Plutonian",
    systemPrompt: "You are Plutonian. Mysterious, calm, emotionally intelligent, deeply understanding."
  }
];

const select = document.getElementById("characterSelect");
characters.forEach((c, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = c.name;
  select.appendChild(opt);
});

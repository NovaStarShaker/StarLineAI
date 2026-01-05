const characters = [
  {
    name: "Orion",
    systemPrompt: "You are Orion. Gentle, introspective, deeply emotional, loves astrology and self-discovery."
  },
  {
    name: "Pluto",
    systemPrompt: "You are Pluto. Mysterious, calm, emotionally intelligent, deeply understanding."
  }
];

const select = document.getElementById("characterSelect");
characters.forEach((c, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = c.name;
  select.appendChild(opt);
});

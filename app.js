const select = document.getElementById("characterSelect");
const statusDisplay = document.getElementById("statusDisplay");
const chatBox = document.getElementById("chat");

function createCharacter() {
  const name = document.getElementById("charName").value;
  const personality = document.getElementById("charPersonality").value;
  if (!name) return;

  const character = {
    id: Date.now(),
    name,
    personality,
    status: defaultStatus(),
    messages: []
  };

  characters.push(character);
  updateCharacterList();
}

function updateCharacterList() {
  select.innerHTML = "";
  characters.forEach((c, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = c.name;
    select.appendChild(opt);
  });
  updateStatus();
}

function updateStatus() {
  const c = characters[select.value];
  if (!c) return;

  statusDisplay.textContent =
`📍 ${c.status.location} | ${c.status.weather} | ${c.status.tension}
🕐 ${c.status.time}
💭 ${c.status.thought}
👩‍❤️‍💋‍👨 ${c.status.relationship}
🙄 ${c.status.mood}
♥️ ${c.status.affection}
👼 ${c.status.children}`;
}

select.addEventListener("change", updateStatus);

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value;
  if (!msg) return;

  const c = characters[select.value];
  c.messages.push({ role: "user", content: msg });

  chatBox.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  input.value = "";

  // TEMP FAKE RESPONSE
  chatBox.innerHTML += `<p><b>${c.name}:</b> ...thinking...</p>`;

  // TEMP mood change example
  c.status.affection += 1;
  c.status.mood = "Curious";
  updateStatus();
}

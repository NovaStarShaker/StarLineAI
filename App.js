const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

async function sendMessage() {
  const msg = input.value;
  if (!msg) return;

  chat.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  input.value = "";

  const character = characters[
    document.getElementById("characterSelect").value
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: character.systemPrompt },
        { role: "user", content: msg }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  chat.innerHTML += `<p><b>${character.name}:</b> ${reply}</p>`;
  chat.scrollTop = chat.scrollHeight;
}

const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");
const ChatBotResponse = document.querySelector(".response .new");

let API_URL = "https://api.openai.com/v1/chat/completions";
// let API_KEY = "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";

let API_KEY = "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";


sendBtn.onclick = function () {
  if (messageBar.value.length > 0) {
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";

    let message =
      `<div class="chat message">
        <img src="img/user.jpg">
        <span>
          ${UserTypedMessage}
        </span>
      </div>`;

    let response =
      `<div class="chat response">
        <img src="img/chatbot.jpg">
        <span class="new">...
        </span>
      </div>`;

    messageBox.insertAdjacentHTML("beforeend", message);

    setTimeout(() => {
      messageBox.insertAdjacentHTML("beforeend", response);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": UserTypedMessage}]
        })
      };

      fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
          if (ChatBotResponse) {
            ChatBotResponse.innerHTML = data.choices[0].message.content;
            ChatBotResponse.classList.remove("new");
          }
        })
        .catch((error) => {
          if (ChatBotResponse) {
            ChatBotResponse.innerHTML = "Opps! An error occurred. Please try again";
          }
        });
    }, 100);
  }
};
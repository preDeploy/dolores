const buttons = document.querySelectorAll('.button');
// const chatButtons = document.querySelectorAll('.chat-buttons')
const chatHistory = document.querySelector('.chat-container');
const messageInput = document.getElementById('user-input');
const sendButton = document.getElementById('send');
const chatWindow = document.querySelector('.chat-bar-container');
const formWindow = document.querySelector('.form-container');
const chatMessages = document.querySelector('.chat-messages');
const mainDownload = document.getElementById('download');
const mainShare = document.getElementById('share');
const form = document.getElementById('immigrationForm');
const progressBar = document.getElementById('progress');
const header = document.getElementById('header');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const downloadButton = document.getElementById('downloadButton');
const downloadForm = document.getElementById('downloadForm');
const differentAddressCheckbox = document.getElementById('differentAddress');
const mailingAddressSection = document.getElementById('mailingAddress');

// console.log(chatWindow.classList)

function addUserMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('user-message');
  messageElement.innerHTML = `
    <div class="user-profile">
    <svg class="user-avatar" id="userPic"></svg>
    </div>
    <div class="message-bubble">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('bot-message');
  messageElement.innerHTML = `
    <div class="bot-profile">
    <svg class="bot-avatar"></svg>
    </div>
    <div class="message-bubble">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addGeneratingMessage() {
  const messageElement = document.createElement('div');
  messageElement.classList.add('bot-message');
  messageElement.innerHTML = `
  <div class="bot-profile loading">
  <svg class="bot-avatar loading"></svg>
  </div>
    <div class="message-bubble loading">
    <svg class="ellipsis-gif"></svg>
    </div>
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeGeneratingMessage() {
  const botProfileElement = document.querySelector('.bot-profile.loading');
  const botAvatarElement = document.querySelector('.bot-avatar.loading');
  if (botProfileElement) {
    botProfileElement.remove();
    botAvatarElement.remove();
  }
  const messageBubbleElement = document.querySelector('.message-bubble.loading');
  if (messageBubbleElement) {
    messageBubbleElement.remove();
  }
}

function signOut() {
  document.getElementById('signout-modal').style.display = 'block';
}

function closeSignOutModal() {
  document.getElementById('signout-modal').style.display = 'none';
}

function confirmSignOut() {
  document.getElementById("userPage").setAttribute("style", "display: none");
  document.getElementById("login-window").setAttribute("style", "display: flex");
  alert("Successfully signed out!");
  closeSignOutModal();
}

function hideAll() {
  const formWindow = document.querySelector('.form-container');
  const chatWindow = document.querySelector('.chat-bar-container');
  const chatHistory = document.querySelector('.chat-container');
  if (chatWindow.classList.contains('active')) {
    chatWindow.classList.remove('active');
  }
  if (chatHistory.classList.contains('active')) {
    chatHistory.classList.remove('active')
  }
  if (formWindow.classList.contains('active')) {
    formWindow.classList.remove('active')
  }
  const mainDownload = document.getElementById('download');
  const mainShare = document.getElementById('share');
  mainDownload.setAttribute('style', 'display: none;');
  mainShare.setAttribute('style', 'display: none;');  
  document.getElementById("login-window").setAttribute("style", "display: none");    
  // document.getElementById("user-info").setAttribute("style", "display: none");


}

function setActiveButton(clickedButton) {
  console.log(clickedButton.id);
  buttons.forEach(button => button.classList.remove('active'));
  const parentClassList = clickedButton.parentElement.classList;
  if (parentClassList.contains("side-container") || parentClassList.contains("menu-container") || parentClassList.contains("chat-bar-container")) {
    clickedButton.classList.add('active');
    if (clickedButton.id == 'chat') {
      hideAll();
      if (!chatWindow.classList.contains('active')) {
        chatWindow.classList.add('active')
      }
      if (!chatHistory.classList.contains('active')) {
        chatHistory.classList.add('active')
      }

    }
    else if (clickedButton.id == 'form') {
      hideAll();
      if (!formWindow.classList.contains('active')) {
        formWindow.classList.add('active')
      }
      mainDownload.removeAttribute('style');
      mainShare.removeAttribute('style');
      // document.addEventListener('DOMContentLoaded', function() {
      // console.log('here')

      let mainInfo = {};
      let spouseChildInfo = {};

      form.addEventListener('input', function () {
        const totalFields = form.querySelectorAll('input').length;
        const filledFields = form.querySelectorAll('input:valid').length;
        const progress = (filledFields / totalFields) * 100;
        progressBar.style.width = progress + '%';
      });

      nextButton.addEventListener('click', function (event) {
        // console.log('listening');
        event.preventDefault();
        mainInfo = {
          firstName: document.getElementById('firstName').value,
          middleName: document.getElementById('middleName').value,
          lastName: document.getElementById('lastName').value,
          // Add other fields as required
        };
        form.reset();
        document.querySelector('.sub-heading').textContent = 'Spouse/Child Information';
        nextButton.style.display = 'none';
        submitButton.removeAttribute("style");
      });

      submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        spouseChildInfo = {
          firstName: document.getElementById('firstName').value,
          middleName: document.getElementById('middleName').value,
          lastName: document.getElementById('lastName').value,
          // Add fields for spouse/child information
        };
        const combinedInfo = {
          ...mainInfo,
          ...spouseChildInfo
        };
        const combinedInfoJson = JSON.stringify(combinedInfo);
        form.style.display = 'none';
        downloadForm.style.display = 'flex';
        downloadForm.querySelector('input[name="data"]').value = combinedInfoJson;
      });

      downloadButton.addEventListener('click', function () {
        const combinedInfoJson = downloadForm.querySelector('input[name="data"]').value;
        console.log(combinedInfoJson)
        const blob = new Blob([combinedInfoJson], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'immigration_info.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });

      differentAddressCheckbox.addEventListener('change', function () {
        mailingAddressSection.classList.toggle('hidden');
      });
      // });
    }
    else if (clickedButton.id == 'user') {
      hideAll();
      const userPage = document.getElementById("login-window");
      userPage.setAttribute('style', 'display: flex;');
      console.log(`Here!!!!!! ${userPage}`)
      // userPage.style.display = 'flex';

    }
  }
}
// var user_inputs = new Array()
buttons.forEach(button => button.addEventListener('click', () => setActiveButton(button)));
// chatButtons.forEach(chatButton => chatButton.addEventListener('click', ()  => setActiveButton(chatButton)));

messageInput.addEventListener('keyup', () => {
  const message = messageInput.value.trim();
  // console.log(messageInput.value)
  // const parentClassList = messageInput.parentElement.classList;

  if (message) {
    // messageInput.value = '';
    // icon = document.getElementById("send").querySelector('svg');
    // icon.classList.remove('mic');
    // icon.classList.add('send');
    sendButton.addEventListener('click', () => {
      // console.log(messageInput.value);
      if (messageInput.value != '') {
        addUserMessage(messageInput.value);
        const messageVal = messageInput.value;
        addGeneratingMessage();
        fetch('http://127.0.0.1:8000/get_response/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_message: messageVal })
        })
          .then(response => response.json())
          .then(data => {
            const botResponse = data.bot_response;
            removeGeneratingMessage()
            // console.log(botResponse);
            addBotMessage(botResponse);
          })
          .catch((error) => {
            console.error('Error: ', error);
          });
        messageInput.value = '';
      }
    });
    messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // console.log(messageInput.value);
        if (messageInput.value != '') {
          addUserMessage(messageInput.value);
          const messageVal = messageInput.value;
          addGeneratingMessage();
          fetch('http://127.0.0.1:8000/get_response/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_message: messageVal })
          })
            .then(response => response.json())
            .then(data => {
              const botResponse = data.bot_response;
              removeGeneratingMessage()
              // console.log(botResponse);
              addBotMessage(botResponse);
            })
            .catch((error) => {
              console.error('Error: ', error);
            });
          messageInput.value = '';
        }
        // messageInput.value = '';
      }
    });


  }
  // else {        
  //     icon = document.getElementById("send").querySelector('svg');
  //     icon.classList.remove('send');
  //     icon.classList.add('mic');
  // }
  // console.log(user_inputs);

}
)

var googleUser = {};
function startApp() {
gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
    client_id: "457580471522-6qcfbiq79j210c20ol8anapo9vprle4m.apps.googleusercontent.com",
    cookiepolicy: 'single_host_origin',
    });
    attachSignin(document.getElementById('customBtn'));
});
};

function attachSignin(element) {
    // console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {                    
            document.getElementById(".login-window").setAttribute("style", "display: none");
            document.createElement('div').add('userProf').innerHTML=`
            <div class="userPage" id="userPage">
                <div class="user-info">            
                    <img src="${googleUser.getBasicProfile().getImageUrl()}" id="pic" class="profile-pic"/>
                    <div class="user-details">
                        <div class="title">
                            <p class="data-text"><strong>Name:</strong></p>
                            <p class="data-text value">${googleUser.getBasicProfile().getName()}</p>
                        </div>
                        <div class="title">
                            <p class="data-text"><strong>Email:</strong></p>
                            <p class="data-text value">${googleUser.getBasicProfile().getEmail()}</p>
                        </div>               
                    </div>            
                </div>
                <button type="button" class="sign-out" onclick="signOut();">Sign Out</button>
                <div id="signout-modal" class="signout-modal">
                    <div class="signout-modal-content">
                    <p class="data-text">Are you sure you want to sign out?</p>
                    <button type="button" class="confirm-signout" onclick="confirmSignOut()">Yes</button>
                    <button type="button" class="cancel-signout" onclick="closeSignOutModal()">Cancel</button>
                    </div>
                </div>
            </div>
            `;
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
    const ProfilePic = document.getElementById("userPic").querySelector('svg');
    ProfilePic.setAttribute('background-image', `url(${googleUser.getBasicProfile().getImageUrl()})`);

    // icon = document.getElementById("send").querySelector('svg');
}
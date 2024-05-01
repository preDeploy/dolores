const buttons = document.querySelectorAll('.button');
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieData = parts.pop().split(';').shift();
        const [username, firstName, lastName, email, profilePicUrl] = cookieData.split('|');
        return { username, firstName, lastName, email, profilePicUrl };
    } 
    // else {
    //     const username = 'rajanpande';
    //     const firstName = 'Rajan';
    //     const lastName = 'Pande';
    //     const email = 'panderajan1996@gmail.com';
    //     const profilePicUrl = 'https://lh3.googleusercontent.com/a/ACg8ocLSpnnjCN1nbp0YmOax2v3KBzzedo_X9pxtXujLphgR_xqi9NuG7g=s288-c-no';
    //     return { username, firstName, lastName, email, profilePicUrl };
    // }
    return null;
}

function showUserPage() {
    document.getElementById("login-window").style.display = "none";
    document.getElementById("userPage").style.display = "flex";
    document.getElementById("form").removeAttribute('style');
}

function showLoginWindow() {
    document.getElementById("login-window").style.display = "flex";
    try {
        document.getElementById("userPage").style.display = "none";
    } catch {

    }
    document.getElementById("download").style.display = "none";
    document.getElementById("share").style.display = "none";
}


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
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

function closeSignOutModal() {
    document.getElementById('signout-modal').style.display = 'none';
}

function confirmSignOut() {
    document.getElementById("userPage").setAttribute("style", "display: none");
    alert("Successfully signed out!");
    closeSignOutModal();
    document.getElementById("login-window").setAttribute("style", "display: flex");
    startApp();
    document.getElementById("form").style.display = "none";
}

function hideAll() {
    const formWindow = document.querySelector('.form-container');
    const chatWindow = document.querySelector('.chat-bar-container');
    const chatHistory = document.querySelector('.chat-container');
    document.getElementById("disclaimer").setAttribute('style', 'display: none')
    if (chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
    }
    if (chatHistory.classList.contains('active')) {
        chatHistory.classList.remove('active');
    }
    if (formWindow.classList.contains('active')) {
        formWindow.classList.remove('active');
    }

    const mainDownload = document.getElementById('download');
    const mainShare = document.getElementById('share');
    mainDownload.setAttribute('style', 'display: none;');
    mainShare.setAttribute('style', 'display: none;');
    document.getElementById("login-window").setAttribute("style", "display: none");
    try {
        document.getElementById("userPage").setAttribute("style", "display: none");
    }
    catch {

    }
}

function setActiveButton(clickedButton) {
    buttons.forEach(button => button.classList.remove('active'));
    const parentClassList = clickedButton.parentElement.classList;
    if (parentClassList.contains("side-container") || parentClassList.contains("menu-container") || parentClassList.contains("chat-bar-container")) {
        clickedButton.classList.add('active');
        if (clickedButton.id == 'chat') {
            hideAll();
            if (!chatWindow.classList.contains('active')) {
                chatWindow.classList.add('active');
            }
            if (!chatHistory.classList.contains('active')) {
                chatHistory.classList.add('active');
            }
            document.getElementById("disclaimer").removeAttribute('style');
        } else if (clickedButton.id == 'form') {
            hideAll();
            if (!formWindow.classList.contains('active')) {
                formWindow.classList.add('active');
            }
            mainDownload.removeAttribute('style');
            mainShare.removeAttribute('style');
            let mainInfo = {};
            let spouseChildInfo = {};

            form.addEventListener('input', function () {
                const totalFields = form.querySelectorAll('input').length;
                const filledFields = form.querySelectorAll('input:valid').length;
                const progress = (filledFields / totalFields) * 100;
                progressBar.style.width = progress + '%';
            });

            nextButton.addEventListener('click', function (event) {
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
        } else if (clickedButton.id == 'user') {
            hideAll();
            const loginCookie = getCookie('username');
            if (loginCookie != null) {                
                const userPage = document.getElementById("userPage");
                if (!userPage) {
                    const { username, firstName, lastName, email, profilePicUrl } = loginCookie;
                    createUserPage(username, firstName, lastName, email, profilePicUrl);
                } else {
                    userPage.setAttribute('style', 'display: flex;');
                }
                const loginWindow = document.getElementById("login-window");
                loginWindow.setAttribute('style', 'display: none;');
            } else {
                showLoginWindow();
            }
            const chatButton = document.getElementById('chat');
            chatButton.removeAttribute('style');
        }
    }
}

function showDisclaimer(){
    document.querySelector('.disclaimer').style.display = 'flex';
}

function closeDisclaimer() {
    document.querySelector('.disclaimer').style.display = 'none';
}


function createLoginCookie(username, firstName, lastName, email, profilePicUrl) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 14);
    const cookieValue = `username=${username}|${firstName}|${lastName}|${email}|${profilePicUrl}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieValue;
}

function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            const profile = googleUser.getBasicProfile();
            const username = profile.getName();
            const firstName = profile.getGivenName();
            const lastName = profile.getFamilyName();
            const email = profile.getEmail();
            const profilePicUrl = profile.getImageUrl();
            createLoginCookie(username, firstName, lastName, email, profilePicUrl);
            document.getElementById("login-window").setAttribute("style", "display: none");
            createUserPage(username, firstName, lastName, email, profilePicUrl);
            document.getElementById("userPage").setAttribute("style", "display: flex");
        });
}

function createUserPage(username, firstName, lastName, email, profilePicUrl) {
    const userPageElement = document.createElement('div');
    
    userPageElement.classList.add('userPage');
    userPageElement.id = 'userPage';
    userPageElement.innerHTML = `
      <div class="user-info">
        <img src="${profilePicUrl}" id="pic" class="profile-pic" />
        <div class="user-details">
          <div class="title">
            <p class="data-text"><strong>Name:</strong></p>
            <p class="data-text value">${firstName} ${lastName}</p>
          </div>
          <div class="title">
            <p class="data-text"><strong>Email:</strong></p>
            <p class="data-text value">${email}</p>
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
    `;
    document.body.appendChild(userPageElement);
}

buttons.forEach(button => button.addEventListener('click', () => setActiveButton(button)));

const user_details = getCookie('username');
let { username = 'unknown', firstName, lastName, email, profilePicUrl = "https://doloreschatbucket.s3.us-east-2.amazonaws.com/icons/users/user.png" } = user_details || {};
messageInput.addEventListener('keyup', () => {
    const message = messageInput.value.trim();
    if (message) {
        sendButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (messageInput.value != '') {
                addUserMessage(messageInput.value);
                document.getElementById('userPic').setAttribute('style', `background-image: url("${profilePicUrl}")`);
                const messageVal = messageInput.value;
                addGeneratingMessage();
                fetch('http://127.0.0.1:8000/get_response/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_message: messageVal,
                        user: username
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        const botResponse = data.bot_response;
                        removeGeneratingMessage();
                        addBotMessage(botResponse);
                    })
                    .catch((error) => {
                        console.error('Error: ', error);
                    });
                // messageInput.value = '';
            }
        });
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                // event.preventDefault();
                if (messageInput.value != '') {
                    addUserMessage(messageInput.value);
                    document.getElementById('userPic').setAttribute('style', `background-image: url("${profilePicUrl}")`);
                    const messageVal = messageInput.value;
                    addGeneratingMessage();
                    fetch('http://127.0.0.1:8000/get_response/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_message: messageVal,
                            user: username
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            const botResponse = data.bot_response;
                            removeGeneratingMessage();
                            addBotMessage(botResponse);
                        })
                        .catch((error) => {
                            console.error('Error: ', error);
                        });
                    messageInput.value = '';
                }
            }
        });
    }
});
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('text-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('text-input').value.trim();
    if (!userInput) return;  // Ensures no empty messages are sent

    appendMessage(userInput, 'user');
    document.getElementById('text-input').value = "";
    document.getElementById('text-input').style.height = "30px"; // Reset input field height after sending
    fetchWitAiResponse(userInput);
}

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    document.getElementById('chat-area').appendChild(messageDiv);
    document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight; // Auto-scroll
}

function fetchWitAiResponse(message) {
    const witToken = 'XGIEDNF7HDDB6SAK4WOTNH3A2RCDUWGU';  // Replace with your Wit.ai token
    fetch(`https://api.wit.ai/message?v=20231011&q=${encodeURIComponent(message)}`, {
        headers: {
            'Authorization': `Bearer ${witToken}`
        }
    })
        .then(response => response.json())
        .then(data => handleWitResponse(data))
        .catch(error => console.error('Error with Wit.ai API:', error));
}

const intentHandlers = {
    'get_name': handleCSVIntent('Name', 'I am'),
    'get_gmail': handleCSVIntent('Gmail ID', 'My Gmail ID is'),
    'get_phone': handleCSVIntent('Phone Number', 'My phone number is'),
    'get_school': handleCSVIntent('School', 'Here are the details of my school journey:'),
    'get_experience': handleCSVIntent('Experience', 'My work experience includes'),
    'get_skills': handleCSVIntent('Skills', 'I have the following skills'),
    'get_projects': handleCSVIntent('Projects', 'Here are my projects'),
    'get_certifications': handleCSVIntent('Certifications', 'My certifications are'),
    'get_dob': handleCSVIntent('DOB', 'My date of birth is'),
    'get_learning': handleCSVIntent('Current Learning', 'I am currently learning'),
    'get_achievements': handleCSVIntent('Achievments', 'Some of my achievements are'),
    'get_hobbies': handleCSVIntent('Hobbies', 'The hobbies include'),
    'get_goal': handleCSVIntent('Goal', 'My current goal is'),
    'get_habits': handleCSVIntent('Practising Habits', 'I follow these practising habits'),
    'get_food': handleCSVIntent('Food', 'My favorite foods are'),
    'get_fav_heros': handleCSVIntent('Favourite Heros', 'My favorite heroes are'),
    'get_fav_directors': handleCSVIntent('Favourite Directors', 'My favorite directors are'),
    'get_father_name': handleCSVIntent('Father Name', 'My father\'s name is'),
    'get_mother_name': handleCSVIntent('Mother Name', 'My mother\'s name is'),
    'get_sister_name': handleCSVIntent('Sister Name', 'My sister\'s name is'),
    'get_college': handleCSVIntent('College', 'I am currently studying in'),
    'get_12thmark': handleCSVIntent('12thMark', 'My 12th mark is'),
    'get_10thmark': handleCSVIntent('10thMark', 'My 10th mark is'),
};

function handleCSVIntent(field, responseText) {
    return function (_entities) {
        fetch('https://raw.githubusercontent.com/C-P-AMUTHAN/Profile-Data-CSV-file/main/ProfileDetails.csv')
            .then(response => response.text())
            .then(csvData => {
                const parsedData = Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true
                }).data;

                const result = parsedData[0];  // Assuming data is for one person

                if (result && result[field]) {
                    appendMessage(`${responseText} ${result[field]}.`, 'bot');
                } else {
                    appendMessage(`Sorry, I couldn't find information about ${field.toLowerCase()}.`, 'bot');
                }
            })
            .catch(error => console.error('Error fetching the CSV:', error));
    };
}


function handleWitResponse(data) {
    const intent = data.intents.length > 0 ? data.intents[0].name : null;
    if (intent && intentHandlers[intent]) {
        intentHandlers[intent](data.entities);
    } else {
        appendMessage("I didn't understand that.", 'bot');
    }
}

document.getElementById('text-input').addEventListener('input', autoResizeTextarea);
function autoResizeTextarea() {
    const textarea = document.getElementById('text-input');
    const footer = document.getElementById('footer');
    textarea.style.height = '25px';
    textarea.style.height = `${textarea.scrollHeight}px`;
    footer.style.height = `${textarea.scrollHeight + 20}px`;
}

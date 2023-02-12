(async () => {
    // Wait for DOM Load Function
    function waitForDomLoad() {
        if (document.readyState !== 'complete') {
            setTimeout(() => {
                // call recursively until document has loaded
                waitForDomLoad()
            }, 500);
        } else {
            addButtons()
        }
    }
    waitForDomLoad()
})();

// Generate Answer Function
async function generateAnswer(payload) {
    const textarea = payload.textarea
    textarea.value = 'loading...'
    try {
        // Prepare Request Data
        const requestData = {
            post_title: payload.postTitle,
            post_description: payload.postDescription,
            prompt_topic: payload.promptTopic, // this is the label of the text area (cover letter, recent projects, etc.)
        };

        // Get User Details from Chrome Storage
        const chromeStorage = await chrome.storage.local.get(["userDetails"])
        requestData.user_name = chromeStorage.userDetails.name
        requestData.user_bio = chromeStorage.userDetails.bio
        requestData.user_technologies = chromeStorage.userDetails.technologies
        requestData.user_voice_example = chromeStorage.userDetails.voice_example
        requestData.user_signature = chromeStorage.userDetails.signature
        requestData.user_projects = chromeStorage.userDetails.projects

        // Prepare Request Options
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        // Send Request to Server
        const response = await fetch('http://localhost:5000/open_ai', options);
        const data = await response.json();
        textarea.value = data.completion
    } catch (e) {
        console.error(e);
        textarea.value = "Error Occurred"
        alert("Error Occurred")
    }
}

// Add Buttons to textareas
async function addButtons() {

    const textareas = document.getElementsByTagName("textarea")
    if (!textareas.length) {
        console.log('Elements not found. Retrying.')
        setTimeout(addButtons, 500)
    }
    const postDescription = await getPostDescription()

    const postTitle = document.querySelector(".content.col-md-9 > h3.mb-20").innerText

    for (const textarea of textareas) {
        const textareaElement = textarea
        const textareaLabel = textareaElement.previousElementSibling
        const labelText = textareaLabel.innerText

        const button = document.createElement("button")
        const btnText = document.createTextNode("Auto-Generate")
        button.appendChild(btnText);
        button.classList += "generate-btn"
        textareaElement.rows = 12
        button.onclick = () => { generateAnswer({ promptTopic: labelText, textarea: textareaElement, postTitle, postDescription }) }
        textareaLabel.appendChild(button)
    }
}

// Get post description
async function getPostDescription() {
    const button = document.querySelector('.up-btn-link span:first-child');
    if (button.innerText === 'more') {
        button.click()
    }
    await setTimeout(() => { }); // this forces to wait for the content to expand

    const postDescription = document.querySelector('.description > .up-truncation').firstChild

    if (postDescription) {
        return postDescription.innerText
    }

}
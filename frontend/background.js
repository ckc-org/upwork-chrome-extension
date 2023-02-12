// Handle the form
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const bioInput = document.getElementById('bio');
const technologiesInput = document.getElementById('technologies');
const voiceExampleInput = document.getElementById('voice_example');
const signatureInput = document.getElementById('signature');
const projectsInput = document.getElementById('projects');

// Save form on input change
nameInput.addEventListener('change', saveForm)
bioInput.addEventListener('change', saveForm)
technologiesInput.addEventListener('change', saveForm)
voiceExampleInput.addEventListener('change', saveForm)
signatureInput.addEventListener('change', saveForm)
projectsInput.addEventListener('change', saveForm)

// on submit handler for form
form.addEventListener('submit', event => {
  event.preventDefault();
  saveForm()
});

// Load the form with saved values when the popup opens
chrome.storage.local.get(["userDetails"], ({ userDetails }) => {
  nameInput.value = userDetails.name
  bioInput.value = userDetails.bio
  technologiesInput.value = userDetails.technologies
  voiceExampleInput.value = userDetails.voiceExample
  signatureInput.value = userDetails.signature
  projectsInput.value = userDetails.projects
});


function saveForm() {
  // Get values using FormData
  const formData = new FormData(form);

  const userDetails = {}
  for (const key of formData.keys()) {
    // extract values from formdata
    userDetails[key] = formData.get(key)
  }

  // Save values to local storage
  chrome.storage.local.set({ userDetails })
}

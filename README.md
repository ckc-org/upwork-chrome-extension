# Upwork Chrome Extension
Super basic chrome extension that auto-generates answers for upwork proposals.

## Start up instructions

Backend:
- install `flask` `flask-cors` and `openai` python packages.
- Ask Sam for openai apikey
- Run main.py. This will just spin up a server on localhost:5000

Frontend:
- In chrome, go to `chrome://extensions/`
- Top right hand corner, turn on "Developer Mode".
- Click Load Unpacked
<img width="188" alt="Screen Shot 2023-02-12 at 11 32 54 AM" src="https://user-images.githubusercontent.com/27198821/218332912-6601ceaf-918a-4cb3-882a-2ff2478cebf0.png">

- Navigate and select the frontend folder
- Navigate to an upwork proposal page (https://www.upwork.com/ab/proposals/job/~0130f5aea3da737cd4/apply/)

- Open the extension and fill out the fields out. Your auto-generated responses will be based off these fields.
<img width="532" alt="Screen Shot 2023-02-12 at 11 34 34 AM" src="https://user-images.githubusercontent.com/27198821/218332976-b3973fda-c559-4de8-9284-92d353880ab4.png">

- Fields include :
Name: Maybe useless atm but fill out full name

Bio: Whatever you want the model to know about you prior to generating the answers.

Technologies: Just list any tech that you use that want the model to be aware of

Voice Example: A previous cover letter of yours that the model can use to mimic your voice. Not super effective atm but it helps

Preferred signature: whatever you want to sign the cover letter

Project history: unused atm.

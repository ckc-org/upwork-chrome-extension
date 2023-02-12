from flask import Flask, make_response, request
from flask_cors import CORS

import openai

app = Flask(__name__)
CORS(app)


def get_question_type(prompt_topic):
    # Not implemented yet
    questions = [
        {
            "id": 1,
            "prompt": "Tell me about any similar projects you've worked on."
        },
        {
            "id": 2,
            "prompt": "Please provide your github link.",
            # "action": (user)=>({user.})
        },
        {
            "id": 3,
            "prompt": "Tell me about any similar projects you've worked on"
        }
    ]

    prompt = f"In one word, what is the id of the object that has the prompt that is most similar to: '{prompt_topic}'? " \
             f"{questions}"

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=20,
        temperature=0
    )

    # returns the obj of the question that is most similar
    return [q for q in questions if q['id'] == int(response['choices'][0]['text'])]


@app.route("/open_ai", methods=["POST"])
def open_ai_endpoint():
    openai.api_key = "<private key here>"
    prompt_topic = request.json.get("prompt_topic", "")
    post_title = request.json.get("post_title", "")
    post_description = request.json.get("post_description", "")
    user_name = request.json.get("user_name", "")
    user_bio = request.json.get("user_bio", "")
    user_technologies = request.json.get("user_technologies", "")
    user_voice_example = request.json.get("user_voice_example", "")
    user_signature = request.json.get("user_signature", "")
    user_projects = request.json.get("user_projects", "")

    full_prompt = ""
    if prompt_topic.lower() == 'cover letter':
        full_prompt = f"My name is {user_name}. {user_bio}\n\n" \
                      f"Tech I have experience in: {user_technologies}\n\n" \
                      f"Here's an example of a cover letter I've written: {user_voice_example}\n\n" \
                      f"In the same voice write why I'm good for this position. Use this signature: {user_signature}. " \
                      f"Add an salutation:\n\n" \
                      f"{post_title}\n" \
                      f"{post_description}\n"
    # else:
        # type_of_prompt = get_question_type(prompt_topic)
        # print(type_of_prompt)

    # UNCOMMENT THIS TO TEST
    # response_text = {"completion": f"{prompt_topic} -- this came from server"}
    # response = make_response(response_text)
    # return response
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=full_prompt,
        max_tokens=300,
        temperature=0
    )

    response_text = response['choices'][0]['text']
    return {"completion": response_text}


if __name__ == '__main__':
    app.run(debug=True)
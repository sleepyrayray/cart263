# TEMP Ray Roadmap

This is a temporary roadmap for Ray to follow while building Project 2.

Delete this file later once the project plan is finalized.

## Main Focus

Your main job is to build:

- the AI robot image set
- the question flow
- the customization choices inside the question flow
- the local JSON data setup
- the voice recording section
- the simple robotic audio effect
- the shared connection between screens when needed

## Main Files To Touch

- `js/screens/QuestionScreen.js`
- `js/screens/VoiceScreen.js`
- `js/app.js`
- `assets/data/robot-shop-data.json`
- `assets/images/` when you add the robot images later

## Step By Step Roadmap

### 1. Lock the question plan first

- decide the final list of questions
- keep it simple and short
- make sure the questions help sort users into the 5 robot types
- include customization choices inside the question flow instead of making a separate customization screen

### 2. Finalize the robot type logic

- use these 5 robot types:
  - companion robot
  - domestic robot
  - security robot
  - social robot
  - utility robot
- decide how each answer will connect to a robot type
- keep the logic easy to understand so it is easier to code later

### 3. Plan the AI robot images

- generate or prepare the robot images yourself
- make one clear final image for each robot type
- keep the style cartoonish and consistent
- make sure each robot type has a distinct look
- name the image files clearly so they are easy to connect later

### 4. Build the JSON structure

- update `assets/data/robot-shop-data.json`
- add the robot types
- add the questions
- add the answer options
- add the result mapping rules
- keep the file clean and organized

### 5. Load the JSON into the project

- use `Fetch API` in the project
- make sure the app can read the local JSON file properly
- check that the data is loading before building too much on top of it

### 6. Build the question screen structure

- work in `js/screens/QuestionScreen.js`
- set up the basic question flow first
- make the user move from one question to the next
- save their answers as they go
- keep the layout simple before styling too much

### 7. Add the customization choices

- fold the customization into the question stage
- decide which choices affect:
  - appearance
  - personality
  - behavior
  - role
- make sure these choices still help produce a final robot result

### 8. Connect the answers to a final robot type

- take the saved answers
- match them to one of the 5 robot types
- store the selected result so it can be used later in the reveal
- keep the logic clear and easy to adjust if needed

### 9. Build the voice recording screen

- work in `js/screens/VoiceScreen.js`
- create a simple recording flow
- keep the recording around 5 seconds
- make the steps clear for the user
- decide if the user can re-record before moving on

### 10. Add the robotic voice effect

- keep the effect simple
- make sure the original recording still works first
- then apply the robotic sound change
- save the modified audio so Yann can use it in the reveal later

### 11. Connect your screens into the app flow

- update `js/app.js` when needed
- make sure the flow works from:
  - menu
  - questions
  - voice
  - reveal
- make sure the app is passing the data your screens need

### 12. Prepare for teammate integration

- make sure Jason's menu can lead into your question flow
- make sure your saved result and audio can later connect to Yann's reveal
- make sure Yann has the final robot images he needs for the reveal
- keep your variable names and data names clear so integration is easier

### 13. Start simple visual styling

- keep the design cartoonish
- do not over-design too early
- get the structure working first
- then polish the visuals once the flow is stable

### 14. Test the full path of your section

- test question flow
- test saved answers
- test robot result mapping
- test voice recording
- test audio playback
- test screen switching

### 15. Organize assets and notes

- keep robot images clearly named when you add them later
- keep audio files organized
- keep track of any choices you make so the PDF will be easier later

### 16. Final personal checklist

- AI robot images are ready
- question flow works
- customization is included in the questions
- JSON data is working
- result mapping works
- voice recording works
- robotic effect works
- screens connect properly
- your part is ready to hand off and explain in the final video

## Reminder

Do not try to finish everything at once.

Start with structure first, then logic, then audio, then polish.

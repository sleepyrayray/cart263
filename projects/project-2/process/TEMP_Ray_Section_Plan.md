# TEMP Ray Section Plan

This is a temporary planning doc for Ray's main section of Project 2.

Delete or merge this file later once the full project plan is finalized.

## Scope For This Doc

This doc only covers:

- the main scored quiz questions
- the color customization question
- the data setup for Ray's section
- the audio input flow
- the audio button logic
- the audio filter plan
- the point system
- the answer options
- the robot type mapping
- the tie-break method

This does not include:

- reveal section details

## Main Quiz Structure

- use 5 main scored questions
- use 5 options for each question
- each option maps to 1 robot type
- keep the color choice separate from the scored result questions

## Data Setup Decisions

- use 2 JSON files
- keep one JSON file for robot data
- keep one JSON file for question data
- use `assets/data/robots-data.json` for robot data
- use `assets/data/questions-data.json` for question data
- save both selected option ids and running robot scores in app state
- keep simple question and option mapping in JSON
- keep final scoring and tie-break logic in JS
- keep full shared state in the app for:
  - current question index
  - selected answers
  - running scores
  - selected color
  - audio status

## Image Plan

- plan for 25 final robot images later
- this means 5 robot types x 5 color variants
- the images are not ready yet
- the project should still be structured now to support that setup later

## Robot Types

The 5 possible results are:

- companion robot
- domestic robot
- security robot
- social robot
- utility robot

## Point System

- Question 1 = 3 points
- Question 2 = 2 points
- Question 3 = 2 points
- Question 4 = 1 point
- Question 5 = 1 point

## Tie Break Rule

If 2 robot types end with the same score:

- first check which tied robot type was chosen in the higher-value question
- if there is still a tie, use Question 1 as the final fallback

## Question 1

Question:

`What do you want your robot to do most?`

Points:

- 3 points

Options:

- `keep me company and understand me` -> companion robot
- `help with chores and daily routines` -> domestic robot
- `keep me safe and watch over things` -> security robot
- `talk with people and make things more social` -> social robot
- `help me get useful tasks done` -> utility robot

## Question 2

Question:

`What kind of connection do you want with your robot?`

Points:

- 2 points

Options:

- `a close and caring buddy` -> companion robot
- `a dependable helper at home` -> domestic robot
- `a protective guard i can rely on` -> security robot
- `an outgoing robot that engages with people` -> social robot
- `a practical assistant focused on results` -> utility robot

## Question 3

Question:

`How should your robot act most of the time?`

Points:

- 2 points

Options:

- `warm and comforting` -> companion robot
- `calm and organized` -> domestic robot
- `alert and watchful` -> security robot
- `expressive and talkative` -> social robot
- `efficient and solution-focused` -> utility robot

## Question 4

Question:

`Where would your robot fit best?`

Points:

- 1 point

Options:

- `by my side in my personal space` -> companion robot
- `around the house helping every day` -> domestic robot
- `in places that need protection` -> security robot
- `in shared spaces around other people` -> social robot
- `wherever there is work to do` -> utility robot

## Question 5

Question:

`What should your robot be best at when it really matters?`

Points:

- 1 point

Options:

- `supporting me emotionally` -> companion robot
- `making home life easier` -> domestic robot
- `preventing problems and spotting danger` -> security robot
- `communicating and connecting with people` -> social robot
- `handling practical tasks and solving problems` -> utility robot

## Small Coding Reminder

- keep the robot type ids consistent across all questions
- keep the option order consistent at first if that makes the logic easier to build
- shuffle or restyle the answer layout later if needed

## Color Customization Question

This question is not scored.

Question:

`What color do you want your robot to be?`

Options:

- `white`
- `red`
- `green`
- `blue`
- `black`

## Audio Input Section

After the questions section, the user goes to the audio input section.

This section is for recording the user's voice for their robot.

Main rules:

- the user can record up to 5 seconds of audio
- the user already agreed to voice recording earlier in the menu
- the user can preview the unfiltered recording before confirming it
- the user can re-record if they do not like it
- the user should be able to confirm once a recording exists
- the recorded audio will later be processed into the robot voice

## Audio Button Plan

Before the user records anything:

- `record`

After the user records something:

- `preview`
- `record again`
- `confirm`

Notes:

- `preview` should only appear after a recording exists
- `record again` should only appear after a recording exists
- `confirm` should only appear after a recording exists

## Audio Processing Plan

- the original recorded audio stays available for preview
- the project should process the recording only after the user confirms it
- the robotic filter style should be bitcrushed and static-like
- the filtered version is what should play later in the reveal

## Handoff For Reveal

- Yann should be able to use the filtered audio later in the reveal section
- the filtered audio needs to stay available for the final robot reveal
- the filtered audio should auto-play once in the reveal with a slight delay

/*
 * robot shop app class file
 * ray can manage the shared app flow here
 */

"use strict";

class RobotShopApp {
  constructor() {
    // shared project data lives here
    this.screens = {};
    this.currentScreenKey = undefined;
    this.currentScreen = undefined;
    this.isLoading = true;
    this.loadError = null;
    this.questionsData = null;
    this.robotsData = null;
    this.projectData = {
      consentGiven: false,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      robotScores: this.createEmptyRobotScores(),
      selectedRobotType: null,
      selectedColor: null,
      rawAudio: null,
      filteredAudio: null,
      audioStatus: {
        hasRecording: false,
        isConfirmed: false,
        isProcessing: false
      },
      recordingDurationSeconds: 5
    };
  }

  async setup() {
    // basic text settings start here
    textAlign(CENTER, CENTER);
    textFont("Arial");

    // project data loads before the screens start
    await this.loadData();

    if (this.loadError !== null) {
      return;
    }

    // main project screens are created here
    this.createScreens();

    // the menu screen starts first
    this.setScreen(START_SCREEN);
    this.isLoading = false;
  }

  draw() {
    if (this.isLoading === true) {
      this.displayLoadingScreen();
      return;
    }

    if (this.loadError !== null) {
      this.displayErrorScreen();
      return;
    }

    if (this.currentScreen !== undefined) {
      this.currentScreen.update();
      this.currentScreen.display();
    }
  }

  mousePressed() {
    if (this.currentScreen !== undefined) {
      this.currentScreen.mousePressed();
    }
  }

  // empty score totals start here for each robot type
  createEmptyRobotScores() {
    return {
      companion: 0,
      domestic: 0,
      security: 0,
      social: 0,
      utility: 0
    };
  }

  // json files load here before the project begins
  async loadData() {
    try {
      this.questionsData = await this.loadJsonFile("assets/data/questions-data.json");
      this.robotsData = await this.loadJsonFile("assets/data/robots-data.json");
      this.loadError = null;
    }
    catch (error) {
      this.loadError = "project data could not load";
      this.isLoading = false;
      console.error(error);
      return;
    }
  }

  // one json file loads at a time through this helper
  async loadJsonFile(filePath) {
    const response = await fetch(filePath);

    if (response.ok === false) {
      throw new Error(`could not load ${filePath}`);
    }

    return await response.json();
  }

  // scored questions can be read here from the loaded data
  getScoredQuestions() {
    if (this.questionsData === null) {
      return [];
    }

    return this.questionsData.scoredQuestions;
  }

  // the color question can be read here from the loaded data
  getColorQuestion() {
    if (this.questionsData === null) {
      return null;
    }

    return this.questionsData.colorQuestion;
  }

  // the full question count can be read here for progress text
  getTotalQuestionCount() {
    const scoredQuestionCount = this.getScoredQuestions().length;
    const colorQuestion = this.getColorQuestion();

    if (colorQuestion === null) {
      return scoredQuestionCount;
    }

    return scoredQuestionCount + 1;
  }

  // one scored question can be found here by its id
  findScoredQuestionById(questionId) {
    const scoredQuestions = this.getScoredQuestions();

    return scoredQuestions.find((questionData) => {
      return questionData.id === questionId;
    });
  }

  // one option inside a question can be found here by its id
  findOptionById(questionData, optionId) {
    if (questionData === undefined || questionData === null) {
      return undefined;
    }

    return questionData.options.find((optionData) => {
      return optionData.id === optionId;
    });
  }

  // selected answers save here and update the score totals
  saveAnswer(questionId, optionId) {
    const questionData = this.findScoredQuestionById(questionId);

    if (questionData === undefined) {
      return;
    }

    const selectedOption = this.findOptionById(questionData, optionId);

    if (selectedOption === undefined) {
      return;
    }

    const previousOptionId = this.projectData.selectedAnswers[questionId];

    if (previousOptionId !== undefined) {
      const previousOption = this.findOptionById(questionData, previousOptionId);

      if (previousOption !== undefined) {
        this.projectData.robotScores[previousOption.robotTypeId] -= questionData.points;
      }
    }

    this.projectData.selectedAnswers[questionId] = optionId;
    this.projectData.robotScores[selectedOption.robotTypeId] += questionData.points;
  }

  // question flow progress can update here
  setCurrentQuestionIndex(questionIndex) {
    this.projectData.currentQuestionIndex = questionIndex;
  }

  // the next question can be reached here
  goToNextQuestion() {
    this.projectData.currentQuestionIndex += 1;
  }

  // the question flow can reset here if needed
  resetQuestionFlow() {
    this.projectData.currentQuestionIndex = 0;
    this.projectData.selectedAnswers = {};
    this.projectData.robotScores = this.createEmptyRobotScores();
    this.projectData.selectedRobotType = null;
    this.projectData.selectedColor = null;
  }

  // scored questions can be sorted here for the tie break rule
  getQuestionPriorityOrder() {
    const scoredQuestions = this.getScoredQuestions();
    const questionOrderList = scoredQuestions.map((questionData, questionIndex) => {
      return {
        questionData: questionData,
        questionIndex: questionIndex
      };
    });

    questionOrderList.sort((firstQuestion, secondQuestion) => {
      const pointDifference = secondQuestion.questionData.points - firstQuestion.questionData.points;

      if (pointDifference !== 0) {
        return pointDifference;
      }

      return firstQuestion.questionIndex - secondQuestion.questionIndex;
    });

    return questionOrderList.map((questionItem) => {
      return questionItem.questionData;
    });
  }

  // the final robot result can be calculated here
  calculateFinalRobotType() {
    const scoreEntries = Object.entries(this.projectData.robotScores);
    const selectedAnswerCount = Object.keys(this.projectData.selectedAnswers).length;

    if (scoreEntries.length === 0 || selectedAnswerCount === 0) {
      this.projectData.selectedRobotType = null;
      return null;
    }

    let highestScore = -Infinity;

    scoreEntries.forEach((scoreEntry) => {
      const scoreValue = scoreEntry[1];

      if (scoreValue > highestScore) {
        highestScore = scoreValue;
      }
    });

    const tiedRobotTypes = scoreEntries
      .filter((scoreEntry) => {
        return scoreEntry[1] === highestScore;
      })
      .map((scoreEntry) => {
        return scoreEntry[0];
      });

    if (tiedRobotTypes.length === 0) {
      this.projectData.selectedRobotType = null;
      return null;
    }

    if (tiedRobotTypes.length === 1) {
      this.projectData.selectedRobotType = tiedRobotTypes[0];
      return this.projectData.selectedRobotType;
    }

    this.projectData.selectedRobotType = this.breakRobotTypeTie(tiedRobotTypes);
    return this.projectData.selectedRobotType;
  }

  // tied robot types can be compared here by question priority
  breakRobotTypeTie(tiedRobotTypes) {
    const questionPriorityOrder = this.getQuestionPriorityOrder();

    for (const questionData of questionPriorityOrder) {
      const selectedOptionId = this.projectData.selectedAnswers[questionData.id];

      if (selectedOptionId === undefined) {
        continue;
      }

      const selectedOption = this.findOptionById(questionData, selectedOptionId);

      if (selectedOption === undefined) {
        continue;
      }

      if (tiedRobotTypes.includes(selectedOption.robotTypeId) === true) {
        return selectedOption.robotTypeId;
      }
    }

    return tiedRobotTypes[0];
  }

  // the chosen color can be saved here
  saveColor(colorId) {
    const availableColors = this.getAvailableColors();
    const selectedColorData = availableColors.find((colorData) => {
      return colorData.id === colorId;
    });

    if (selectedColorData === undefined) {
      return;
    }

    this.projectData.selectedColor = colorId;
  }

  // available colors can be read here from the robot data
  getAvailableColors() {
    if (this.robotsData === null) {
      return [];
    }

    return this.robotsData.colors;
  }

  // one robot type can be found here by its id
  getRobotTypeData(robotTypeId) {
    if (this.robotsData === null) {
      return null;
    }

    const selectedRobotData = this.robotsData.robotTypes.find((robotData) => {
      return robotData.id === robotTypeId;
    });

    if (selectedRobotData === undefined) {
      return null;
    }

    return selectedRobotData;
  }

  // the selected robot image path can be worked out here
  getSelectedRobotImagePath() {
    const selectedRobotType = this.projectData.selectedRobotType;
    const selectedColor = this.projectData.selectedColor;

    if (selectedRobotType === null || selectedColor === null) {
      return null;
    }

    const selectedRobotData = this.getRobotTypeData(selectedRobotType);

    if (selectedRobotData === null) {
      return null;
    }

    const selectedImagePath = selectedRobotData.imagePaths[selectedColor];

    if (typeof selectedImagePath !== "string" || selectedImagePath.length === 0) {
      return null;
    }

    return selectedImagePath;
  }

  // the raw recorded audio can be saved here
  saveRawAudio(rawAudioData) {
    this.projectData.rawAudio = rawAudioData;
    this.projectData.filteredAudio = null;
    this.projectData.audioStatus.hasRecording = true;
    this.projectData.audioStatus.isConfirmed = false;
    this.projectData.audioStatus.isProcessing = false;
  }

  // audio processing state can update here
  setAudioProcessingState(isProcessing) {
    this.projectData.audioStatus.isProcessing = isProcessing;
  }

  // the filtered audio can be saved here after confirm
  saveFilteredAudio(filteredAudioData) {
    this.projectData.filteredAudio = filteredAudioData;
    this.projectData.audioStatus.hasRecording = true;
    this.projectData.audioStatus.isConfirmed = true;
    this.projectData.audioStatus.isProcessing = false;
  }

  // audio data can reset here when the user records again
  resetAudioData() {
    this.projectData.rawAudio = null;
    this.projectData.filteredAudio = null;
    this.projectData.audioStatus.hasRecording = false;
    this.projectData.audioStatus.isConfirmed = false;
    this.projectData.audioStatus.isProcessing = false;
  }

  // each main screen is set up here
  createScreens() {
    this.screens.menu = new MenuScreen(this);
    this.screens.questions = new QuestionScreen(this);
    this.screens.voice = new VoiceScreen(this);
    this.screens.reveal = new RevealScreen(this);
  }

  // screen changes run through this function
  setScreen(screenKey) {
    if (this.screens[screenKey] === undefined) {
      return;
    }

    this.currentScreenKey = screenKey;
    this.currentScreen = this.screens[screenKey];
    this.currentScreen.enter();
  }

  // a simple loading screen shows while the json files are loading
  displayLoadingScreen() {
    background(247, 241, 232);
    fill(20);
    noStroke();
    textSize(24);
    text("loading robot shop...", width / 2, height / 2);
  }

  // a simple error screen shows if the json files fail to load
  displayErrorScreen() {
    background(247, 241, 232);
    fill(20);
    noStroke();
    textSize(24);
    text(this.loadError, width / 2, height / 2);
  }
}

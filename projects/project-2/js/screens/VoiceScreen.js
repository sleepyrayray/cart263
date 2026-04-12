/*
 * voice screen file
 * ray can build the voice section here
 */

"use strict";

class VoiceScreen extends Screen {
  constructor(app) {
    super(app);
    this.voicePanelX = 100;
    this.voicePanelY = 70;
    this.voicePanelWidth = 760;
    this.voicePanelHeight = 400;
    this.buttonWidth = 220;
    this.buttonHeight = 50;
    this.buttonSpacing = 18;
    this.visibleButtons = [];
    this.voiceStatusMessage = "record a greeting for your robot";
    this.statusMessageOverride = null;
    this.mediaRecorder = null;
    this.mediaStream = null;
    this.recordedAudioChunks = [];
    this.recordingTimeoutId = null;
    this.recordingStartTime = 0;
    this.isRecording = false;
    this.previewAudioElement = null;
    this.processingAudioContext = null;
  }

  // voice screen state refreshes here when the screen opens
  enter() {
    this.stopPreviewAudio();
    this.refreshVoiceScreen();
  }

  // voice screen state keeps updating here
  update() {
    this.refreshVoiceScreen();
  }

  // voice screen drawing lives here
  display() {
    this.displayBackground();
    this.displayFrame();
    this.displayVoicePanel();
    this.displayTitleText();
    this.displayInstructionText();
    this.displayRecordingTimer();
    this.displayButtonRow();
    this.displayVoiceStatusText();
  }

  // mouse clicks check the current visible buttons here
  mousePressed() {
    const clickedButton = this.findClickedButton();

    if (clickedButton === null) {
      return;
    }

    this.handleButtonClick(clickedButton.buttonId);
  }

  // voice screen data and button visibility update here
  refreshVoiceScreen() {
    this.buildVisibleButtons();
    this.refreshVoiceStatusMessage();
  }

  // the current visible buttons are decided here
  buildVisibleButtons() {
    this.visibleButtons = [];

    const audioStatus = this.app.projectData.audioStatus;
    const buttonStartX = this.voicePanelX + 40;
    const buttonY = this.voicePanelY + 320;

    if (audioStatus.hasRecording === false) {
      this.visibleButtons.push({
        buttonId: "record",
        label: this.getRecordButtonLabel(),
        x: buttonStartX,
        y: buttonY,
        width: this.buttonWidth,
        height: this.buttonHeight
      });

      return;
    }

    this.visibleButtons.push({
      buttonId: "preview",
      label: "preview",
      x: buttonStartX,
      y: buttonY,
      width: this.buttonWidth,
      height: this.buttonHeight
    });

    this.visibleButtons.push({
      buttonId: "recordAgain",
      label: "record again",
      x: buttonStartX + this.buttonWidth + this.buttonSpacing,
      y: buttonY,
      width: this.buttonWidth,
      height: this.buttonHeight
    });

    this.visibleButtons.push({
      buttonId: "confirm",
      label: "confirm",
      x: buttonStartX + (this.buttonWidth + this.buttonSpacing) * 2,
      y: buttonY,
      width: this.buttonWidth,
      height: this.buttonHeight
    });
  }

  // the main voice panel is drawn here
  displayVoicePanel() {
    rectMode(CORNER);
    fill(255);
    stroke(20);
    strokeWeight(2);
    rect(this.voicePanelX, this.voicePanelY, this.voicePanelWidth, this.voicePanelHeight);
  }

  // the title is shown here
  displayTitleText() {
    fill(20);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(30);
    text("give your robot a voice", this.voicePanelX + 30, this.voicePanelY + 30);
  }

  // the main instructions are shown here
  displayInstructionText() {
    fill(20);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    text("record a greeting for your robot", this.voicePanelX + 30, this.voicePanelY + 86);
  }

  // the current voice buttons are drawn here
  displayButtonRow() {
    this.visibleButtons.forEach((buttonData) => {
      const isHovered = this.isMouseInsideButton(buttonData);

      if (isHovered === true) {
        fill(230);
      }
      else {
        fill(245);
      }

      stroke(20);
      strokeWeight(2);
      rect(buttonData.x, buttonData.y, buttonData.width, buttonData.height);

      fill(20);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(18);
      text(buttonData.label, buttonData.x + buttonData.width / 2, buttonData.y + buttonData.height / 2);
    });
  }

  // the timer bar and time text are shown here
  displayRecordingTimer() {
    const maxRecordingSeconds = this.app.projectData.recordingDurationSeconds;
    const currentRecordingSeconds = this.getVisibleRecordingSeconds();
    const remainingSeconds = Math.max(0, Math.ceil(maxRecordingSeconds - currentRecordingSeconds));
    const timerRatio = currentRecordingSeconds / maxRecordingSeconds;
    const timerBarX = this.voicePanelX + 30;
    const timerBarY = this.voicePanelY + 170;
    const timerBarWidth = this.voicePanelWidth - 60;
    const timerBarHeight = 18;
    const timerFillWidth = timerBarWidth * timerRatio;

    fill(20);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text(`countdown: ${remainingSeconds} seconds`, timerBarX, timerBarY);

    fill(235);
    stroke(20);
    strokeWeight(2);
    rect(timerBarX, timerBarY + 28, timerBarWidth, timerBarHeight);

    fill(20);
    noStroke();
    rect(timerBarX, timerBarY + 28, timerFillWidth, timerBarHeight);
  }

  // the current voice status text is shown here
  displayVoiceStatusText() {
    fill(20);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    text(this.voiceStatusMessage, this.voicePanelX + 30, this.voicePanelY + 280, this.voicePanelWidth - 60);
  }

  // the current status text is worked out here from the shared app state
  refreshVoiceStatusMessage() {
    const audioStatus = this.app.projectData.audioStatus;

    if (this.statusMessageOverride !== null) {
      this.voiceStatusMessage = this.statusMessageOverride;
      return;
    }

    if (this.isRecording === true) {
      this.voiceStatusMessage = "recording now and it will stop automatically after 5 seconds";
      return;
    }

    if (audioStatus.isProcessing === true) {
      this.voiceStatusMessage = "your robot voice is processing right now";
      return;
    }

    if (audioStatus.isConfirmed === true) {
      this.voiceStatusMessage = "your robot voice is ready for the reveal";
      return;
    }

    if (audioStatus.hasRecording === true) {
      this.voiceStatusMessage = "preview your audio or record again before you confirm it";
      return;
    }

    this.voiceStatusMessage = "record a greeting for your robot";
  }

  // the record button label changes here while recording is active
  getRecordButtonLabel() {
    if (this.isRecording === true) {
      return "stop record";
    }

    return "start record";
  }

  // the visible recording seconds are worked out here for the timer
  getVisibleRecordingSeconds() {
    if (this.isRecording === true) {
      const elapsedSeconds = (Date.now() - this.recordingStartTime) / 1000;

      return Math.min(this.app.projectData.recordingDurationSeconds, elapsedSeconds);
    }

    if (this.app.projectData.rawAudio !== null) {
      return this.app.projectData.rawAudio.durationSeconds;
    }

    return 0;
  }

  // one clicked button is found here from the current mouse position
  findClickedButton() {
    for (const buttonData of this.visibleButtons) {
      if (this.isMouseInsideButton(buttonData) === true) {
        return buttonData;
      }
    }

    return null;
  }

  // button hit testing runs here
  isMouseInsideButton(buttonData) {
    const isInsideX = mouseX >= buttonData.x && mouseX <= buttonData.x + buttonData.width;
    const isInsideY = mouseY >= buttonData.y && mouseY <= buttonData.y + buttonData.height;

    return isInsideX && isInsideY;
  }

  // button clicks are sorted here by button id
  async handleButtonClick(buttonId) {
    if (buttonId === "record") {
      await this.handleRecordButton();
      return;
    }

    if (buttonId === "preview") {
      await this.handlePreviewButton();
      return;
    }

    if (buttonId === "recordAgain") {
      this.handleRecordAgainButton();
      return;
    }

    if (buttonId === "confirm") {
      await this.handleConfirmButton();
    }
  }

  // recording begins here after the microphone is allowed
  async handleRecordButton() {
    if (this.isRecording === true) {
      this.statusMessageOverride = "stopping your recording now";
      this.stopRecording();
      return;
    }

    if (this.app.projectData.audioStatus.isProcessing === true) {
      return;
    }

    this.stopPreviewAudio();
    this.clearStatusOverride();
    this.clearStoredAudioUrls();
    this.app.resetAudioData();
    this.statusMessageOverride = "requesting microphone access";

    try {
      await this.startRecording();
      this.clearStatusOverride();
    }
    catch (error) {
      this.stopRecordingState();
      this.statusMessageOverride = "microphone access did not work";
      console.error(error);
    }
  }

  // the preview button plays the saved raw audio here
  async handlePreviewButton() {
    if (this.isRecording === true) {
      return;
    }

    const rawAudioData = this.app.projectData.rawAudio;

    if (rawAudioData === null) {
      return;
    }

    this.stopPreviewAudio();
    this.statusMessageOverride = "playing your recorded voice now";
    this.previewAudioElement = new Audio(rawAudioData.url);
    this.previewAudioElement.onended = () => {
      this.previewAudioElement = null;
      this.clearStatusOverride();
    };

    try {
      await this.previewAudioElement.play();
    }
    catch (error) {
      this.previewAudioElement = null;
      this.statusMessageOverride = "preview playback could not start";
      console.error(error);
    }
  }

  // the record again button resets the shared audio data here
  handleRecordAgainButton() {
    if (this.isRecording === true) {
      return;
    }

    this.stopPreviewAudio();
    this.clearStatusOverride();
    this.clearStoredAudioUrls();
    this.app.resetAudioData();
    this.refreshVoiceScreen();
  }

  // the confirm button filters the raw audio and then moves into reveal
  async handleConfirmButton() {
    if (this.isRecording === true || this.app.projectData.audioStatus.isProcessing === true) {
      return;
    }

    const rawAudioData = this.app.projectData.rawAudio;

    if (rawAudioData === null) {
      return;
    }

    this.stopPreviewAudio();
    this.clearStatusOverride();
    this.app.setAudioProcessingState(true);

    try {
      const filteredAudioData = await this.createFilteredAudioData(rawAudioData);

      if (this.app.projectData.filteredAudio !== null) {
        this.revokeAudioUrl(this.app.projectData.filteredAudio.url);
      }

      this.app.saveFilteredAudio(filteredAudioData);
      this.clearStatusOverride();
      this.app.setScreen("reveal");
    }
    catch (error) {
      this.app.setAudioProcessingState(false);
      this.statusMessageOverride = "your audio could not be processed";
      console.error(error);
    }
  }

  // microphone recording setup starts here
  async startRecording() {
    if (
      typeof navigator === "undefined" ||
      navigator.mediaDevices === undefined ||
      typeof navigator.mediaDevices.getUserMedia !== "function"
    ) {
      throw new Error("media devices are not available");
    }

    if (typeof userStartAudio === "function") {
      await userStartAudio();
    }

    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    const supportedMimeType = this.getSupportedRecordingMimeType();
    const recorderOptions = supportedMimeType === "" ? undefined : {
      mimeType: supportedMimeType
    };

    this.recordedAudioChunks = [];
    this.mediaRecorder = new MediaRecorder(this.mediaStream, recorderOptions);
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedAudioChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      this.finishRecording();
    };

    this.recordingStartTime = Date.now();
    this.mediaRecorder.start();
    this.isRecording = true;
    this.recordingTimeoutId = window.setTimeout(() => {
      this.stopRecording();
    }, this.app.projectData.recordingDurationSeconds * 1000);
  }

  // the recorder stops here after the time limit or the next action
  stopRecording() {
    if (this.mediaRecorder === null) {
      return;
    }

    if (this.mediaRecorder.state === "inactive") {
      return;
    }

    this.mediaRecorder.stop();
  }

  // raw recording data is saved here after recording finishes
  finishRecording() {
    if (this.recordedAudioChunks.length === 0) {
      this.stopRecordingState();
      this.statusMessageOverride = "no audio was captured from the microphone";
      return;
    }

    const recordingDurationSeconds = Math.min(
      this.app.projectData.recordingDurationSeconds,
      (Date.now() - this.recordingStartTime) / 1000
    );
    const recordedMimeType = this.mediaRecorder.mimeType || "audio/webm";
    const rawAudioBlob = new Blob(this.recordedAudioChunks, {
      type: recordedMimeType
    });
    const rawAudioUrl = URL.createObjectURL(rawAudioBlob);

    this.app.saveRawAudio({
      blob: rawAudioBlob,
      url: rawAudioUrl,
      mimeType: recordedMimeType,
      durationSeconds: recordingDurationSeconds
    });

    this.stopRecordingState();
    this.clearStatusOverride();
    this.refreshVoiceScreen();
  }

  // recording helpers reset here after the recorder stops
  stopRecordingState() {
    this.isRecording = false;
    this.recordedAudioChunks = [];
    this.recordingStartTime = 0;

    if (this.recordingTimeoutId !== null) {
      window.clearTimeout(this.recordingTimeoutId);
      this.recordingTimeoutId = null;
    }

    if (this.mediaStream !== null) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });

      this.mediaStream = null;
    }

    this.mediaRecorder = null;
  }

  // a browser-friendly recording mime type is chosen here
  getSupportedRecordingMimeType() {
    if (typeof MediaRecorder === "undefined" || typeof MediaRecorder.isTypeSupported !== "function") {
      return "";
    }

    const mimeTypeList = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4"
    ];

    for (const mimeType of mimeTypeList) {
      if (MediaRecorder.isTypeSupported(mimeType) === true) {
        return mimeType;
      }
    }

    return "";
  }

  // the raw recording is turned into filtered robot audio here
  async createFilteredAudioData(rawAudioData) {
    const arrayBuffer = await rawAudioData.blob.arrayBuffer();
    const processingAudioContext = this.getProcessingAudioContext();
    const decodedAudioBuffer = await processingAudioContext.decodeAudioData(arrayBuffer.slice(0));
    const filteredAudioBuffer = this.createBitcrushedAudioBuffer(decodedAudioBuffer);
    const filteredAudioBlob = this.convertAudioBufferToWaveBlob(filteredAudioBuffer);
    const filteredAudioUrl = URL.createObjectURL(filteredAudioBlob);

    return {
      blob: filteredAudioBlob,
      url: filteredAudioUrl,
      mimeType: "audio/wav",
      durationSeconds: rawAudioData.durationSeconds,
      filterType: "softBitcrushHighPitch",
      playbackRate: 1.16
    };
  }

  // the shared audio context for decoding and filtering is created here
  getProcessingAudioContext() {
    if (this.processingAudioContext !== null) {
      return this.processingAudioContext;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (AudioContextClass === undefined) {
      throw new Error("audio context is not available");
    }

    this.processingAudioContext = new AudioContextClass();
    return this.processingAudioContext;
  }

  // a softer bitcrush effect is built here for the robot voice
  createBitcrushedAudioBuffer(sourceAudioBuffer) {
    const channelCount = sourceAudioBuffer.numberOfChannels;
    const sampleCount = sourceAudioBuffer.length;
    const sampleRate = sourceAudioBuffer.sampleRate;
    const filteredAudioBuffer = this.getProcessingAudioContext().createBuffer(channelCount, sampleCount, sampleRate);
    const bitDepth = 5;
    const holdSampleCount = 5;
    const quantizeStepCount = Math.pow(2, bitDepth - 1);

    for (let channelIndex = 0; channelIndex < channelCount; channelIndex += 1) {
      const sourceChannelData = sourceAudioBuffer.getChannelData(channelIndex);
      const filteredChannelData = filteredAudioBuffer.getChannelData(channelIndex);
      let heldSampleValue = 0;

      for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
        const sourceSampleValue = sourceChannelData[sampleIndex];

        if (sampleIndex % holdSampleCount === 0) {
          heldSampleValue = Math.round(sourceSampleValue * quantizeStepCount) / quantizeStepCount;
        }

        const filteredSampleValue = sourceSampleValue * 0.24 + heldSampleValue * 0.76;
        filteredChannelData[sampleIndex] = Math.max(-1, Math.min(1, filteredSampleValue));
      }
    }

    return filteredAudioBuffer;
  }

  // the processed audio buffer is turned into a wav blob here
  convertAudioBufferToWaveBlob(audioBuffer) {
    const channelCount = audioBuffer.numberOfChannels;
    const sampleCount = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
    const bytesPerSample = 2;
    const blockAlign = channelCount * bytesPerSample;
    const dataSize = sampleCount * blockAlign;
    const waveArrayBuffer = new ArrayBuffer(44 + dataSize);
    const dataView = new DataView(waveArrayBuffer);
    const interleavedSampleData = this.createInterleavedSampleData(audioBuffer);
    let writeIndex = 0;

    writeIndex = this.writeWaveText(dataView, writeIndex, "RIFF");
    dataView.setUint32(writeIndex, 36 + dataSize, true);
    writeIndex += 4;
    writeIndex = this.writeWaveText(dataView, writeIndex, "WAVE");
    writeIndex = this.writeWaveText(dataView, writeIndex, "fmt ");
    dataView.setUint32(writeIndex, 16, true);
    writeIndex += 4;
    dataView.setUint16(writeIndex, 1, true);
    writeIndex += 2;
    dataView.setUint16(writeIndex, channelCount, true);
    writeIndex += 2;
    dataView.setUint32(writeIndex, sampleRate, true);
    writeIndex += 4;
    dataView.setUint32(writeIndex, sampleRate * blockAlign, true);
    writeIndex += 4;
    dataView.setUint16(writeIndex, blockAlign, true);
    writeIndex += 2;
    dataView.setUint16(writeIndex, bytesPerSample * 8, true);
    writeIndex += 2;
    writeIndex = this.writeWaveText(dataView, writeIndex, "data");
    dataView.setUint32(writeIndex, dataSize, true);
    writeIndex += 4;

    interleavedSampleData.forEach((sampleValue) => {
      const clampedSampleValue = Math.max(-1, Math.min(1, sampleValue));
      const pcmSampleValue = clampedSampleValue < 0
        ? clampedSampleValue * 32768
        : clampedSampleValue * 32767;

      dataView.setInt16(writeIndex, pcmSampleValue, true);
      writeIndex += 2;
    });

    return new Blob([waveArrayBuffer], {
      type: "audio/wav"
    });
  }

  // audio channel data is interleaved here for the wav file
  createInterleavedSampleData(audioBuffer) {
    const channelCount = audioBuffer.numberOfChannels;
    const sampleCount = audioBuffer.length;
    const interleavedSampleData = new Float32Array(sampleCount * channelCount);
    let sampleWriteIndex = 0;

    for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
      for (let channelIndex = 0; channelIndex < channelCount; channelIndex += 1) {
        interleavedSampleData[sampleWriteIndex] = audioBuffer.getChannelData(channelIndex)[sampleIndex];
        sampleWriteIndex += 1;
      }
    }

    return interleavedSampleData;
  }

  // wav header text is written here one letter at a time
  writeWaveText(dataView, startIndex, textValue) {
    let currentIndex = startIndex;

    for (let letterIndex = 0; letterIndex < textValue.length; letterIndex += 1) {
      dataView.setUint8(currentIndex, textValue.charCodeAt(letterIndex));
      currentIndex += 1;
    }

    return currentIndex;
  }

  // audio preview playback is stopped here if needed
  stopPreviewAudio() {
    if (this.previewAudioElement === null) {
      return;
    }

    this.previewAudioElement.pause();
    this.previewAudioElement.currentTime = 0;
    this.previewAudioElement = null;
  }

  // saved object urls are cleared here before replacing audio
  clearStoredAudioUrls() {
    if (this.app.projectData.rawAudio !== null) {
      this.revokeAudioUrl(this.app.projectData.rawAudio.url);
    }

    if (this.app.projectData.filteredAudio !== null) {
      this.revokeAudioUrl(this.app.projectData.filteredAudio.url);
    }
  }

  // one object url can be released here
  revokeAudioUrl(audioUrl) {
    if (typeof audioUrl !== "string" || audioUrl.length === 0) {
      return;
    }

    URL.revokeObjectURL(audioUrl);
  }

  // temporary status override text clears here
  clearStatusOverride() {
    this.statusMessageOverride = null;
  }
}

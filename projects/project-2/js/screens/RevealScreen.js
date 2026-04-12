/*
 * reveal screen file
 * this holds the robot box reveal inside the canvas area
 */

"use strict";

class RevealScreen extends Screen {
  constructor(app) {
    super(app);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.raycaster = null;
    this.mouseVector = null;
    this.packageMesh = null;
    this.packageTextureMaps = null;
    this.robotImageMesh = null;
    this.robotTexture = null;
    this.selectedImagePath = null;
    this.hasImageLoadError = false;
    this.isPackageOpening = false;
    this.isPackageOpened = false;
    this.packageOpenStartTime = 0;
    this.packageOpenDuration = 650;
    this.robotRevealStartTime = 0;
    this.revealAudioDelayMilliseconds = 750;
    this.audioElement = null;
    this.audioPlaybackTimeoutId = null;
    this.hasFinishedIntroAudioPlayback = false;
    this.hasStartedRobotMove = false;
    this.robotMoveStartTime = 0;
    this.robotMoveDuration = 650;
    this.robotCurrentOffsetX = 0;
    this.robotStartOffsetX = 0;
    this.robotTargetOffsetX = 0;
    this.descriptionFadeStartTime = 0;
    this.descriptionFadeDuration = 700;
    this.hasPurchasedRobot = false;
    this.purchaseButtonX = 520;
    this.purchaseButtonY = 350;
    this.purchaseButtonWidth = 170;
    this.purchaseButtonHeight = 52;
    this.thankYouStartTime = 0;
    this.thankYouDisplayDuration = 2000;
    this.thankYouFadeStartTime = 0;
    this.thankYouFadeDuration = 600;
    this.showBackToMenuButton = false;
    this.backButtonX = 520;
    this.backButtonY = 350;
    this.backButtonWidth = 190;
    this.backButtonHeight = 52;
  }

  // reveal setup starts here when the screen opens
  enter() {
    this.resetRevealState();
    this.setupThreeScene();
    this.loadSelectedRobotTexture();
  }

  // reveal animation updates here while the screen is active
  update() {
    this.syncRendererToCanvas();
    this.updatePackageAnimation();
    this.updateDescriptionSequence();
    this.updateThankYouSequence();
    this.updateRobotAnimation();
  }

  // reveal drawing lives here
  display() {
    this.displayBackground();
    this.displayRevealHint();
    this.displayImageErrorMessage();
    this.displayRobotDescription();
    this.renderThreeScene();
  }

  // clicks only check the package while it is still closed
  mousePressed() {
    if (this.packageMesh === null && this.robotImageMesh === null) {
      return;
    }

    if (this.camera === null || this.raycaster === null || this.mouseVector === null) {
      return;
    }

    this.mouseVector.x = (mouseX / width) * 2 - 1;
    this.mouseVector.y = -(mouseY / height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouseVector, this.camera);

    if (this.isPackageOpened === true) {
      if (this.handlePurchaseButtonClick() === true) {
        return;
      }

      if (this.handleBackToMenuButtonClick() === true) {
        return;
      }

      this.handleRevealedRobotClick();
      return;
    }

    if (this.isPackageOpening === true || this.packageMesh === null) {
      return;
    }

    const intersectedMeshes = this.raycaster.intersectObject(this.packageMesh, true);

    if (intersectedMeshes.length > 0) {
      this.startPackageOpening();
    }
  }

  // the basic reveal scene is created here
  setupThreeScene() {
    if (typeof THREE === "undefined") {
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7);
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.pointerEvents = "none";
    this.renderer.domElement.style.zIndex = "2";
    document.body.appendChild(this.renderer.domElement);

    this.syncRendererToCanvas();
    this.setupLights();
    this.createPackage();
  }

  // the reveal lights are kept simple here
  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.1);
    mainLight.position.set(3, 5, 6);
    this.scene.add(ambientLight);
    this.scene.add(mainLight);
  }

  // the starting package uses the saved cardboard texture here
  createPackage() {
    this.packageTextureMaps = this.loadPackageTextureMaps();

    const packageGeometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const packageMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: this.packageTextureMaps.baseColorTexture,
      normalMap: this.packageTextureMaps.normalTexture,
      roughnessMap: this.packageTextureMaps.roughnessTexture,
      roughness: 0.45,
      metalness: 0.2
    });

    this.packageMesh = new THREE.Mesh(packageGeometry, packageMaterial);
    this.scene.add(this.packageMesh);

    const lineMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });

    const lineMesh = new THREE.Mesh(packageGeometry, lineMaterial);
    this.packageMesh.add(lineMesh);
  }

  // the package texture maps are loaded here for the reveal box
  loadPackageTextureMaps() {
    const textureLoader = new THREE.TextureLoader();
    const baseColorTexture = textureLoader.load("assets/textures/package/package-box-color.jpg");
    const normalTexture = textureLoader.load("assets/textures/package/package-box-normal..png");
    const roughnessTexture = textureLoader.load("assets/textures/package/package-box-roughness..jpg");

    baseColorTexture.colorSpace = THREE.SRGBColorSpace;

    return {
      baseColorTexture: baseColorTexture,
      normalTexture: normalTexture,
      roughnessTexture: roughnessTexture
    };
  }

  // the chosen robot image starts loading here
  loadSelectedRobotTexture() {
    if (typeof THREE === "undefined") {
      return;
    }

    this.selectedImagePath = this.app.getSelectedRobotImagePath();
    this.hasImageLoadError = false;

    if (this.selectedImagePath === null) {
      this.hasImageLoadError = true;
      return;
    }

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      this.selectedImagePath,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        this.robotTexture = loadedTexture;

        if (this.isPackageOpened === true && this.robotImageMesh === null) {
          this.createRobotImageMesh();
        }
      },
      undefined,
      () => {
        this.hasImageLoadError = true;
      }
    );
  }

  // the package opening starts here after the click
  startPackageOpening() {
    this.isPackageOpening = true;
    this.packageOpenStartTime = performance.now();
  }

  // the rotating box animation updates here
  updatePackageAnimation() {
    if (this.packageMesh === null) {
      return;
    }

    if (this.isPackageOpening === false) {
      this.packageMesh.rotation.y += 0.02;
      this.packageMesh.rotation.x += 0.008;
      return;
    }

    const elapsedTime = performance.now() - this.packageOpenStartTime;
    const animationProgress = Math.min(1, elapsedTime / this.packageOpenDuration);
    const nextScale = Math.max(0.001, 1 - animationProgress);

    this.packageMesh.scale.set(nextScale, nextScale, nextScale);
    this.packageMesh.rotation.y += 0.08;
    this.packageMesh.rotation.x += 0.035;

    if (animationProgress < 1) {
      return;
    }

    this.scene.remove(this.packageMesh);
    this.disposeMesh(this.packageMesh);
    this.packageMesh = null;
    this.isPackageOpening = false;
    this.isPackageOpened = true;
    this.robotRevealStartTime = performance.now();
    this.createRobotImageMesh();
  }

  // the selected robot image becomes the reveal here
  createRobotImageMesh() {
    if (this.robotTexture === null || this.robotImageMesh !== null) {
      return;
    }

    const imageWidth = this.robotTexture.image?.width ?? 1;
    const imageHeight = this.robotTexture.image?.height ?? 1;
    const imageRatio = imageWidth / imageHeight;
    const planeHeight = 3.7;
    const planeWidth = planeHeight * imageRatio;
    const imageGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const imageMaterial = new THREE.MeshBasicMaterial({
      map: this.robotTexture,
      transparent: true
    });

    this.robotImageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
    this.robotImageMesh.position.set(0, 0, 0);
    this.robotImageMesh.scale.set(0.35, 0.35, 0.35);
    this.scene.add(this.robotImageMesh);
    this.scheduleRevealAudioPlayback();
  }

  // the revealed robot image gently floats here
  updateRobotAnimation() {
    if (this.robotImageMesh === null) {
      return;
    }

    const elapsedSeconds = performance.now() * 0.001;
    const revealElapsedTime = performance.now() - this.robotRevealStartTime;
    const revealProgress = Math.min(1, revealElapsedTime / 450);
    const revealScale = 0.35 + revealProgress * 0.65;

    this.robotImageMesh.scale.set(revealScale, revealScale, revealScale);
    this.robotImageMesh.position.x = this.robotCurrentOffsetX;
    this.robotImageMesh.position.y = Math.sin(elapsedSeconds * 1.8) * 0.16;
    this.robotImageMesh.rotation.y = Math.sin(elapsedSeconds * 0.9) * 0.08;
  }

  // the robot move and text timing update here after the first sound ends
  updateDescriptionSequence() {
    if (this.hasStartedRobotMove === false) {
      return;
    }

    const elapsedTime = performance.now() - this.robotMoveStartTime;
    const moveProgress = Math.min(1, elapsedTime / this.robotMoveDuration);
    this.robotCurrentOffsetX = this.lerpValue(
      this.robotStartOffsetX,
      this.robotTargetOffsetX,
      moveProgress
    );

    if (moveProgress < 1 || this.descriptionFadeStartTime !== 0) {
      return;
    }

    this.descriptionFadeStartTime = performance.now();
  }

  // the renderer stays lined up with the p5 canvas here
  syncRendererToCanvas() {
    if (this.renderer === null || projectCanvas === undefined) {
      return;
    }

    const canvasBounds = projectCanvas.elt.getBoundingClientRect();

    this.renderer.domElement.style.left = `${canvasBounds.left + window.scrollX}px`;
    this.renderer.domElement.style.top = `${canvasBounds.top + window.scrollY}px`;
    this.renderer.domElement.style.width = `${canvasBounds.width}px`;
    this.renderer.domElement.style.height = `${canvasBounds.height}px`;
  }

  // a small reveal hint shows before the box opens
  displayRevealHint() {
    if (this.isPackageOpened === true) {
      return;
    }

    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("click the box to reveal your robot", width / 2, height - 40);
  }

  // an image error message shows if the selected file is missing
  displayImageErrorMessage() {
    if (this.hasImageLoadError === false || this.isPackageOpened === false) {
      return;
    }

    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text("the robot image could not load", width / 2, height / 2 + 180);
  }

  // the robot description fades in after the intro reveal finishes
  displayRobotDescription() {
    const descriptionOpacity = this.getDescriptionOpacity();
    const robotDescription = this.getSelectedRobotDescription();

    if (descriptionOpacity <= 0 || robotDescription === "") {
      return;
    }

    fill(20, 20, 20, descriptionOpacity);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(24);
    textWrap(WORD);
    text(robotDescription, 520, 165, 320);
    this.displayPurchaseSection(descriptionOpacity);
  }

  // the final purchase area shows under the description here
  displayPurchaseSection(descriptionOpacity) {
    if (this.hasPurchasedRobot === true) {
      this.displayThankYouMessage(descriptionOpacity);
      this.displayBackToMenuButton(descriptionOpacity);
      return;
    }

    const isHovered = this.isMouseInsidePurchaseButton();
    const buttonFillShade = isHovered === true ? 225 : 245;

    fill(buttonFillShade, buttonFillShade, buttonFillShade, descriptionOpacity);
    stroke(20, 20, 20, descriptionOpacity);
    strokeWeight(2);
    rect(this.purchaseButtonX, this.purchaseButtonY, this.purchaseButtonWidth, this.purchaseButtonHeight, 10);

    fill(20, 20, 20, descriptionOpacity);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("purchase", this.purchaseButtonX + this.purchaseButtonWidth / 2, this.purchaseButtonY + this.purchaseButtonHeight / 2);
  }

  // the thank you message fades out here before the reset button appears
  displayThankYouMessage(descriptionOpacity) {
    const thankYouOpacity = this.getThankYouOpacity(descriptionOpacity);

    if (thankYouOpacity <= 0) {
      return;
    }

    fill(20, 20, 20, thankYouOpacity);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(28);
    text("Thank you and enjoy your new robot!", this.purchaseButtonX, this.purchaseButtonY + this.purchaseButtonHeight / 2);
  }

  // the back to menu button appears after the thank you text fades out
  displayBackToMenuButton(descriptionOpacity) {
    if (this.showBackToMenuButton === false) {
      return;
    }

    const isHovered = this.isMouseInsideBackButton();
    const buttonFillShade = isHovered === true ? 225 : 245;

    fill(buttonFillShade, buttonFillShade, buttonFillShade, descriptionOpacity);
    stroke(20, 20, 20, descriptionOpacity);
    strokeWeight(2);
    rect(this.backButtonX, this.backButtonY, this.backButtonWidth, this.backButtonHeight, 10);

    fill(20, 20, 20, descriptionOpacity);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Back to menu", this.backButtonX + this.backButtonWidth / 2, this.backButtonY + this.backButtonHeight / 2);
  }

  // the current three scene renders here
  renderThreeScene() {
    if (this.renderer === null || this.scene === null || this.camera === null) {
      return;
    }

    this.renderer.render(this.scene, this.camera);
  }

  // clicks on the revealed robot replay the filtered voice here
  handleRevealedRobotClick() {
    if (this.robotImageMesh === null) {
      return;
    }

    const intersectedMeshes = this.raycaster.intersectObject(this.robotImageMesh, true);

    if (intersectedMeshes.length > 0) {
      this.playFilteredAudio();
    }
  }

  // the purchase button click is handled here after the reveal text appears
  handlePurchaseButtonClick() {
    if (this.hasPurchasedRobot === true) {
      return false;
    }

    if (this.getDescriptionOpacity() <= 0) {
      return false;
    }

    if (this.isMouseInsidePurchaseButton() === false) {
      return false;
    }

    this.hasPurchasedRobot = true;
    this.thankYouStartTime = performance.now();
    return true;
  }

  // the back button sends the user to the menu here
  handleBackToMenuButtonClick() {
    if (this.showBackToMenuButton === false) {
      return false;
    }

    if (this.isMouseInsideBackButton() === false) {
      return false;
    }

    this.resetProjectForMenu();
    return true;
  }

  // the first reveal playback is delayed slightly here
  scheduleRevealAudioPlayback() {
    if (typeof window === "undefined") {
      return;
    }

    this.clearAudioPlaybackTimeout();
    this.audioPlaybackTimeoutId = window.setTimeout(() => {
      this.audioPlaybackTimeoutId = null;
      this.playFilteredAudio();
    }, this.revealAudioDelayMilliseconds);
  }

  // the filtered robot voice plays here
  playFilteredAudio() {
    const filteredAudioData = this.app.projectData.filteredAudio;
    const audioStatus = this.app.projectData.audioStatus;

    if (filteredAudioData === null || audioStatus.isConfirmed === false) {
      return;
    }

    if (typeof filteredAudioData.url !== "string" || filteredAudioData.url.length === 0) {
      return;
    }

    const playbackRate = typeof filteredAudioData.playbackRate === "number"
      ? filteredAudioData.playbackRate
      : 1;

    if (this.audioElement !== null) {
      this.prepareIntroAudioEndHandler();
      this.audioElement.playbackRate = playbackRate;
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch((error) => {
        console.warn("reveal audio replay could not start", error);
      });
      return;
    }

    this.audioElement = new Audio(filteredAudioData.url);
    this.prepareIntroAudioEndHandler();
    this.audioElement.playbackRate = playbackRate;
    this.audioElement.play().catch((error) => {
      console.warn("reveal audio could not start", error);
    });
  }

  // the first reveal audio finish is tracked here
  prepareIntroAudioEndHandler() {
    if (this.hasFinishedIntroAudioPlayback === true || this.audioElement === null) {
      return;
    }

    this.audioElement.onended = () => {
      this.handleIntroAudioFinished();
    };
  }

  // the robot shifts left after the first reveal sound ends
  handleIntroAudioFinished() {
    if (this.hasFinishedIntroAudioPlayback === true) {
      return;
    }

    this.hasFinishedIntroAudioPlayback = true;
    this.hasStartedRobotMove = true;
    this.robotMoveStartTime = performance.now();
    this.robotStartOffsetX = this.robotCurrentOffsetX;
    this.robotTargetOffsetX = -1.9;

    if (this.audioElement !== null) {
      this.audioElement.onended = null;
    }
  }

  // the selected robot description is read here from the robot data
  getSelectedRobotDescription() {
    const selectedRobotType = this.app.projectData.selectedRobotType;
    const robotTypeData = this.app.getRobotTypeData(selectedRobotType);

    if (robotTypeData === null) {
      return "";
    }

    if (typeof robotTypeData.description !== "string") {
      return "";
    }

    return robotTypeData.description;
  }

  // the description fade amount is worked out here
  getDescriptionOpacity() {
    if (this.descriptionFadeStartTime === 0) {
      return 0;
    }

    const elapsedTime = performance.now() - this.descriptionFadeStartTime;
    const fadeProgress = Math.min(1, elapsedTime / this.descriptionFadeDuration);
    return 255 * fadeProgress;
  }

  // the thank you timing updates here after purchase
  updateThankYouSequence() {
    if (this.hasPurchasedRobot === false || this.showBackToMenuButton === true) {
      return;
    }

    if (this.thankYouStartTime === 0) {
      return;
    }

    const elapsedTime = performance.now() - this.thankYouStartTime;

    if (elapsedTime < this.thankYouDisplayDuration) {
      return;
    }

    if (this.thankYouFadeStartTime === 0) {
      this.thankYouFadeStartTime = performance.now();
      return;
    }

    const fadeElapsedTime = performance.now() - this.thankYouFadeStartTime;

    if (fadeElapsedTime >= this.thankYouFadeDuration) {
      this.showBackToMenuButton = true;
    }
  }

  // the thank you opacity is worked out here
  getThankYouOpacity(baseOpacity) {
    if (this.hasPurchasedRobot === false) {
      return 0;
    }

    if (this.thankYouFadeStartTime === 0) {
      return baseOpacity;
    }

    const fadeElapsedTime = performance.now() - this.thankYouFadeStartTime;
    const fadeProgress = Math.min(1, fadeElapsedTime / this.thankYouFadeDuration);
    return baseOpacity * (1 - fadeProgress);
  }

  // purchase button hit testing runs here
  isMouseInsidePurchaseButton() {
    const isInsideX = mouseX >= this.purchaseButtonX && mouseX <= this.purchaseButtonX + this.purchaseButtonWidth;
    const isInsideY = mouseY >= this.purchaseButtonY && mouseY <= this.purchaseButtonY + this.purchaseButtonHeight;
    return isInsideX && isInsideY;
  }

  // back button hit testing runs here
  isMouseInsideBackButton() {
    const isInsideX = mouseX >= this.backButtonX && mouseX <= this.backButtonX + this.backButtonWidth;
    const isInsideY = mouseY >= this.backButtonY && mouseY <= this.backButtonY + this.backButtonHeight;
    return isInsideX && isInsideY;
  }

  // the shared project flow resets here before returning to menu
  resetProjectForMenu() {
    this.resetRevealState();
    this.app.resetQuestionFlow();
    this.app.resetAudioData();
    this.app.setScreen(START_SCREEN);
  }

  // old reveal data clears before a new reveal starts
  resetRevealState() {
    this.clearAudioPlaybackTimeout();
    this.stopRevealAudio();
    this.cleanupRenderer();
    this.raycaster = null;
    this.mouseVector = null;
    this.packageMesh = null;
    this.packageTextureMaps = null;
    this.robotImageMesh = null;
    this.robotTexture = null;
    this.selectedImagePath = null;
    this.hasImageLoadError = false;
    this.isPackageOpening = false;
    this.isPackageOpened = false;
    this.packageOpenStartTime = 0;
    this.robotRevealStartTime = 0;
    this.hasFinishedIntroAudioPlayback = false;
    this.hasStartedRobotMove = false;
    this.robotMoveStartTime = 0;
    this.robotCurrentOffsetX = 0;
    this.robotStartOffsetX = 0;
    this.robotTargetOffsetX = 0;
    this.descriptionFadeStartTime = 0;
    this.hasPurchasedRobot = false;
    this.thankYouStartTime = 0;
    this.thankYouFadeStartTime = 0;
    this.showBackToMenuButton = false;
  }

  // mesh resources clear here when the reveal resets
  disposeMesh(meshData) {
    if (meshData === null) {
      return;
    }

    if (typeof meshData.traverse === "function") {
      meshData.traverse((childMesh) => {
        if (childMesh.geometry !== undefined) {
          childMesh.geometry.dispose();
        }

        if (childMesh.material !== undefined) {
          if (Array.isArray(childMesh.material) === true) {
            childMesh.material.forEach((materialData) => {
              materialData.dispose();
            });
          }
          else {
            childMesh.material.dispose();
          }
        }
      });
    }
  }

  // renderer resources clear here when the reveal resets
  cleanupRenderer() {
    if (this.scene !== null) {
      this.scene.clear();
    }

    this.disposeMesh(this.packageMesh);
    this.disposeMesh(this.robotImageMesh);

    if (this.robotTexture !== null) {
      this.robotTexture.dispose();
    }

    if (this.packageTextureMaps !== null) {
      this.packageTextureMaps.baseColorTexture.dispose();
      this.packageTextureMaps.normalTexture.dispose();
      this.packageTextureMaps.roughnessTexture.dispose();
    }

    if (this.renderer !== null) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }

  // any pending reveal audio timer clears here
  clearAudioPlaybackTimeout() {
    if (this.audioPlaybackTimeoutId === null || typeof window === "undefined") {
      return;
    }

    window.clearTimeout(this.audioPlaybackTimeoutId);
    this.audioPlaybackTimeoutId = null;
  }

  // reveal audio playback stops here when the screen resets
  stopRevealAudio() {
    if (this.audioElement === null) {
      return;
    }

    this.audioElement.onended = null;
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.audioElement = null;
  }

  // one value blends toward another here for the robot move
  lerpValue(startValue, endValue, progressValue) {
    return startValue + (endValue - startValue) * progressValue;
  }
}

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
    this.updateRobotAnimation();
  }

  // reveal drawing lives here
  display() {
    this.displayBackground();
    this.displayRevealHint();
    this.displayImageErrorMessage();
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
    this.robotImageMesh.position.y = Math.sin(elapsedSeconds * 1.8) * 0.16;
    this.robotImageMesh.rotation.y = Math.sin(elapsedSeconds * 0.9) * 0.08;
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
      this.audioElement.playbackRate = playbackRate;
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch((error) => {
        console.warn("reveal audio replay could not start", error);
      });
      return;
    }

    this.audioElement = new Audio(filteredAudioData.url);
    this.audioElement.playbackRate = playbackRate;
    this.audioElement.play().catch((error) => {
      console.warn("reveal audio could not start", error);
    });
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

    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.audioElement = null;
  }
}

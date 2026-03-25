import * as THREE from 'three'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'

// SCENE
const scene = new THREE.Scene()

// SIZES
const sizes = {
    width: 800,
    height: 600
}

// CANVAS
const canvas = document.querySelector('canvas#three-ex')

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// OBJECTS
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const mesh_2 = new THREE.Mesh(geometry, material)
scene.add(mesh_2)
mesh_2.position.x = -1.5

// CONTROLS
const controls = new PointerLockControls(camera, document.body)

controls.addEventListener('lock', function () {
    console.log('we are locked')
})

controls.addEventListener('unlock', function () {
    console.log('we are unlocked')
})

// PLAY BUTTON
const playButton = document.getElementById('play_button')
playButton.addEventListener('click', function () {
    controls.lock()
}, false)

// MOVEMENT FLAGS
let moveForward = false
let moveBackward = false
let moveRight = false
let moveLeft = false

// KEY EVENTS
window.addEventListener('keydown', function (e) {
    if (e.key === 'w') {
        moveForward = true
    }
    if (e.key === 's') {
        moveBackward = true
    }
    if (e.key === 'a') {
        moveLeft = true
    }
    if (e.key === 'd') {
        moveRight = true
    }
})

window.addEventListener('keyup', function (e) {
    if (e.key === 'w') {
        moveForward = false
    }
    if (e.key === 's') {
        moveBackward = false
    }
    if (e.key === 'a') {
        moveLeft = false
    }
    if (e.key === 'd') {
        moveRight = false
    }
})

// ANIMATION
window.requestAnimationFrame(animate)

function animate() {
    if (moveForward) controls.moveForward(0.1)
    if (moveBackward) controls.moveForward(-0.1)
    if (moveRight) controls.moveRight(0.1)
    if (moveLeft) controls.moveRight(-0.1)

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
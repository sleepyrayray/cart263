import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

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

// CONTROLS
const controls = new OrbitControls(camera, canvas)

// OBJECTS
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = -2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object2.position.x = -1.5

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

scene.add(object1, object2, object3)

// RAYCASTER
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', function (event) {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
})

let currentIntersectedObj = null
let clickedObject = null

window.addEventListener('click', function () {
    console.log('click')
    if (currentIntersectedObj !== null) {
        clickedObject = currentIntersectedObj.object
    }
})

// ANIMATION
window.requestAnimationFrame(animate)

function animate(timer) {
    controls.update()

    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    for (const object of objectsToTest) {
        object.material.color.set('#ff0000')
    }

    if (clickedObject !== null) {
        clickedObject.material.color.set('#ffe600')
    }

    if (intersects.length > 0) {
        if (currentIntersectedObj === null) {
            currentIntersectedObj = intersects[0]
            console.log('mouse enter')
        }
        else {
            if (intersects.find(findIfCurrentObjIsActive) === undefined) {
                currentIntersectedObj = intersects[0]
            }
        }

        currentIntersectedObj.object.material.color.set('#00c3ff')
    }
    else {
        if (currentIntersectedObj !== null) {
            currentIntersectedObj = null
        }
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

function findIfCurrentObjIsActive(intersect) {
    return intersect.object === currentIntersectedObj.object
}
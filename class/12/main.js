import * as THREE from 'three'

function main() {
    // SCENE
    const scene = new THREE.Scene()

    // OBJECT
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // SIZES
    const sizes = {
        width: 800,
        height: 600
    }

    // CAMERA
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    scene.add(camera)

    // CANVAS
    const canvas = document.querySelector('canvas#three-ex')

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)

    // ANIMATION LOOP
    let elapsedTime = 0

    window.requestAnimationFrame(animate)

    function animate(timer) {
        const deltaTime = timer - elapsedTime
        elapsedTime = timer

        mesh.rotation.y += 0.01 * deltaTime

        camera.position.x = Math.cos(elapsedTime / 1000)
        camera.position.y = Math.sin(elapsedTime / 1000)
        camera.lookAt(mesh.position)

        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
    }
}

main()
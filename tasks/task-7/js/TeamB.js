import * as THREE from 'three';

// Planet class for Team B
export class PlanetB {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        //Create planet group
        this.group = new THREE.Group()

        // Create planet
        //STEP 1:
        const textureLoader = new THREE.TextureLoader();
        const rockColorTexture = textureLoader.load('textures/teamB/planet/rock-color.jpg');
        const rockNormalTexture = textureLoader.load('textures/teamB/planet/rock-normal.jpg');
        const rockRoughnessTexture = textureLoader.load('textures/teamB/planet/rock-roughness.jpg');
        rockColorTexture.colorSpace = THREE.SRGBColorSpace;
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        const planetGeometry = new THREE.SphereGeometry(2, 32, 32);
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        const planetMaterial = new THREE.MeshStandardMaterial({
            map: rockColorTexture,
            normalMap: rockNormalTexture,
            roughnessMap: rockRoughnessTexture,
            color: new THREE.Color('#8a5a42'),
            emissive: new THREE.Color('#66150a'),
            emissiveIntensity: 0.2
        });
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        //TODO: Add the planet mesh to the planet group.
        this.group.add(this.planetMesh);

        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        const moon1ColorTexture = textureLoader.load('textures/teamB/moon-1/moon1-color.jpg');
        const moon1NormalTexture = textureLoader.load('textures/teamB/moon-1/moon1-normal.jpg');
        const moon1RoughnessTexture = textureLoader.load('textures/teamB/moon-1/moon1-roughness.jpg');
        moon1ColorTexture.colorSpace = THREE.SRGBColorSpace;

        const moon2ColorTexture = textureLoader.load('textures/teamB/moon-2/moon2-color.jpg');
        const moon2NormalTexture = textureLoader.load('textures/teamB/moon-2/moon2-normal.jpg');
        const moon2RoughnessTexture = textureLoader.load('textures/teamB/moon-2/moon2-roughness.jpg');
        moon2ColorTexture.colorSpace = THREE.SRGBColorSpace;

        this.moon1OrbitGroup = new THREE.Group();
        this.moon2OrbitGroup = new THREE.Group();

        const moon1Geometry = new THREE.SphereGeometry(0.35, 24, 24);
        const moon2Geometry = new THREE.SphereGeometry(0.55, 24, 24);

        const moon1Material = new THREE.MeshStandardMaterial({
            map: moon1ColorTexture,
            normalMap: moon1NormalTexture,
            roughnessMap: moon1RoughnessTexture,
            color: new THREE.Color('#8a8178')
        });

        const moon2Material = new THREE.MeshStandardMaterial({
            map: moon2ColorTexture,
            normalMap: moon2NormalTexture,
            roughnessMap: moon2RoughnessTexture,
            color: new THREE.Color('#9b7b67')
        });

        this.moon1Mesh = new THREE.Mesh(moon1Geometry, moon1Material);
        this.moon2Mesh = new THREE.Mesh(moon2Geometry, moon2Material);
        this.moon1Mesh.castShadow = true;
        this.moon1Mesh.receiveShadow = true;
        this.moon2Mesh.castShadow = true;
        this.moon2Mesh.receiveShadow = true;
        this.moon1Mesh.position.x = 3.0;
        this.moon2Mesh.position.x = 4.0;

        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.
        this.moon2OrbitGroup.rotation.y = Math.PI;
        this.moon1OrbitSpeed = 1.0;
        this.moon2OrbitSpeed = 0.5;
        this.moon1OrbitGroup.add(this.moon1Mesh);
        this.moon2OrbitGroup.add(this.moon2Mesh);
        this.group.add(this.moon1OrbitGroup);
        this.group.add(this.moon2OrbitGroup);

        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!

        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.group.rotation.y += delta * 0.5;

        //TODO: Do the moon orbits and the model animations here.
        this.moon1OrbitGroup.rotation.z += delta * this.moon1OrbitSpeed;
        this.moon2OrbitGroup.rotation.y += delta * this.moon2OrbitSpeed;
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
    }
}

class InstancingSystem extends System {

    // todo - title it InstancingWithModsSystem

    constructor() {
        super();

        console.log(this.componentName);

        this.instanceCount = 5;

        // DataOrientedDesign arrays
        this.positions = null;
        this.scales = null;
        this.rotations = null;
        this.meshes = [];
        this.geometry = null;
        console.log('constructed an instancing system');
    }

    update(deltaTime, frame) {
        for(const entity of this.registry){
            switch (entity.components.get('instancing')?.type) {
                case 'animate':
                    this.animate(entity)
                    break;

                default:
                    break;
            }
        }
    }

    attachedComponent(entity) {
        console.log('in attachedComponent');
        console.log('entity is:');
        console.log(entity);

        this.createInstances();
        console.log(entity.object3D);
        console.log('hi4 - (entity.object3D.children)[0]');
        let hi = entity.object3D.children;
        console.log(hi);
        console.log(hi.)
        console.log(hi[0]);
        console.log('hi5 - geometry grab based on isGroup');
        let geometry = entity.object3D.isGroup ? (entity.object3D.children)[0] : entity.object3D;
        addToScene(geometry);
        console.log(entity);
        console.log('done with attachedComponent');
    }

    createInstances() {
        // Create buffers for positions, scales, and rotations of instances
        this.positions = new Float32Array(this.instanceCount * 3);
        this.scales = new Float32Array(this.instanceCount * 3);
        this.rotations = new Array(this.instanceCount);

        for (let i = 0; i < this.instanceCount; ++i) {
            const x = Math.random() * 10.0 - 5.0;
            const y = Math.random() * 10.0 - 5.0;
            const z = Math.random() * 10.0 - 5.0;

            this.positions[i * 3] = x;
            this.positions[i * 3 + 1] = y;
            this.positions[i * 3 + 2] = z;

            const scale = Math.random() * 2.0; // Random scale between 0 and 2
            this.scales[i * 3] = scale;
            this.scales[i * 3 + 1] = scale;
            this.scales[i * 3 + 2] = scale;

            const rotationSpeed = Math.random() * 0.05 + 0.02; // Random rotation speed
            this.rotations[i] = {
                x: Math.random() * Math.PI * 2.0,
                y: Math.random() * Math.PI * 2.0,
                z: Math.random() * Math.PI * 2.0,
                speed: rotationSpeed,
            };
        }
    }

    addToScene(geometry) {
        const instancedGeometry = new THREE.InstancedBufferGeometry();
        instancedGeometry.copy(geometry);

        instancedGeometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(positions, 3));
        instancedGeometry.setAttribute('instanceScale', new THREE.InstancedBufferAttribute(scales, 3));

        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

        const matrix = new THREE.Matrix4();

        for (let i = 0; i < this.instanceCount; i++) {
            const mesh = new THREE.Mesh(instancedGeometry, material);
            mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            this.meshes.push(mesh);
            // todo - will i be able to update these in the animate loop after?
            entity.object3D.add(mesh);
        }
    }

    updatedComponent(entity) {

    }

    detachedComponent(entity) {

    }

    animate = (entity) => {
        console.log('inside the animate function');
        // todo - how to let one entity have more than one object3D in it??
        // i have my list of meshes - go from there? or are they not linked as references - to resolve
        for (let i = 0; i < this.instanceCount; ++i) {
            const rotation = entity.rotations[i];
            rotation.x += rotation.speed;
            rotation.y += rotation.speed;
            rotation.z += rotation.speed;

            matrix.identity()
                .makeRotationX(rotation.x)
                .makeRotationY(rotation.y)
                .makeRotationZ(rotation.z);

            // todo - does these update in the animate loop properly? or will i have to do a reload of the meshes
            // based on object3D?
            entity.meshes[i].instanceMatrix.multiplyMatrices(matrix, meshes[i].matrix);
        }
    }
}

let instancingSystem = new InstancingSystem();

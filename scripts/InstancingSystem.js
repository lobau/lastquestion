class InstancingSystem extends System {

    // todo - title it InstancingWithModsSystem

    constructor() {
        super();

        this.instanceCount = 5;
        this.transformations = [];
        this.instancedMesh = null;
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
        // ----- createInstancesInformation -----

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

            const scale = Math.random() * 2.0;
            this.scales[i * 3] = scale;
            this.scales[i * 3 + 1] = scale;
            this.scales[i * 3 + 2] = scale;

            const rotationSpeed = Math.random() * 0.05 + 0.02;
            this.rotations[i] = {
                x: Math.random() * Math.PI * 2.0,
                y: Math.random() * Math.PI * 2.0,
                z: Math.random() * Math.PI * 2.0,
                speed: rotationSpeed,
            };
        }
        
        // ----- addToScene(instancedMesh) -----

        let originalMesh = entity.object3D;
        let combinedGeometry = new THREE.BufferGeometry();

        // grab usable mesh
        if (originalMesh instanceof THREE.Mesh) {
            combinedGeometry = originalMesh.geometry.clone();
        } else if (originalMesh instanceof THREE.Group) {
            originalMesh.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    const geometry = child.geometry.clone();
                    geometry.applyMatrix4(child.matrixWorld); // Apply the child's world matrix
                    combinedGeometry.merge(geometry);
                }
            });
        }

        // Setup for the to-be-used instance
        const instancedGeometry = new THREE.InstancedBufferGeometry();
        instancedGeometry.copy(combinedGeometry);
        for (let i = 0; i < this.instanceCount; ++i) {
            const matrix = new THREE.Matrix4();
            matrix.makeTranslation(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);

            this.transformations.push(matrix);
        }

        // Create an InstancedMesh using the instanced geometry and matrices
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const instancedMesh = new THREE.InstancedMesh(instancedGeometry, material, this.instanceCount);
        instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        // Set matrices for instances
        for (let i = 0; i < this.instanceCount; ++i) {
            instancedMesh.setMatrixAt(i, this.transformations[i]);
        }
        instancedMesh.instanceMatrix.needsUpdate = true;
        this.instancedMesh = instancedMesh;

        // Add the instanced mesh to the scene
        entity.object3D.add(instancedMesh);
    }

    updatedComponent(entity) {

    }

    detachedComponent(entity) {

    }

    animate = (entity) => {
        // update mesh for each instance
        for (let i = 0; i < this.instanceCount; ++i) {
            const matrix = new THREE.Matrix4();
            matrix.makeTranslation(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);

            this.transformations[i].copy(matrix);
            this.instancedMesh.setMatrixAt(i, this.transformations[i]);
        }
    }
}

let instancingSystem = new InstancingSystem();

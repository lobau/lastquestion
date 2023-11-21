class AnimationSystem extends System {
    constructor() {
        super()

        // console.log(this.componentName);
    }

    update(deltaTime, frame) {
        for (const entity of this.registry) {
            switch (entity.animation?.type) {
                case 'rotate':
                    this.rotate(entity)
                    break;
                case 'rotate-y':
                    this.rotateY(entity)
                    break;
                case 'rotate-z':
                    this.rotateZ(entity)
                    break;
                case 'rotate-x':
                    this.rotateX(entity)
                    break;
                case 'oscillate-z':
                    this.oscillateZ(entity)
                    break;
                default:
                    break;
            }
        }
    }

    attachedComponent(entity, data) {
        // console.log(data);
        entity.animation = data
        entity.animation.speed = 0
        entity.animation.progress = 0
    }

    updatedComponent(entity, data) {

    }

    detachedComponent(entity) {

    }

    rotate = (entity) => {
        if (Math.abs(entity.animation.speed) < Math.abs(entity.animation.maxspeed)) {
            entity.animation.speed += parseFloat(entity.animation.acceleration)
        }
        entity.object3D.rotation.z += entity.animation.speed;
    }

    rotateX = (entity) => {
        if (Math.abs(entity.animation.speed) < Math.abs(entity.animation.maxspeed)) {
            entity.animation.speed += parseFloat(entity.animation.acceleration)
        }
        entity.object3D.rotation.x += entity.animation.speed;
    }

    rotateY = (entity) => {
        if (Math.abs(entity.animation.speed) < Math.abs(entity.animation.maxspeed)) {
            entity.animation.speed += parseFloat(entity.animation.acceleration)
        }
        entity.object3D.rotation.y += entity.animation.speed;
    }

    rotateZ = (entity) => {
        if (Math.abs(entity.animation.speed) < Math.abs(entity.animation.maxspeed)) {
            entity.animation.speed += parseFloat(entity.animation.acceleration)
        }
        entity.object3D.rotation.z += entity.animation.speed;
    }

    oscillateZ = (entity) => {
        if (Math.abs(entity.animation.speed) < Math.abs(entity.animation.maxspeed)) {
            entity.animation.speed += parseFloat(entity.animation.acceleration)
        }
        entity.animation.progress += 0.02;
        let amplitude = (entity.animation.amplitude) ? entity.animation.amplitude : 1;
        let offset = (entity.animation.ampoffset) ? entity.animation.ampoffset : 0;
        entity.object3D.rotation.z = Math.cos(entity.animation.progress + offset) * amplitude;
    }
}

let animSystem = new AnimationSystem()

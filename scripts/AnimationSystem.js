class AnimationSystem extends System {
    constructor() {
        super()

        // console.log(this.componentName);
    }

    update(deltaTime, frame) {
        for (const entity of this.registry) {
            switch (entity.components.get("animation")?.type) {
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

    attachedComponent(entity) {
        entity.components.set("animation", { speed: 0});
        entity.components.set("animation", { progress: 0});
    }

    updatedComponent(entity, data) {

    }

    detachedComponent(entity) {

    }

    rotate = (entity) => {
        if (Math.abs(entity.components.get("animation").speed) < Math.abs(entity.components.get("animation").maxspeed)) {
            entity.components.get("animation").speed += parseFloat(entity.components.get("animation").acceleration)
        }
        entity.object3D.rotation.z += entity.components.get("animation").speed;
    }

    rotateX = (entity) => {
        let component = entity.components.get("animation");
        if (Math.abs(component.speed) < Math.abs(component.maxspeed)) {
            entity.components.set("animation", {speed: parseFloat(component.speed) + parseFloat(component.acceleration)});
        }
        entity.object3D.rotation.x += parseFloat(component.speed);
    }

    rotateY = (entity) => {
        let component = entity.components.get("animation");
        if (Math.abs(component.speed) < Math.abs(component.maxspeed)) {
            entity.components.set("animation", {speed: parseFloat(component.speed) + parseFloat(component.acceleration)});
        }
        entity.object3D.rotation.y += parseFloat(component.speed);
    }

    rotateZ = (entity) => {
        let component = entity.components.get("animation");
        if (Math.abs(component.speed) < Math.abs(component.maxspeed)) {
            entity.components.set("animation", {speed: parseFloat(component.speed) + parseFloat(component.acceleration)});
        }
        entity.object3D.rotation.z += parseFloat(component.speed);
    }

    oscillateZ = (entity) => {
        let component = entity.components.get("animation");
        if (Math.abs(component.speed) < Math.abs(component.maxspeed)) {
            entity.components.set("animation", {speed: parseFloat(component.speed) + parseFloat(component.acceleration)});
        }
        entity.components.set("animation", {progress: parseFloat(component.progress) + 0.02});
        // entity.components.get("animation").progress += 0.02;
        let amplitude = (component.amplitude) ? parseFloat(component.amplitude) : 1;
        let offset = (component.ampoffset) ? parseFloat(component.ampoffset) : 0;
        entity.object3D.rotation.z = Math.cos(parseFloat(component.progress) + offset) * amplitude;
    }
}

let animSystem = new AnimationSystem()

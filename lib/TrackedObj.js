let socket;
const trackedObjListeners = [];

function initSockets() {
  socket = io(); //'192.168.1.100:8000');

  // Loop through all the obj listeners send them frame data
  socket.on('frame', d => trackedObjListeners.forEach(l => l(d)));
}

// Default shape is a cube
AFRAME.registerComponent('tracked-obj', {
  multiple: true,
  schema: {
    objID: {
      default: 2,
    },

    xMult: {
        default: 1,
    },

    yMult: {
        default: 1,
    },

    zMult: {
        default: 1,
    },
  },

  init: function() {
    trackedObjListeners.push(
      (frameData) => {
        window.frame = frameData
        const body = frameData.components['6dEuler'].rigidBodies[this.data.objID];

        // How do I calibrate these values.
        // I should probs make them all scaled based on one value passed in
        if (body) {
          if (body.x && body.y && body.z) {
            this.el.object3D.position.x = body.x / 1000;
            this.el.object3D.position.y = body.z / 1000;
            this.el.object3D.position.z = body.y / -1000;
          }

          if (body.euler1 && body.euler2 && body.euler3) {
            this.el.object3D.rotation.set(
              body.euler1 / 180 * Math.PI * this.data.xMult,
              body.euler3 / 180 * Math.PI * this.data.yMult,
              body.euler2 / 180 * Math.PI * -1,
              'XZY'
            );
          }
        } else {
          console.warn('Missing Tracked Object at ID', this.data.objID)
        }
      }
    );
  },

  // There should be something to remove listeners when the obj they are tied to is removed
});

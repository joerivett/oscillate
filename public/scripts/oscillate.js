var Particle = (function () {
    function Particle(radius, x, y, z, distanceFromOrigin) {
        this.distanceFromOrigin = distanceFromOrigin;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.z = z;
        var geometry = new THREE.SphereGeometry(radius, 32, 32);
        var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        this.sphereObject = new THREE.Mesh(geometry, material);
        this.amplitude = 0;
    }
    Object.defineProperty(Particle.prototype, "amplitude", {
        get: function () {
            return this._amplitude;
        },
        set: function (newAmp) {
            this._amplitude = newAmp;
            this.sphereObject.position.set(this.x, this.y + newAmp, this.z);
        },
        enumerable: true,
        configurable: true
    });
    return Particle;
}());
THREE;
THREE;
var Wave = (function () {
    function Wave(frequency) {
        this.WAVE_SPEED = 7;
        this.frequency = frequency;
        this.wavelength = this.WAVE_SPEED / frequency;
        this.waveNumber = (2 * Math.PI) / this.wavelength;
        this.angularFrequency = (2 * Math.PI) * this.frequency;
        this.blnWaveActive = true;
    }
    Wave.prototype.getAmplitudeAtPoint = function (waveDistanceTravelled, pointDistance, time) {
        var amplitude = 0;
        if (pointDistance <= waveDistanceTravelled) {
            amplitude = Math.sin((this.waveNumber * pointDistance) - (this.angularFrequency * time));
        }
        return amplitude;
    };
    Wave.prototype.getWaveDistanceTravelled = function (time) {
        if (time === void 0) { time = 0; }
        return this.WAVE_SPEED * time;
    };
    Wave.prototype.stopWave = function (time) {
        this.blnWaveActive = false;
        this.timeStopped = time;
    };
    return Wave;
}());
var WaveManager = (function () {
    function WaveManager() {
        this.arrPoints = new Array();
        this.view = new WaveRenderer();
        var p;
        var radius, currentParticleAngle, numParticlesInRing, particleX, particleZ, TWO_PI = Math.PI * 2;
        var masterPoint = new Particle(2.2, 0, 0, 0, 0);
        this.arrPoints.push(new Array(masterPoint));
        this.view.scene.add(masterPoint.sphereObject);
        var thisRingPoints;
        for (radius = 2.5; radius < 11; radius += 0.5) {
            numParticlesInRing = Math.round(5 * radius);
            thisRingPoints = new Array();
            for (currentParticleAngle = 0; currentParticleAngle < TWO_PI; currentParticleAngle += TWO_PI / numParticlesInRing) {
                particleX = Math.cos(currentParticleAngle) * radius;
                particleZ = Math.sin(currentParticleAngle) * radius;
                p = new Particle(0.3, particleX, 0, particleZ, radius);
                thisRingPoints.push(p);
                this.view.scene.add(p.sphereObject);
            }
            this.arrPoints.push(thisRingPoints);
        }
        this.wave = new Wave(1);
        this.startWave();
    }
    WaveManager.prototype.startWave = function () {
        this.startTime = new Date().getTime();
        this.updateParticles();
    };
    WaveManager.prototype.updateParticles = function () {
        var currentTime = (new Date().getTime() - this.startTime) / 1000;
        var waveDistanceTravelled = this.wave.getWaveDistanceTravelled(currentTime);
        var i, j, thisRingArray, thisRingAmplitude;
        for (i = 0; i < this.arrPoints.length; i++) {
            thisRingArray = this.arrPoints[i];
            if (thisRingArray.length > 0) {
                thisRingAmplitude = this.wave.getAmplitudeAtPoint(waveDistanceTravelled, thisRingArray[0].distanceFromOrigin, currentTime);
                for (j = 0; j < thisRingArray.length; j++) {
                    thisRingArray[j].amplitude = thisRingAmplitude;
                }
            }
        }
        this.view.update();
        requestAnimationFrame(this.updateParticles.bind(this));
    };
    return WaveManager;
}());
var WaveRenderer = (function () {
    function WaveRenderer() {
        this.initScene();
    }
    WaveRenderer.prototype.initScene = function () {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 3;
        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(0, 5, 5);
        this.scene.add(dirLight);
        this.controls = new THREE.TrackballControls(this.camera);
    };
    WaveRenderer.prototype.update = function () {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    };
    return WaveRenderer;
}());

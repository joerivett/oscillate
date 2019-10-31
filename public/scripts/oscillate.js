THREE;
System.register("model/Wave", [], function (exports_1, context_1) {
    "use strict";
    var Wave;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Wave = (function () {
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
                };
                return Wave;
            }());
            exports_1("default", Wave);
        }
    };
});
System.register("model/Particle", [], function (exports_2, context_2) {
    "use strict";
    var Particle;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            Particle = (function () {
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
            exports_2("default", Particle);
        }
    };
});
System.register("view/SceneRenderer", [], function (exports_3, context_3) {
    "use strict";
    var SceneRenderer;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            SceneRenderer = (function () {
                function SceneRenderer() {
                    this.initScene();
                }
                SceneRenderer.prototype.initScene = function () {
                    this.renderer = new THREE.WebGLRenderer();
                    this.renderer.setSize(300, 300);
                    document.body.appendChild(this.renderer.domElement);
                    this.scene = new THREE.Scene();
                    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    this.camera.position.z = 3;
                    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
                    dirLight.position.set(0, 5, 5);
                    this.scene.add(dirLight);
                    this.controls = new THREE.TrackballControls(this.camera);
                };
                SceneRenderer.prototype.update = function () {
                    this.renderer.render(this.scene, this.camera);
                    this.controls.update();
                };
                return SceneRenderer;
            }());
            exports_3("default", SceneRenderer);
        }
    };
});
System.register("model/World", ["model/Particle", "model/Wave", "view/SceneRenderer"], function (exports_4, context_4) {
    "use strict";
    var Particle_1, Wave_1, SceneRenderer_1, World;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Particle_1_1) {
                Particle_1 = Particle_1_1;
            },
            function (Wave_1_1) {
                Wave_1 = Wave_1_1;
            },
            function (SceneRenderer_1_1) {
                SceneRenderer_1 = SceneRenderer_1_1;
            }
        ],
        execute: function () {
            World = (function () {
                function World() {
                    this.wave = new Wave_1["default"](1);
                    this.view = new SceneRenderer_1["default"]();
                    this.initWorld();
                }
                World.prototype.initWorld = function () {
                    this.arrPoints = new Array();
                    var p;
                    var radius, currentParticleAngle, numParticlesInRing, particleX, particleZ;
                    var TWO_PI = Math.PI * 2;
                    var masterPoint = new Particle_1["default"](2.2, 0, 0, 0, 0);
                    this.arrPoints.push(new Array(masterPoint));
                    this.view.scene.add(masterPoint.sphereObject);
                    var thisRingPoints;
                    for (radius = 2.5; radius < 0; radius += 0.5) {
                        numParticlesInRing = Math.round(5 * radius);
                        thisRingPoints = new Array();
                        for (currentParticleAngle = 0; currentParticleAngle < TWO_PI; currentParticleAngle += TWO_PI / numParticlesInRing) {
                            particleX = Math.cos(currentParticleAngle) * radius;
                            particleZ = Math.sin(currentParticleAngle) * radius;
                            p = new Particle_1["default"](0.3, particleX, 0, particleZ, radius);
                            thisRingPoints.push(p);
                            this.view.scene.add(p.sphereObject);
                        }
                        this.arrPoints.push(thisRingPoints);
                    }
                };
                World.prototype.updateParticles = function (startTime) {
                    var currentTime = (new Date().getTime() - startTime) / 1000;
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
                };
                return World;
            }());
            exports_4("default", World);
        }
    };
});
System.register("main/WaveManager", ["model/World"], function (exports_5, context_5) {
    "use strict";
    var World_1, WaveManager;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (World_1_1) {
                World_1 = World_1_1;
            }
        ],
        execute: function () {
            WaveManager = (function () {
                function WaveManager() {
                    this.world = new World_1["default"]();
                    this.startWave();
                }
                WaveManager.prototype.startWave = function () {
                    this.startTime = new Date().getTime();
                    this.updateParticles();
                };
                WaveManager.prototype.updateParticles = function () {
                    this.world.updateParticles(this.startTime);
                    requestAnimationFrame(this.updateParticles.bind(this));
                };
                return WaveManager;
            }());
            exports_5("WaveManager", WaveManager);
        }
    };
});

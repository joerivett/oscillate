import Particle from './Particle';
import Wave from './Wave';
import SceneRenderer from '../view/SceneRenderer';

class World
{
  DISTANCE_BETWEEN_RINGS:number = 0.5;
  DEFAULT_NUMBER_OF_RINGS:number = 11;
  PARTICLE_RADIUS:number = 0.3;

  arrPoints:Array<Array<Particle>>;

  view:SceneRenderer;

  wave:Wave;

  numRings:number;

  constructor(wave:Wave)
  {
    this.numRings = this.DEFAULT_NUMBER_OF_RINGS;

    this.wave = wave;
    this.view = new SceneRenderer();

    this.initWorld();
  }

  initWorld()
  {
    this.arrPoints = new Array();

    var masterPoint:Particle = new Particle(2.2, 0, 0, 0, 0);
    // Points are added in rings, each ring represented by a sub-array of points
    this.arrPoints.push(new Array(masterPoint));
    this.view.scene.add(masterPoint.sphereObject);

    for (let ringNumber = 1; ringNumber < this.numRings; ringNumber++)
    {
      this.addRing(ringNumber);
    }

    this.view.update();
  }

  addRing(ringNumber:number)
  {
    var p:Particle;
    let numParticlesInRing = Math.round(4 * ringNumber),
        distanceFromOrigin = 2.5 + (ringNumber * this.DISTANCE_BETWEEN_RINGS),
        thisRingPoints:Array<Particle> = new Array(),
        particleX:number,
        particleZ:number;

    const TWO_PI:number = Math.PI * 2;
    for (let currentParticleAngle = 0; currentParticleAngle < TWO_PI; currentParticleAngle += TWO_PI / numParticlesInRing)
    {
      // Resolve angles about the y axis origin for this particle
      particleX = Math.cos(currentParticleAngle) * distanceFromOrigin;
      particleZ = Math.sin(currentParticleAngle) * distanceFromOrigin;
      p = new Particle(this.PARTICLE_RADIUS, particleX, 0, particleZ, distanceFromOrigin);
      thisRingPoints.push(p);
      this.view.scene.add(p.sphereObject);
    }
    this.arrPoints.push(thisRingPoints);
  }

  updateRingCount(newNumRings:number)
  {
    if (this.arrPoints.length < newNumRings)
    {
      while (this.arrPoints.length < newNumRings)
      {
        this.addRing(this.arrPoints.length);
      }
    }
    else
    {
      while (this.arrPoints.length > newNumRings)
      {
        let lastRing:Array<Particle> = this.arrPoints.pop();
        lastRing.forEach((particle:Particle) => {
          this.view.scene.remove(particle.sphereObject);
        });
      }
    }
  }

  updateParticles()
  {
    var currentTime = (new Date().getTime() - this.wave.startTime) / 1000;

    var waveDistanceTravelled:number = this.wave.getWaveDistanceTravelled(currentTime);

    var i:number,
        j:number,
        thisRingArray:Array<Particle>,
        thisRingAmplitude:number;

    for (i = 0; i < this.arrPoints.length; i++)
    {
      thisRingArray = this.arrPoints[i];
      if (thisRingArray.length > 0)
      {
        thisRingAmplitude = this.wave.getAmplitudeAtPoint(waveDistanceTravelled, thisRingArray[0].distanceFromOrigin, currentTime);
        for (j = 0; j < thisRingArray.length; j++)
        {
          thisRingArray[j].amplitude = thisRingAmplitude;
        }
      }
    }

    this.view.update();
  }
}

export default World;

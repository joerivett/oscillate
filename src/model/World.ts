import Particle from './Particle';
import Wave from './Wave';
import SceneRenderer from '../view/SceneRenderer';

class World
{
  arrPoints:Array<Array<Particle>>;

  view:SceneRenderer;

  wave:Wave;

  constructor()
  {
    this.wave = new Wave(1);
    this.view = new SceneRenderer();

    this.initWorld();
  }

  initWorld()
  {
    this.arrPoints = new Array();

    var p:Particle;
    var radius:number,
        currentParticleAngle:number,
        numParticlesInRing:number,
        particleX:number,
        particleZ:number;
    const TWO_PI:number = Math.PI * 2;

    var masterPoint:Particle = new Particle(2.2, 0, 0, 0, 0);
    // Points are added in rings, each ring represented by a sub-array of points
    this.arrPoints.push(new Array(masterPoint));
    this.view.scene.add(masterPoint.sphereObject);

    var thisRingPoints:Array<Particle>;

    for (radius = 2.5; radius < 11; radius += 0.5)
    {
      numParticlesInRing = Math.round(5 * radius);
      thisRingPoints = new Array();
      // Resolve angles about the y axis origin for this particle
      for (currentParticleAngle = 0; currentParticleAngle < TWO_PI; currentParticleAngle += TWO_PI / numParticlesInRing)
      {
        particleX = Math.cos(currentParticleAngle) * radius;
        particleZ = Math.sin(currentParticleAngle) * radius;
        p = new Particle(0.3, particleX, 0, particleZ, radius);
        thisRingPoints.push(p);
        this.view.scene.add(p.sphereObject);
      }
      this.arrPoints.push(thisRingPoints);
    }
  }

  updateParticles(startTime:number)
  {
    var currentTime = (new Date().getTime() - startTime) / 1000;

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

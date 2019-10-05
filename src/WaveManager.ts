class WaveManager
{
  arrPoints:Array<Array<Particle>>;

  startTime:number;

  timer:any;

  wave:Wave;

  view:WaveRenderer;

  constructor()
  {
    this.arrPoints = new Array();

    this.view = new WaveRenderer();

    var p:Particle;
    var radius:number,
        currentParticleAngle:number,
        numParticlesInRing:number,
        particleX:number,
        particleZ:number,
        // Working in radians
        TWO_PI:number = Math.PI * 2;

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

    this.wave = new Wave(1);

    this.startWave();
  }

  startWave()
  {
    this.startTime = new Date().getTime();

    this.updateParticles();
  }

  updateParticles()
  {
    var currentTime = (new Date().getTime() - this.startTime) / 1000;

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

    requestAnimationFrame( this.updateParticles.bind(this) );
  }
}

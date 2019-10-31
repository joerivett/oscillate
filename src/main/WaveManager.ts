import World from '../model/World';

export class WaveManager
{
  world:World;

  startTime:number;

  timer:any;

  constructor()
  {
    this.world = new World();

    this.startWave();
  }

  startWave()
  {
    this.startTime = new Date().getTime();

    this.updateParticles();
  }

  updateParticles()
  {
    this.world.updateParticles(this.startTime);
    requestAnimationFrame( this.updateParticles.bind(this) );
  }
}

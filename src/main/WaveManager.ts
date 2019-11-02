import World from '../model/World';
import Wave from '../model/Wave';

export class WaveManager
{
  world:World;

  timer:any;

  wave:Wave;

  constructor()
  {
    this.wave = new Wave(1);
    this.world = new World(this.wave);

    this.startWave();
  }

  startWave()
  {
    this.wave.start();

    this.updateParticles();
  }

  updateParticles()
  {
    this.world.updateParticles();
    requestAnimationFrame( this.updateParticles.bind(this) );
  }
}

import World from '../model/World';
import Wave from '../model/Wave';

export class WaveManager
{
  world:World;

  timer:any;

  wave:Wave;

  constructor()
  {
    this.initListeners();

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

  initListeners()
  {
    document.getElementById('waveFrequency').addEventListener('change', this.waveFrequency_changed.bind(this));
    document.getElementById('ringCount').addEventListener('change', this.ringCount_changed.bind(this));
  }

  waveFrequency_changed(e)
  {
    this.wave.frequency = e.target.value / 10;
  }

  ringCount_changed(e)
  {
    this.world.updateRingCount(e.target.value);
  }
}

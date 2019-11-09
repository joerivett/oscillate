import World from '../model/World';
import Waves from '../model/Waves';

export class WaveManager
{
  world:World;

  timer:any;

  waves:Waves;

  waveActive:boolean;

  constructor()
  {
    this.initListeners();

    this.waves = new Waves();
    this.world = new World(this.waves);

    this.startWave();
  }

  startWave()
  {
    // this.waves.start();
    this.waves.newWave(1);

    this.updateParticles(performance.now());
  }

  stopWave()
  {
    // this.waves.stop();
  }

  updateParticles(currentTime:number)
  {
    // if (this.wave.isActive)
    // {
      this.world.updateParticles(currentTime);
      requestAnimationFrame(this.updateParticles.bind(this));
    // }
  }

  initListeners()
  {
    document.getElementById('waveRunning').addEventListener('click', this.waveRunning_clicked.bind(this));
    document.getElementById('waveFrequency').addEventListener('change', this.waveFrequency_changed.bind(this));
    document.getElementById('ringCount').addEventListener('input', this.ringCount_changed.bind(this));
  }

  waveFrequency_changed(e:Event)
  {
    this.waves.newWave(e.target.value / 10);
  }

  ringCount_changed(e:Event)
  {
    this.world.updateRingCount(e.target.value);
  }

  waveRunning_clicked()
  {
    // if (this.wave.isActive)
    // {
    //   this.stopWave();
    // }
    // else
    // {
    //   this.startWave();
    // }
  }
}

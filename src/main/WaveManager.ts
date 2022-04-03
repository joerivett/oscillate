import World from '../model/World';
import Waves from '../model/Waves';

enum InputType {
  MICROPHONE,
  MANUAL
}

export class WaveManager
{
  world:World;

  timer:any;

  waves:Waves;

  waveActive:boolean;

  inputType:InputType;

  active:boolean;

  constructor()
  {
    this.initListeners();

    this.waves = new Waves();
    this.world = new World(this.waves);

    this.startWave();
  }

  startWave():void
  {
    this.active = true;

    this.waves.newWave(1);

    this.updateParticles(performance.now());
  }

  updateParticles(currentTime:number = 0):void
  {
    this.world.updateParticles(currentTime);
    if (this.active) requestAnimationFrame(this.updateParticles.bind(this));
  }

  initListeners():void
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

  inputType_changed(e:Event)
  {
    const val:String = String(e.target.value);
    this.setInputType(val == 'micInput' ? InputType.MICROPHONE : InputType.MANUAL);
  }

  waveRunning_clicked()
  {
    this.active = !this.active;
    if (this.active) this.updateParticles();
  }
}

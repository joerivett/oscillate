import World from '../model/World';
import Waves from '../model/Waves';
import AudioInput from './AudioInput';

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

  audioInput:AudioInput;

  constructor()
  {
    this.initListeners();

    this.setInputType(InputType.MANUAL);

    this.waves = new Waves();
    this.world = new World(this.waves);

    this.startWave();
  }

  startWave()
  {
    this.waves.newWave(1);

    this.updateParticles(performance.now());
  }

  updateParticles(currentTime:number)
  {
    if (this.inputType == InputType.MICROPHONE)
    {
      this.waves.setAmplitude(this.audioInput.volume());
    }
    this.world.updateParticles(currentTime);
    requestAnimationFrame(this.updateParticles.bind(this));
  }

  setInputType(inputType:InputType):void
  {
    this.inputType = inputType;
    if (this.inputType == InputType.MICROPHONE)
    {
      this.startMicInput();
    }
    else
    {
      this.startManalInput();
    }
  }

  startMicInput():void
  {
    if (!this.audioInput) this.audioInput = new AudioInput();
    document.getElementById('manualControls').style.opacity = '0.3';
    document.getElementById('manualControls').disabled = 1;
  }

  startManalInput():void
  {
    document.getElementById('manualControls').style.opacity = '1.0';
    document.getElementById('manualControls').disabled = 0;
  }

  initListeners()
  {
    document.getElementById('waveRunning').addEventListener('click', this.waveRunning_clicked.bind(this));
    document.getElementById('waveFrequency').addEventListener('change', this.waveFrequency_changed.bind(this));
    document.getElementById('ringCount').addEventListener('input', this.ringCount_changed.bind(this));
    document.getElementById('micInput').addEventListener('change', this.inputType_changed.bind(this));
    document.getElementById('manualInput').addEventListener('change', this.inputType_changed.bind(this));
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

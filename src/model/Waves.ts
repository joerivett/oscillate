import Wave from './Wave';

class Waves
{
  waveQueue:Array<Wave>;

  constructor()
  {
    this.waveQueue = new Array<Wave>();
  }

  newWave(frequency:number)
  {
    let wave:Wave = new Wave(frequency);
    if (this.waveQueue.length > 0) console.log(this.waveQueue[0].phase);
    this.waveQueue.unshift(wave);
    wave.start();
  }

  setAmplitude(microphoneVolume: number)
  {
    this.waveQueue[0].amplitude = microphoneVolume * 30;
  }

  // Origin here is the source of the wave
  getAmplitudeAtPoint(pointDistanceFromOrigin:number, currentTime:number):number
  {
    let amplitude:number = 0,
        wave:Wave,
        i:number;

    for (i = 0; i < this.waveQueue.length; i++)
    {
      wave = this.waveQueue[i];
      if (wave.getWaveDistanceTravelled(currentTime) > pointDistanceFromOrigin)
      {
        amplitude = wave.getAmplitudeAtPoint(pointDistanceFromOrigin, currentTime);
        break;
      }
    }

    return amplitude;
  }
}

export default Waves;

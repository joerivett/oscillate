class Wave
{
  wavelength:number;
  WAVE_SPEED:number = 6; // Speed of sound = 340 m/s

  amplitude:number;

  startTime:number = 0;

  private _frequency:number;

  // Wave number (k)
  private waveNumber:number;

  // Angular frequency (omega)
  private angularFrequency:number;

  public isActive:boolean;

  constructor(frequency:number, amplitude:number = 1)
  {
    this.frequency = frequency;
    this.amplitude = amplitude;

    // wave speed = frequency * wavelength
    this.wavelength = this.WAVE_SPEED / frequency;

    // wave number (k), 2π = 1 circular rotation = 1 complete wavelength, so k = 2π/λ
    this.waveNumber = (2 * Math.PI) / this.wavelength;
  }

  set frequency(newFrequency:number)
  {
    this._frequency = newFrequency;
    // angular frequency (omega ω), 2πf
    this.angularFrequency = (2 * Math.PI) * this._frequency;
  }

  get frequency()
  {
    return this._frequency;
  }

  start()
  {
    this.startTime = performance.now() / 1000;
    this.isActive = true;
  }

  stop()
  {
    this.isActive = false;
  }

  getAmplitudeAtPoint(pointDistance:number, currentTime:number):number
  {
    let amplitude:number = 0;

    // Ensure that wave has reached point
    if (pointDistance <= this.getWaveDistanceTravelled(currentTime))
    {
      amplitude = (Math.sin((this.waveNumber * pointDistance) - (this.angularFrequency * (currentTime - this.startTime))) * this.amplitude);
    }

    return amplitude;
  }

  getWaveDistanceTravelled(currentTime:number):number
  {
    // v = d/t
    // d = v*t
    return this.WAVE_SPEED * (currentTime - this.startTime);
  }
}

export default Wave;

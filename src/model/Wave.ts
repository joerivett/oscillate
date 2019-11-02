class Wave
{
  wavelength:number;
  WAVE_SPEED:number = 6; // Speed of sound = 340 m/s

  startTime:number = 0;

  private _frequency:number;

  // Wave number (k)
  private waveNumber:number;

  // Angular frequency (omega)
  private angularFrequency:number;

  public isActive:boolean;

  constructor(frequency:number)
  {
    this.frequency = frequency;
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
    this.startTime = new Date().getTime();
  }

  start()
  {
    this.startTime = new Date().getTime();
    this.isActive = true;
  }

  stop()
  {
    this.isActive = false;
  }

  getAmplitudeAtPoint(waveDistanceTravelled:number, pointDistance:number, time:number):number
  {
    var amplitude:number = 0;

    // Ensure that wave has reached point
    if (pointDistance <= waveDistanceTravelled)
    {
      amplitude = Math.sin((this.waveNumber * pointDistance) - (this.angularFrequency * time));
    }

    return amplitude;
  }

  getWaveDistanceTravelled(time:number = 0):number
  {
    // v = d/t
    // d = v*t
    return this.WAVE_SPEED * time;
  }
}

export default Wave;

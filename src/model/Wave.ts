class Wave
{
  frequency:number;
  wavelength:number;
  WAVE_SPEED:number = 7; // Speed of sound = 340 m/s

  // Wave number (k)
  private waveNumber:number;

  // Angular frequency (omega)
  private angularFrequency:number;

  public blnWaveActive:boolean;

  constructor(frequency:number)
  {
    this.frequency = frequency;
    // wave speed = frequency * wavelength
    this.wavelength = this.WAVE_SPEED / frequency;

    // wave number (k), 2π = 1 circular rotation = 1 complete wavelength, so k = 2π/λ
    this.waveNumber = (2 * Math.PI) / this.wavelength;
    // angular frequency (omega ω), 2πf
    this.angularFrequency = (2 * Math.PI) * this.frequency;

    this.blnWaveActive = true;
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

  stopWave(time)
  {
    this.blnWaveActive = false;
  }
}

export default Wave;

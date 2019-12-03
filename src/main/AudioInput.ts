class AudioInput
{
  mic:any;

  constructor()
  {
    this.mic = new p5.AudioIn();
    this.mic.start();
  }

  volume():number
  {
    return this.mic.getLevel();
  }
}

export default AudioInput;

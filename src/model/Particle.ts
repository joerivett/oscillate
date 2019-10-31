class Particle
{
  public distanceFromOrigin:number;

  public sphereObject:THREE.Object3D;

  private _amplitude:number;

  private radius:number;

  protected x:number;
  protected y:number;
  protected z:number;

  constructor(radius:number, x:number, y:number, z:number, distanceFromOrigin:number)
  {
    this.distanceFromOrigin = distanceFromOrigin;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.z = z;

    var geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    this.sphereObject = new THREE.Mesh( geometry, material );

    this.amplitude = 0;
  }

  get amplitude():number {
    return this._amplitude;
  }

  set amplitude(newAmp:number) {
    this._amplitude = newAmp;
    // Transverse wave:
    this.sphereObject.position.set(this.x, this.y + newAmp, this.z);
    // Longitudinal wave:
    // this.sphereObject.position.set(this.distanceFromOrigin + newAmp, 0, 0);
  }
}

export default Particle;

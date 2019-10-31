class SceneRenderer
{
  renderer:THREE.WebGLRenderer;
  scene:THREE.Scene;
  camera:THREE.PerspectiveCamera;
  controls:any;

  constructor()
  {
    this.initScene();
  }

  initScene()
  {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.camera.position.z = 3;

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 5, 5);
    this.scene.add(dirLight);

	  this.controls = new THREE.TrackballControls( this.camera );
  }

  update()
  {
    this.renderer.render( this.scene, this.camera );
    this.controls.update();
  }
}

export default SceneRenderer;

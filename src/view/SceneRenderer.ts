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
    let width:number = window.innerWidth * 0.75,
        height:number = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    let container = document.getElementById('canvasContainer');
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    this.camera.position.z = 4;
    this.camera.position.y = 4;
    this.camera.position.x = 0;

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 5, 5);
    this.scene.add(dirLight);
    this.scene.add(this.camera);
	  this.controls = new THREE.TrackballControls(this.camera, container);
  }

  update()
  {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }
}

export default SceneRenderer;

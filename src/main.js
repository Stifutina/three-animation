// ThreeJS and Third-party deps
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import gsap from 'gsap';
// Core boilerplate code deps
import {
  createCamera,
  createRenderer,
  runApp,
  getDefaultUniforms,
} from "./core-utils";
const loader = new OBJLoader();

const image = `data:image/png;base64,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`;
const discTexture = new THREE.TextureLoader().load(image);
const uniforms = {
  ...getDefaultUniforms(),
  u_texture: {
    type: 't',
    value: discTexture
  },
  u_pointsize: { value: 2 },
  // wave 1
  u_noise_freq_1: { value: 1.1 },
  u_noise_amp_1: { value: 0.02 },
  u_spd_modifier_1: { value: 0.3 },
  // wave 2
  u_noise_freq_2: { value: 0.01 },
  u_noise_amp_2: { value: 0.1 },
  u_spd_modifier_2: { value: 0.01 },
};
const skyUniforms = {
  ...getDefaultUniforms(),
  u_texture: {
    type: 't',
    value: discTexture
  },
  u_pointsize: { value: 6 },
  // wave 1
  u_noise_freq_1: { value: 10 },
  u_noise_amp_1: { value: 0.02 },
  u_spd_modifier_1: { value: 0.04 },
  // wave 2
  u_noise_freq_2: { value: 0.2 },
  u_noise_amp_2: { value: 300 },
  u_spd_modifier_2: { value: 0.1 },
};

/**************************************************
 * 1. Initialize core threejs components
 *************************************************/
// Create the scene
let scene = new THREE.Scene();

// Create the renderer via 'createRenderer',
// 1st param receives additional WebGLRenderer properties
// 2nd param receives a custom callback to further configure the renderer
let renderer = createRenderer({ antialias: true });

// Create the camera
// Pass in fov, near, far and camera position respectively
// let camera = createCamera(60, 0.01, 1000, { x: 0, y: 0, z: 4.5 });
const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.z = 18;

/**************************************************
 * 2. Build your scene in this threejs app
 * This app object needs to consist of at least the async initScene() function (it is async so the animate function can wait for initScene() to finish before being called)
 * initScene() is called after a basic threejs environment has been set up, you can add objects/lighting to you scene in initScene()
 * if your app needs to animate things(i.e. not static), include a updateScene(interval, elapsed) function in the app as well
 *************************************************/
let app = {
  vertexShader() {
    return `
    #define PI 3.14159265359
    #define TWO_PI 6.28318530718

    uniform float u_time;
    uniform float u_pointsize;
    uniform float u_noise_amp_1;
    uniform float u_noise_freq_1;
    uniform float u_spd_modifier_1;
    uniform float u_noise_amp_2;
    uniform float u_noise_freq_2;
    uniform float u_spd_modifier_2;

    // 2D Random
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation

        // Cubic Hermine Curve.  Same as SmoothStep()
        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);

        // Mix 4 coorners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    mat2 rotate2d(float angle){
        return mat2(cos(angle),-sin(angle),
                  sin(angle),cos(angle));
    }

    varying vec2 vUv;
    varying float vPointSize;
    varying float vPointRandom;
    varying float vPulsation;
    varying float vNoiseVal;

    // Simple random function
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vPointRandom = rand(position.xy);
      vUv = uv;
      vPulsation = abs(sin(u_time * 0.1 + vPointRandom * 6.28318530718));
      gl_PointSize = vPointRandom * 8.0 + u_pointsize;
      

      vec3 pos = position;
      // pos.xy is the original 2D dimension of the plane coordinates
      pos.z += noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;

      // Circular motion calculation
      float radius = 0.07; // Adjust radius as needed
      float angle = u_time + vPointRandom * TWO_PI; // Vary angle over time
      pos.xy += vec2(cos(angle), sin(angle)) * radius;
      
      vNoiseVal = noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;

      pos.z += noise(rotate2d(PI / 1.) * pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;
      vec4 mvm = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvm;
    }
    `;
  },
  fragmentShader() {
    return `
    #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI 3.14159265359
    #define TWO_PI 6.28318530718
    #define texture2D texture
    
    uniform vec2 u_resolution;
    uniform sampler2D u_texture;

    varying float vPulsation;
    varying float vPointRandom;
    varying float vNoiseVal;
    varying vec2 vUv;

    void main() {
      vec2 st = (gl_FragCoord.xy/u_resolution.xy) / 0.8;
  
      vec4 texColor = vec4(vec3(0.4, st), 1.0) * texture2D(u_texture, gl_PointCoord);
  
      // Define colors
      vec3 colorA = vec3(1.0, 0.333, 0.0); // #ff5500
      vec3 colorB = vec3(0.063, 0.263, 1.0); // #1043ff
  
      // Compute the distance factor or another intensity value
      float d = length(vec3(vNoiseVal * 40.0, vNoiseVal * 10.0, vNoiseVal * 50.0));
      d = clamp(d, 0.0, 1.0);
  
      // First mix between colorA and colorB
      vec3 baseColor = mix(colorA, colorB, d);
  
      // Mix with white based on another factor to create highlights
      float highlight = smoothstep(0.03, 1.8, vPulsation); // Adjust the range to control highlight effect
      vec3 finalColor = mix(baseColor, vec3(1.0), highlight);
  
      texColor.rgb = finalColor;
  
      // Apply pulsation effect to alpha
      texColor.a *= vPulsation * 0.7;
      
      gl_FragColor = texColor;
    }
    `;
  },

  /** TODO: make mousemove lerp animation using THREE js raycaster
   * 
   * this is reference minimised animate function
   * 
   * 
   * 
 function g0() {
    const s = Tm.getDelta()
      , e = Tm.getElapsedTime();
    Ss.uTime.value = e,
    Qa.uniforms.uTime.value = e,
    m0.update(),
    $a.render(),
    Em.setFromCamera(Ra, Oi);
    const n = Em.intersectObject(Df)[0] || {}
      , {point: i=new Oe(0,0)} = n;
    Dn || (wo.scale.setScalar(Ku.lerp(wo.scale.x, Nh, s * 10)),
    wo.position.lerp(new I(i.x,i.y,p0), s * 6)),
    Oi.position.lerp(new I(Ra.x * 4,Ra.y * 4,Oi.position.z), s * 4),
    Ss.uCursor.value.lerp(new Oe(i.x,i.y), s * 4),
    Dn || Pt.set(Ih, {
        width: Ku.lerp(Pt.getProperty(Ih, "width"), Oh, s * 10)
    }),
    Li && (Li.rotation.y = Math.sin(e * .5) * .15,
    Li.rotation.z = Math.sin(-e * .5) * .15),
    Oi.updateProjectionMatrix(),
    requestAnimationFrame(g0)
}
   * 
   */

  async initScene() {
    
    function generateGaussianPoint(center, spread) {
      function gaussianRandom() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      }
    
      const x = center.x + gaussianRandom() * spread.x;
      const y = center.y + gaussianRandom() * spread.y;
      const z = center.z + gaussianRandom() * spread.z;
    
      return [x, y, z];
    }
    

    // Environment
    scene.background = new THREE.Color("#0d1214");
    scene.fog = new THREE.FogExp2( 0x000000, 140 );

    const vertices = [];
    const numPoints = 5000;
    const center = { x: 100, y: 20, z: -80 };
    const spread = { x: 500, y: 100, z: 500 };

    for (let i = 0; i < numPoints; i++) {
      const [x, y, z] = generateGaussianPoint(center, spread);
      vertices.push(x, y, z);
    }
    
    this.skyBoxGeometry = new THREE.BufferGeometry();
    this.skyBoxGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 4 ) );
    this.skyBoxMaterial = new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      vertexShader: this.vertexShader(),
      fragmentShader: this.fragmentShader(),
      transparent: true, // Enable transparency
      depthTest: false,
      defaultAttributeValues: { 'color': [ 0, 0, 0 ], 'uv': [ 0, 0 ], 'uv1': [ 0, 0 ] }
    });
    
    this.skyBox = new THREE.Points(this.skyBoxGeometry, this.skyBoxMaterial);
    scene.add(this.skyBox);
    
    // Mesh
    loader.load(
        // resource URL
        './models/text.obj',
        
        ( object ) => {
            console.log(object);
            this.geometry = object.children[0].geometry;
            this.geometry.scale(2.3, 2.3, 2.3);

            const material = new THREE.ShaderMaterial({
              uniforms: uniforms,
              vertexShader: this.vertexShader(),
              fragmentShader: this.fragmentShader(),
              transparent: true, // Enable transparency
              depthTest: false,
              defaultAttributeValues: { 'color': [ 0, 0, 0 ], 'uv': [ 0, 0 ], 'uv1': [ 0, 0 ] }
            });
            
            this.mesh = new THREE.Points(this.geometry, material);
            scene.add(this.mesh);

            this.mesh.rotation.x = 0;
            this.mesh.rotation.y = 0;
            this.mesh.position.y = -0.8;
            this.mesh.position.x = 0;

            gsap.fromTo(
                this.mesh.rotation,
                { x: 0.1, y: 0.1},
                {
                    duration: 3,
                    x: 0.03,
                    y: 0.03,
                    ease: 'power1.inOut',
                    stagger: 0.1,
                    repeat: -1,
                    yoyo: true,
                },
            );
        },
        // called when loading is in progresses
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened', error );
    
        }
    );
  },
  // @param {number} interval - time elapsed between 2 frames
  // @param {number} elapsed - total time elapsed since app start
  updateScene(interval, elapsed) {
    // this.controls.update();
  },
};

/**************************************************
 * 3. Run the app
 * 'runApp' will do most of the boilerplate setup code for you:
 * e.g. HTML container, window resize listener, mouse move/touch listener for shader uniforms, THREE.Clock() for animation
 * Executing this line puts everything together and runs the app
 * ps. if you don't use custom shaders, pass undefined to the 'uniforms'(2nd-last) param
 * ps. if you don't use post-processing, pass undefined to the 'composer'(last) param
 *************************************************/
runApp(app, scene, renderer, camera, true, uniforms, skyUniforms, undefined);

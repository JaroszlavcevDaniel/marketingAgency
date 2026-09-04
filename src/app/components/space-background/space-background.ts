import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-space-background',
  standalone: false,
  templateUrl: './space-background.html',
  styleUrl: './space-background.css',
})
export class SpaceBackground implements AfterViewInit, OnDestroy {

  @ViewChild('rendererContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private earth!: THREE.Mesh;
  private clouds!: THREE.Mesh;
  private stars!: THREE.Points;
  private spaceNebula!: THREE.Mesh; 
  private neonGlow!: THREE.Mesh;     

  private animationId = 0;

  ngAfterViewInit(): void {
    this.initThree();
    this.createStars();
    this.createCleanNebula(); 
    this.createEarthAndGlow(); 
    this.animate();

    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
  }

  private initThree(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.z = 9;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.nativeElement.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const sun = new THREE.DirectionalLight(0xffffff, 3.5);
    sun.position.set(10, 4, 7);
    this.scene.add(sun);
  }

  private createStars(): void {
    const geo = new THREE.BufferGeometry();
    const pos: number[] = [];

    for (let i = 0; i < 8000; i++) {
      pos.push(
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1800
      );
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true, 
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });

    this.stars = new THREE.Points(geo, mat);
    this.scene.add(this.stars);
  }

  private createCleanNebula(): void {
    const geo = new THREE.PlaneGeometry(30, 20);
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
      grad.addColorStop(0, 'rgba(75, 0, 130, 0.15)');  
      grad.addColorStop(0.5, 'rgba(0, 50, 150, 0.08)'); 
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');          
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
    }

    const texture = new THREE.CanvasTexture(canvas);

    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.spaceNebula = new THREE.Mesh(geo, mat);
    this.spaceNebula.position.set(-2, 1, -10); 
    this.scene.add(this.spaceNebula);
  }

  private createEarthAndGlow(): void {
    const loader = new THREE.TextureLoader();

    const earthTex = loader.load('/textures/earth.jpg');
    const cloudTex = loader.load('/textures/clouds.jpg');

    earthTex.colorSpace = THREE.SRGBColorSpace;
    cloudTex.colorSpace = THREE.SRGBColorSpace;

    this.earth = new THREE.Mesh(
      new THREE.SphereGeometry(2, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthTex,
        roughness: 0.85,
        metalness: 0.1
      })
    );
    this.earth.position.set(0, 0, -1); 
    this.scene.add(this.earth);

    this.clouds = new THREE.Mesh(
      new THREE.SphereGeometry(2.015, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.35
      })
    );
    this.clouds.position.copy(this.earth.position);
    this.scene.add(this.clouds);

    const innerGlowGeo = new THREE.SphereGeometry(2.02, 64, 64);
    const innerGlowMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(1.0 - vNormal.z, 3.0);
          gl_FragColor = vec4(0.2, 0.5, 1.0, intensity * 0.3);
        }
      `
    });

    const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    innerGlow.position.copy(this.earth.position);
    this.scene.add(innerGlow);

    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 512;
    glowCanvas.height = 512;
    const glowCtx = glowCanvas.getContext('2d');
    
    if (glowCtx) {
      const grad = glowCtx.createRadialGradient(256, 256, 140, 256, 256, 250);
      grad.addColorStop(0, 'rgba(0, 0, 255, 1.0)');     
      grad.addColorStop(0.1, 'rgba(0, 0, 255, 0.8)');   
      grad.addColorStop(0.5, 'rgba(0, 0, 255, 0.2)');   
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');        
      
      glowCtx.fillStyle = grad;
      glowCtx.fillRect(0, 0, 512, 512);
    }

    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    const spriteMat = new THREE.SpriteMaterial({
      map: glowTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    const glowSprite = new THREE.Sprite(spriteMat);
    glowSprite.scale.set(4.8, 4.8, 1.0); 
    
    glowSprite.position.set(this.earth.position.x, this.earth.position.y, this.earth.position.z - 0.1);
    
    this.neonGlow = glowSprite as any; 
    this.scene.add(this.neonGlow);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    this.earth.rotation.y += 0.0006;
    this.clouds.rotation.y += 0.0009;

    this.stars.rotation.y += 0.000005;
    this.spaceNebula.rotation.z += 0.00002;

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.position = 'absolute';
  };
}
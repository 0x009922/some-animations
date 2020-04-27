import * as THREE from 'three';
import Animation from '@/utils/ThreeAnimation';

// Скорость вращения, в радианах
const ROTATION_SPEED = 1.1;

// Максимальный размер кубика
const MAX_SIZE = 1.2;

// Количество кубиков
const CUBES_COUNT = 10;

// Дистанция камеры от центра
const CAMERA_DISTANCE = 1.5;

// Поворот каждого кубика относительно предыдущего
const DELTA_ANGLE = 0.18;

/**
 * Рекурсивное формирование кубиков
 * @typedef {{ size: number, angle: number }} CubeDef
 * @param {number} count Сколько нужно сформировать
 * @param {number} lastSize Размер предыдущего кубика
 * @param {number} lastAngle Угол поворота предыдущего кубика
 * @param {CubeDef[]} cubes Куда класть результат
 * @returns {CubeDef[]}
 */
function generateCubes(count, lastSize, lastAngle = 0, cubes = []) {
  if (count <= 0) return cubes;
  const angle = lastAngle + DELTA_ANGLE;
  const size = (lastSize * 0.95) / (Math.sin(DELTA_ANGLE) + Math.cos(DELTA_ANGLE));
  cubes.push({ size, angle });
  return generateCubes(count - 1, size, angle, cubes);
}

export default class extends Animation {
  constructor(canvas) {
    super();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2.5,
    });
    generateCubes(CUBES_COUNT, MAX_SIZE).forEach(({ size, angle }) => {
      const geometry = new THREE.BoxGeometry(size, size, size);
      const edges = new THREE.EdgesGeometry(geometry);
      const lines = new THREE.LineSegments(edges, material);
      lines.rotateY(angle);
      this.scene.add(lines);
    });

    this.viewAngle = 0;
  }

  animate(delta) {
    this.viewAngle += ROTATION_SPEED * delta * 0.001;
    this.camera.position.set(
      Math.cos(this.viewAngle) * CAMERA_DISTANCE,
      Math.cos(Math.PI / 4) * CAMERA_DISTANCE,
      Math.sin(this.viewAngle) * CAMERA_DISTANCE,
    );
    this.camera.lookAt(0, 0, 0);
    this.render();
  }
}

export interface Vec { x: number; y: number }
export interface Spring {
  current: Vec;
  target: Vec;
  velocity: Vec;
  update(dt?: number): void;
}

/** Spencer Gabor's spring (stiffness .05, friction .8), normalised so dt = 1 is one 60 Hz frame. */
export function createSpring(stiffness = 0.05, friction = 0.8): Spring {
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const velocity = { x: 0, y: 0 };
  function update(dt = 1) {
    const decay = Math.pow(friction, dt);
    for (const axis of ['x', 'y'] as const) {
      velocity[axis] = velocity[axis] * decay + (target[axis] - current[axis]) * stiffness * dt;
      current[axis] = Math.round((current[axis] + velocity[axis] * dt) * 100) / 100;
    }
  }
  return { current, target, velocity, update };
}

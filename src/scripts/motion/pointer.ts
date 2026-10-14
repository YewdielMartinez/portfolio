/** Live pointer position (viewport px) plus movement accumulated since the last `takeMovement()`. */
export const pointer = { x: 0, y: 0, active: false };

let mx = 0;
let my = 0;
let lastX: number | null = null;
let lastY: number | null = null;
let bound = false;

export function bindPointer() {
  if (bound) return;
  bound = true;
  addEventListener(
    'pointermove',
    (e) => {
      if (lastX !== null && lastY !== null) {
        mx += e.clientX - lastX;
        my += e.clientY - lastY;
      }
      lastX = pointer.x = e.clientX;
      lastY = pointer.y = e.clientY;
      pointer.active = true;
    },
    { passive: true },
  );
  document.addEventListener('pointerout', (e) => {
    if (e.relatedTarget) return;
    pointer.active = false;
    lastX = lastY = null;
  });
}

export function takeMovement() {
  const movement = { mx, my };
  mx = my = 0;
  return movement;
}

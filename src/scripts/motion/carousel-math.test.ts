import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FRICTION, restingOffset, slideX, snapOffset, velocityFor } from './carousel-math.ts';

test('slideX wraps slides into [-step, length - step)', () => {
  // 5 slides, step 100 → length 500
  assert.equal(slideX(0, 0, 100, 500), 0);
  assert.equal(slideX(0, 150, 100, 500), 350);   // slid off the left, reappears at the right
  assert.equal(slideX(4, -100, 100, 500), 0);     // 400 + 100 + 100 = 600 → wraps to 100, minus step
});

test('restingOffset projects geometric decay', () => {
  // offset -= v each frame with v *= f → total = v * f / (1 - f)
  assert.ok(Math.abs(restingOffset(0, 10, 0.85) - (-10 * 0.85 / 0.15)) < 1e-9);
});

test('velocityFor reaches the target exactly in the limit', () => {
  const v = velocityFor(300, 0, FRICTION);
  assert.ok(Math.abs(restingOffset(0, v, FRICTION) - 300) < 1e-9);
});

test('snapOffset rounds the projected rest to the nearest centred slide', () => {
  // step 100, centre padding 50 → slide k centred when offset = k*100 - 50
  assert.equal(snapOffset(-40, 0, 100, 50, FRICTION), -50);
  assert.equal(snapOffset(40, 0, 100, 50, FRICTION), 50);
  assert.equal(snapOffset(-50, 0, 100, 50, FRICTION, 1), 50); // forced step to next slide
});

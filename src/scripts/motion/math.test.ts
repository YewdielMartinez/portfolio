import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp, damp, lerp, mapRange, wrap } from './math.ts';

test('lerp', () => assert.equal(lerp(0, 10, 0.25), 2.5));
test('clamp', () => { assert.equal(clamp(5, 0, 1), 1); assert.equal(clamp(-1, 0, 1), 0); });
test('wrap handles negatives', () => { assert.equal(wrap(-1, 10), 9); assert.equal(wrap(23, 10), 3); });
test('mapRange unclamped and clamped', () => {
  assert.equal(mapRange(5, 0, 10, 0, 1), 0.5);
  assert.equal(mapRange(20, 0, 10, 0, 1), 2);
  assert.equal(mapRange(20, 0, 10, 0, 1, true), 1);
});
test('damp moves toward target, frame-rate independent', () => {
  const one = damp(0, 100, 0.9, 2);
  const two = damp(damp(0, 100, 0.9, 1), 100, 0.9, 1);
  assert.ok(Math.abs(one - two) < 1e-9);
  assert.ok(one > 0 && one < 100);
});

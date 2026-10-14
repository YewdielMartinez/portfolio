import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSpring } from './spring.ts';

test('converges to target', () => {
  const s = createSpring();
  s.target.x = 100; s.target.y = -50;
  for (let i = 0; i < 600; i++) s.update(1);
  assert.ok(Math.abs(s.current.x - 100) < 0.05);
  assert.ok(Math.abs(s.current.y + 50) < 0.05);
});

test('matches Spencer first steps at dt=1 (stiffness .05, friction .8)', () => {
  const s = createSpring(0.05, 0.8);
  s.target.x = 100;
  s.update(1); assert.equal(s.current.x, 5);      // v = 0*.8 + 100*.05
  s.update(1); assert.equal(s.current.x, 13.75);  // v = 5*.8 + 95*.05 = 8.75
});

test('stays stable with large dt', () => {
  const s = createSpring();
  s.target.x = 100;
  for (let i = 0; i < 300; i++) s.update(3);
  assert.ok(Number.isFinite(s.current.x));
  assert.ok(Math.abs(s.current.x - 100) < 1);
});

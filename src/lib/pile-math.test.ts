import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pileLayers } from './pile-math.ts';

test('is deterministic per seed', () => {
  assert.deepEqual(pileLayers(3, 7), pileLayers(3, 7));
});
test('values stay inside Spencer ranges', () => {
  for (let seed = 0; seed < 50; seed++) {
    const layers = pileLayers(3, seed);
    layers.forEach((l, i) => {
      assert.ok(Math.abs(l.rotation) >= 2 && Math.abs(l.rotation) <= 5);
      assert.ok(Math.abs(l.offsetX) >= 4 && Math.abs(l.offsetX) <= 10);
      assert.equal(l.offsetY, (layers.length - i) * 5);
    });
  }
});
test('rotation sign alternates by layer', () => {
  const [a, b] = pileLayers(2, 1);
  assert.ok(Math.sign(a.rotation) !== Math.sign(b.rotation));
});

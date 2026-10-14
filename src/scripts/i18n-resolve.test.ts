import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolvePath } from './i18n-resolve.ts';

const dict = { a: { b: 'x' }, list: [{ title: 'Kayro' }], n: 3 };
test('object path', () => assert.equal(resolvePath(dict, 'a.b'), 'x'));
test('array index', () => assert.equal(resolvePath(dict, 'list.0.title'), 'Kayro'));
test('numbers become strings', () => assert.equal(resolvePath(dict, 'n'), '3'));
test('missing → undefined', () => assert.equal(resolvePath(dict, 'a.c.d'), undefined));
test('objects are not text', () => assert.equal(resolvePath(dict, 'a'), undefined));

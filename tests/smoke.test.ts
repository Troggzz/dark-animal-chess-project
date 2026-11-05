import test from 'node:test';
import assert from 'node:assert/strict';

// Kiểm tra môi trường chạy test (W-001). Không kiểm tra luật game.
test('môi trường test chạy được TypeScript', () => {
  const x: number = 1;
  assert.equal(x + 1, 2);
});

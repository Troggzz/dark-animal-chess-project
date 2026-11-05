import test from 'node:test';
import assert from 'node:assert/strict';
import { SPECIES, speciesById, speciesByRank } from '../src/engine/species.ts';

// S1 §4: đúng 9 loài, Rank 1..9 không trùng.
test('có đúng 9 loài, Rank 1..9 liên tục không trùng', () => {
  assert.equal(SPECIES.length, 9);
  assert.deepEqual(SPECIES.map((s) => s.rank), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(new Set(SPECIES.map((s) => s.id)).size, 9);
});

test('Chuột Rank 1, Voi Rank 9 (S1 §4, §4.1)', () => {
  assert.equal(speciesById('mouse').rank, 1);
  assert.equal(speciesById('elephant').rank, 9);
  assert.equal(speciesByRank(9).id, 'elephant');
  assert.equal(speciesByRank(1).nameVi, 'Chuột');
});

// S1 §19 + D-026: trạng thái rỗng hợp lệ.
import { createEmptyState } from '../src/engine/state.ts';
test('createEmptyState: không có mảng queue/cells riêng, bàn 6×7', () => {
  const s = createEmptyState('g1', 'BLUE');
  assert.equal(s.currentTurn, 'BLUE');
  assert.deepEqual(s.board, { columns: 6, rows: 7 });
  assert.equal(s.teams.RED.pieces.length, 0);
  assert.equal('queue' in s.teams.RED, false);
  assert.equal(s.winner, null);
  assert.equal(s.draw, false);
});

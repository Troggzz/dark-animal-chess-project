
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COLUMNS, ROWS, allPositions, cellId, parseCellId, zoneOf, homeCells,
  neighbors, isAdjacent, pieceAt, emptyCells, piecesOnBoard,
} from '../src/engine/board.ts';
import { createEmptyState } from '../src/engine/state.ts';
import type { Piece } from '../src/engine/types.ts';
import { piece } from './helpers.ts';

// S1 §3: 6 cột × 7 hàng = 42 ô, mỗi ô có ID duy nhất.
test('bàn có 42 ô với ID duy nhất, góc A1 và F7', () => {
  const all = allPositions();
  assert.equal(COLUMNS * ROWS, 42);
  assert.equal(all.length, 42);
  assert.equal(new Set(all.map(cellId)).size, 42);
  assert.equal(cellId({ x: 0, y: 0 }), 'A1');
  assert.equal(cellId({ x: 5, y: 6 }), 'F7');
});

test('parseCellId là nghịch đảo của cellId; từ chối ID sai', () => {
  for (const p of allPositions()) assert.deepEqual(parseCellId(cellId(p)), p);
  for (const bad of ['', 'G1', 'A0', 'A8', 'a1', 'AA1', 'A11']) assert.equal(parseCellId(bad), null, bad);
  assert.throws(() => cellId({ x: 6, y: 0 }));
  assert.throws(() => cellId({ x: 0, y: -1 }));
});

// S1 §3: hàng 1–3 sân Đỏ, hàng 4 trung lập, hàng 5–7 sân Xanh.
test('vùng 3–1–3: 18 ô Đỏ, 6 ô trung lập, 18 ô Xanh', () => {
  const zones = allPositions().map(zoneOf);
  assert.equal(zones.filter((z) => z === 'RED').length, 18);
  assert.equal(zones.filter((z) => z === 'NEUTRAL').length, 6);
  assert.equal(zones.filter((z) => z === 'BLUE').length, 18);
  assert.equal(zoneOf(parseCellId('A3')!), 'RED');
  assert.equal(zoneOf(parseCellId('A4')!), 'NEUTRAL');
  assert.equal(zoneOf(parseCellId('F5')!), 'BLUE');
  assert.equal(homeCells('RED').length, 18);
  assert.ok(homeCells('BLUE').every((p) => p.y >= 4));
});

test('ô kề 4 hướng: góc 2, cạnh 3, giữa 4; không đi chéo', () => {
  assert.equal(neighbors({ x: 0, y: 0 }).length, 2);
  assert.equal(neighbors({ x: 5, y: 6 }).length, 2);
  assert.equal(neighbors({ x: 2, y: 0 }).length, 3);
  assert.equal(neighbors({ x: 0, y: 3 }).length, 3);
  assert.equal(neighbors({ x: 2, y: 3 }).length, 4);
  assert.equal(isAdjacent({ x: 2, y: 3 }, { x: 2, y: 4 }), true);
  assert.equal(isAdjacent({ x: 2, y: 3 }, { x: 3, y: 4 }), false);
  assert.equal(isAdjacent({ x: 2, y: 3 }, { x: 2, y: 3 }), false);
  assert.equal(isAdjacent({ x: 5, y: 0 }, { x: 6, y: 0 }), false);
});

// S1 §3: mỗi ô tối đa một quân sống; quân ở hàng chờ/đã bị loại không chiếm ô.
test('pieceAt chỉ thấy quân ALIVE đang BOARD; ô trống tính đúng', () => {
  const s = createEmptyState('t');
  s.teams.RED.pieces.push(
    piece({ id: 'r1', team: 'RED', position: { x: 1, y: 1 } }),
    piece({ id: 'r2', team: 'RED', locationType: 'QUEUE', position: null }),
    piece({ id: 'r3', team: 'RED', lifeStatus: 'ELIMINATED', locationType: 'REMOVED', position: null }),
  );
  s.teams.BLUE.pieces.push(piece({ id: 'b1', team: 'BLUE', position: { x: 4, y: 5 } }));
  assert.equal(pieceAt(s, { x: 1, y: 1 })?.id, 'r1');
  assert.equal(pieceAt(s, { x: 4, y: 5 })?.id, 'b1');
  assert.equal(pieceAt(s, { x: 0, y: 0 }), undefined);
  assert.equal(piecesOnBoard(s).length, 2);
  assert.equal(piecesOnBoard(s, 'RED').length, 1);
  assert.equal(emptyCells(s).length, 40);
});

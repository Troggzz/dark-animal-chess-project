
import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyState } from '../src/engine/state.ts';
import { checkInvariants } from '../src/engine/invariants.ts';
import { piece } from './helpers.ts';

function codes(state: ReturnType<typeof createEmptyState>): string[] {
  return checkInvariants(state).map((violation) => violation.code);
}

test('GameState rỗng không vi phạm bất biến hiện có', () => {
  const state = createEmptyState('test');

  assert.deepEqual(checkInvariants(state), []);
});

test('I-01: phát hiện ID quân bị trùng', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({ id: 'same-id', team: 'RED' }),
    piece({ id: 'same-id', team: 'RED', position: { x: 1, y: 1 } }),
  );

  assert.ok(codes(state).includes('I-01'));
});

test('I-02: phát hiện quân nằm sai danh sách đội', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({ id: 'wrong-team', team: 'BLUE' }),
  );

  assert.ok(codes(state).includes('I-02'));
});

test('I-04: phát hiện hai quân sống cùng chiếm một ô', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({ id: 'r1', team: 'RED', position: { x: 2, y: 2 } }),
    piece({ id: 'r2', team: 'RED', position: { x: 2, y: 2 } }),
  );

  assert.ok(codes(state).includes('I-04'));
});

test('I-04: quân QUEUE và ELIMINATED không chiếm ô trên bàn', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({ id: 'r1', team: 'RED', position: { x: 2, y: 2 } }),
    piece({
      id: 'r2',
      team: 'RED',
      locationType: 'QUEUE',
      position: null,
    }),
    piece({
      id: 'r3',
      team: 'RED',
      lifeStatus: 'ELIMINATED',
      locationType: 'REMOVED',
      position: { x: 2, y: 2 },
    }),
  );

  assert.ok(!codes(state).includes('I-04'));
});

test('I-05: quân ELIMINATED không được ở BOARD hoặc QUEUE', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({
      id: 'r1',
      team: 'RED',
      lifeStatus: 'ELIMINATED',
      locationType: 'BOARD',
    }),
    piece({
      id: 'r2',
      team: 'RED',
      lifeStatus: 'ELIMINATED',
      locationType: 'QUEUE',
      position: null,
    }),
  );

  assert.ok(codes(state).includes('I-05'));
});

test('I-06: quân BOARD phải có tọa độ nằm trong bàn', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({
      id: 'outside',
      team: 'RED',
      position: { x: 6, y: 2 },
    }),
    piece({
      id: 'no-position',
      team: 'RED',
      position: null,
    }),
  );

  assert.ok(codes(state).includes('I-06'));
});

test('I-07: quân QUEUE phải có position bằng null', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({
      id: 'queue-position',
      team: 'RED',
      locationType: 'QUEUE',
      position: { x: 1, y: 1 },
    }),
  );

  assert.ok(codes(state).includes('I-07'));
});

test('I-08: mỗi đội không được có quá 15 quân sống', () => {
  const state = createEmptyState('test');

  for (let i = 0; i < 16; i += 1) {
    state.teams.RED.pieces.push(
      piece({
        id: `red-${i}`,
        team: 'RED',
        locationType: 'QUEUE',
        position: null,
      }),
    );
  }

  assert.ok(codes(state).includes('I-08'));
});

test('I-08: quân đã bị loại không được tính vào số quân sống', () => {
  const state = createEmptyState('test');

  for (let i = 0; i < 15; i += 1) {
    state.teams.RED.pieces.push(
      piece({
        id: `red-alive-${i}`,
        team: 'RED',
        locationType: 'QUEUE',
        position: null,
      }),
    );
  }

  state.teams.RED.pieces.push(
    piece({
      id: 'red-eliminated',
      team: 'RED',
      lifeStatus: 'ELIMINATED',
      locationType: 'REMOVED',
      position: null,
    }),
  );

  assert.ok(!codes(state).includes('I-08'));
});

test('I-09: Rank phải khớp với loài', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({
      id: 'wrong-rank',
      team: 'RED',
      type: 'elephant',
      rank: 1,
    }),
  );

  assert.ok(codes(state).includes('I-09'));
});

test('I-09: loài và Rank khớp nhau thì hợp lệ', () => {
  const state = createEmptyState('test');

  state.teams.RED.pieces.push(
    piece({
      id: 'elephant',
      team: 'RED',
      type: 'elephant',
      rank: 9,
    }),
    piece({
      id: 'mouse',
      team: 'RED',
      type: 'mouse',
      rank: 1,
      position: { x: 1, y: 1 },
    }),
  );

  assert.ok(!codes(state).includes('I-09'));
});

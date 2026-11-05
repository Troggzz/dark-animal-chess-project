
import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyState } from '../src/engine/state.ts';
import {
  createPieceView,
  createPlayerView,
  createHistoryView,
} from '../src/engine/view.ts';
import { piece } from './helpers.ts';

test('quân úp không tiết lộ loài và Rank kể cả với chủ sở hữu', () => {
  const p = piece({
    id: 'r1',
    team: 'RED',
    type: 'elephant',
    rank: 9,
    visibility: 'FACE_DOWN',
  });

  const redView = createPieceView(p, 'RED');
  const blueView = createPieceView(p, 'BLUE');

  assert.equal(redView.type, null);
  assert.equal(redView.rank, null);
  assert.equal(blueView.type, null);
  assert.equal(blueView.rank, null);
});

test('quân ngửa hiển thị loài và Rank cho cả hai đội', () => {
  const p = piece({
    id: 'r1',
    team: 'RED',
    type: 'elephant',
    rank: 9,
    visibility: 'FACE_UP',
  });

  const redView = createPieceView(p, 'RED');
  const blueView = createPieceView(p, 'BLUE');

  assert.equal(redView.type, 'elephant');
  assert.equal(redView.rank, 9);
  assert.equal(blueView.type, 'elephant');
  assert.equal(blueView.rank, 9);
});

test('chỉ đội sở hữu được xem thông tin Lá Bí Mật', () => {
  const p = piece({
    id: 'r1',
    team: 'RED',
    type: 'tiger',
    rank: 6,
    visibility: 'FACE_DOWN',
    secretCards: [{
      id: 'card-1',
      type: 'SHIELD',
      status: 'ACTIVE',
      ownerPieceId: 'r1',
      activationCount: 1,
    }],
  });

  const redView = createPieceView(p, 'RED');
  const blueView = createPieceView(p, 'BLUE');

  assert.equal(redView.secretCards.length, 1);
  assert.equal(redView.secretCards[0]?.type, 'SHIELD');
  assert.equal(redView.secretCards[0]?.pieceId, 'r1');

  assert.equal(redView.type, null);
  assert.equal(redView.rank, null);

  assert.equal(blueView.secretCards.length, 0);
  assert.equal(blueView.type, null);
  assert.equal(blueView.rank, null);
});

test('PlayerView không làm lộ danh tính quân úp', () => {
  const state = createEmptyState('view-test');

  state.teams.RED.pieces.push(
    piece({
      id: 'r1',
      team: 'RED',
      type: 'elephant',
      rank: 9,
      visibility: 'FACE_DOWN',
    }),
  );

  state.teams.BLUE.pieces.push(
    piece({
      id: 'b1',
      team: 'BLUE',
      type: 'mouse',
      rank: 1,
      visibility: 'FACE_UP',
    }),
  );

  const view = createPlayerView(state, 'BLUE');

  const hiddenPiece = view.pieces.find((p) => p.id === 'r1');
  const revealedPiece = view.pieces.find((p) => p.id === 'b1');

  assert.ok(hiddenPiece);
  assert.equal(hiddenPiece.type, null);
  assert.equal(hiddenPiece.rank, null);

  assert.ok(revealedPiece);
  assert.equal(revealedPiece.type, 'mouse');
  assert.equal(revealedPiece.rank, 1);

  assert.equal('random' in view, false);
  assert.equal('eventQueue' in view, false);
  assert.equal('history' in view, false);
});

test('HistoryView không gửi detail có thể chứa dữ liệu bí mật', () => {
  const history = [{
    seq: 1,
    type: 'PIECE_ELIMINATED',
    team: 'RED' as const,
    detail: {
      pieceId: 'r1',
      species: 'elephant',
      rank: 9,
      secretCard: 'SHIELD',
    },
  }];

  const view = createHistoryView(history, 'BLUE');

  assert.deepEqual(view, [{
    seq: 1,
    type: 'PIECE_ELIMINATED',
    team: 'RED',
  }]);

  assert.equal('detail' in view[0]!, false);
});
test('quân úp trong hàng chờ không tiết lộ loài và Rank cho cả hai đội', () => {
  const p = piece({
    id: 'r-queue',
    team: 'RED',
    type: 'elephant',
    rank: 9,
    visibility: 'FACE_DOWN',
    locationType: 'QUEUE',
    position: null,
  });

  const redView = createPieceView(p, 'RED');
  const blueView = createPieceView(p, 'BLUE');

  assert.equal(redView.type, null);
  assert.equal(redView.rank, null);

  assert.equal(blueView.type, null);
  assert.equal(blueView.rank, null);
});


import type { Piece } from '../src/engine/types.ts';

export function piece(
  over: Partial<Piece> & Pick<Piece, 'id' | 'team'>,
): Piece {
  return {
    type: 'mouse',
    rank: 1,
    visibility: 'FACE_DOWN',
    lifeStatus: 'ALIVE',
    locationType: 'BOARD',
    position: { x: 0, y: 0 },
    secretCards: [],
    activeEffects: [],
    ...over,
  };
}

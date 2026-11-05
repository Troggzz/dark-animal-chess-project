// Tạo GameState rỗng. Nguồn: S1 §19. Chưa có quân; việc tạo quân thuộc P2 (T2.x).
import { COLUMNS, ROWS } from './board.ts';
import type { GameState, Team } from './types.ts';

export function createEmptyState(id: string, firstTurn: Team = 'RED'): GameState {
  return {
    id,
    version: '2.6.1',
    status: 'SETUP',
    currentTurn: firstTurn,
    turnNumber: 1,
    board: { columns: COLUMNS, rows: ROWS },
    teams: { RED: { pieces: [] }, BLUE: { pieces: [] } },
    random: { seed: null, history: [] },
    eventQueue: [],
    history: [],
    winner: null,
    draw: false,
    stateVersion: 1,
  };
}

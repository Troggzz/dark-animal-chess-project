// Kiểu dữ liệu lõi. Nguồn: S1 §6 (trạng thái quân), §19 (cấu trúc dữ liệu tham khảo), D-025, D-026.
// Quy ước: mỗi nhóm trạng thái của quân được lưu ĐỘC LẬP (S1 §6), không gộp thành một biến.

export const TEAMS = ['RED', 'BLUE'] as const;
export type Team = (typeof TEAMS)[number];

export type SpeciesId =
  | 'mouse' | 'cat' | 'dog' | 'wolf' | 'leopard' | 'tiger' | 'lion' | 'bear' | 'elephant';
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Visibility = 'FACE_DOWN' | 'FACE_UP';        // nhóm "Hiển thị"
export type LifeStatus = 'ALIVE' | 'ELIMINATED';          // nhóm "Sinh tồn"
export type LocationType = 'BOARD' | 'QUEUE' | 'REMOVED'; // nhóm "Vị trí"

/** Toạ độ 0-based: x = 0..5 (cột A..F), y = 0..6 (hàng 1..7). y tăng dần về phía sân Xanh. (D-025) */
export interface Position { x: number; y: number }

// Placeholder cho P5/P6: sẽ chốt chi tiết sau khi duyệt luật Lá Bí Mật (Q-08, Q-09).
export interface SecretCard {
  id: string;
  type: string;
  status: 'ACTIVE' | 'DISABLED' | 'CONSUMED' | 'PENDING';
  ownerPieceId: string;
  activationCount: number;
}

export interface Piece {
  id: string;
  team: Team;
  type: SpeciesId;
  rank: Rank;
  visibility: Visibility;
  lifeStatus: LifeStatus;
  locationType: LocationType;
  /** null khi không ở trên bàn (QUEUE hoặc REMOVED) */
  position: Position | null;
  secretCards: SecretCard[];
  activeEffects: unknown[];
}

export type GameStatus = 'SETUP' | 'IN_PROGRESS' | 'FINISHED';

// Placeholder cho P6/P7.
export interface GameEvent {
  id: string;
  type: string;
  sourcePieceId: string | null;
  targetPieceId: string | null;
  parentEventId: string | null;
  reason: string;
  status: 'PENDING' | 'DONE';
}
export interface HistoryEntry {
  seq: number;
  type: string;
  team: Team | null;
  detail: Record<string, unknown>;
}

/**
 * Trạng thái ván. Nguồn dữ liệu chuẩn duy nhất (D-026):
 *  - hàng chờ = các quân có locationType 'QUEUE' (KHÔNG có mảng queue riêng);
 *  - ô nào có quân = suy ra từ position của quân ALIVE+BOARD (KHÔNG có mảng cells riêng).
 */
export interface GameState {
  id: string;
  version: string;
  status: GameStatus;
  currentTurn: Team;
  turnNumber: number;
  board: { columns: number; rows: number };
  teams: Record<Team, { pieces: Piece[] }>;
  random: { seed: number | null; history: number[] };
  eventQueue: GameEvent[];
  history: HistoryEntry[];
  winner: Team | null;
  draw: boolean;
  stateVersion: number;
}

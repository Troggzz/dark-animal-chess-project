// Bàn cờ 6 cột A–F × 7 hàng 1–7, vùng 3–1–3. Nguồn: S1 §3 (L84), D-025.
// Toạ độ trong code là 0-based {x: 0..5, y: 0..6}; ID ô hiển thị dạng "A1".."F7".
// Hướng: y tăng dần về phía sân Xanh. Hàng 1–3 (y 0–2) sân Đỏ, hàng 4 (y 3) trung lập, hàng 5–7 (y 4–6) sân Xanh.
import type { GameState, Piece, Position, Team } from './types.ts';

export const COLUMNS = 6;
export const ROWS = 7;
const COLUMN_LABELS = 'ABCDEF';

export type Zone = 'RED' | 'NEUTRAL' | 'BLUE';

export function inBounds(p: Position): boolean {
  return Number.isInteger(p.x) && Number.isInteger(p.y) && p.x >= 0 && p.x < COLUMNS && p.y >= 0 && p.y < ROWS;
}

export function samePosition(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

/** {x:0,y:0} -> "A1"; {x:5,y:6} -> "F7". Ném lỗi nếu ngoài bàn. */
export function cellId(p: Position): string {
  if (!inBounds(p)) throw new Error(`Ô ngoài bàn: (${p.x},${p.y})`);
  return `${COLUMN_LABELS[p.x]}${p.y + 1}`;
}

/** "A1" -> {x:0,y:0}; trả về null nếu không hợp lệ. */
export function parseCellId(id: string): Position | null {
  const m = /^([A-F])([1-7])$/.exec(id);
  if (!m) return null;
  return { x: COLUMN_LABELS.indexOf(m[1] as string), y: Number(m[2]) - 1 };
}

export function zoneOf(p: Position): Zone {
  if (!inBounds(p)) throw new Error(`Ô ngoài bàn: (${p.x},${p.y})`);
  if (p.y <= 2) return 'RED';
  if (p.y === 3) return 'NEUTRAL';
  return 'BLUE';
}

/** Mọi ô của bàn, duyệt theo hàng từ y=0, trong hàng từ x=0. */
export function allPositions(): Position[] {
  const out: Position[] = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLUMNS; x++) out.push({ x, y });
  return out;
}

/** 18 ô thuộc sân nhà của đội (3 hàng × 6 cột). */
export function homeCells(team: Team): Position[] {
  return allPositions().filter((p) => zoneOf(p) === team);
}

/** Các ô kề theo 4 hướng (không chéo), chỉ giữ ô trong bàn. Thứ tự cố định: lên, xuống, trái, phải. */
export function neighbors(p: Position): Position[] {
  const cand: Position[] = [
    { x: p.x, y: p.y + 1 },
    { x: p.x, y: p.y - 1 },
    { x: p.x - 1, y: p.y },
    { x: p.x + 1, y: p.y },
  ];
  return cand.filter(inBounds);
}

export function isAdjacent(a: Position, b: Position): boolean {
  return inBounds(a) && inBounds(b) && Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
}

function allPieces(state: GameState): Piece[] {
  return [...state.teams.RED.pieces, ...state.teams.BLUE.pieces];
}

/** Quân đang sống và đang trên bàn (nguồn: locationType + lifeStatus, D-026). */
export function piecesOnBoard(state: GameState, team?: Team): Piece[] {
  return allPieces(state).filter(
    (p) => p.lifeStatus === 'ALIVE' && p.locationType === 'BOARD' && (team === undefined || p.team === team),
  );
}

export function pieceAt(state: GameState, pos: Position): Piece | undefined {
  return piecesOnBoard(state).find((p) => p.position !== null && samePosition(p.position, pos));
}

export function emptyCells(state: GameState): Position[] {
  return allPositions().filter((pos) => pieceAt(state, pos) === undefined);
}


import type {
  GameState,
  HistoryEntry,
  Piece,
  SecretCard,
  Team,
} from './types.ts';

/**
 * Dữ liệu quân được phép gửi đến client.
 * type và rank là null khi quân còn úp.
 */
export interface PieceView {
  id: string;
  team: Team;
  visibility: Piece['visibility'];
  lifeStatus: Piece['lifeStatus'];
  locationType: Piece['locationType'];
  position: Piece['position'];
  type: Piece['type'] | null;
  rank: Piece['rank'] | null;
  secretCards: SecretCardView[];
}

/**
 * Thông tin Lá Bí Mật chỉ đội sở hữu được xem.
 * Không chứa type hoặc rank của quân mang lá.
 */
export interface SecretCardView {
  id: string;
  type: string;
  status: SecretCard['status'];
  pieceId: string;
  activationCount: number;
}

export interface PlayerView {
  viewer: Team;
  status: GameState['status'];
  currentTurn: Team;
  turnNumber: number;
  board: GameState['board'];
  pieces: PieceView[];
  winner: Team | null;
  draw: boolean;
  stateVersion: number;
}

/**
 * Lọc thông tin một quân theo góc nhìn người chơi.
 */
export function createPieceView(
  piece: Piece,
  viewer: Team,
): PieceView {
  const isRevealed = piece.visibility === 'FACE_UP';
  const isOwner = piece.team === viewer;

  // Chỉ đội sở hữu được xem thông tin Lá Bí Mật.
  // Danh tính quân úp vẫn được giữ kín.
  const secretCards: SecretCardView[] = isOwner
    ? piece.secretCards.map((card) => ({
        id: card.id,
        type: card.type,
        status: card.status,
        pieceId: piece.id,
        activationCount: card.activationCount,
      }))
    : [];

  return {
    id: piece.id,
    team: piece.team,
    visibility: piece.visibility,
    lifeStatus: piece.lifeStatus,
    locationType: piece.locationType,
    position: piece.position ? { ...piece.position } : null,
    type: isRevealed ? piece.type : null,
    rank: isRevealed ? piece.rank : null,
    secretCards,
  };
}

/**
 * Tạo góc nhìn riêng cho một đội.
 * Không trả nguyên GameState hoặc Piece xuống client.
 */
export function createPlayerView(
  state: GameState,
  viewer: Team,
): PlayerView {
  const pieces = [
    ...state.teams.RED.pieces,
    ...state.teams.BLUE.pieces,
  ];

  return {
    viewer,
    status: state.status,
    currentTurn: state.currentTurn,
    turnNumber: state.turnNumber,
    board: { ...state.board },
    pieces: pieces.map((piece) => createPieceView(piece, viewer)),
    winner: state.winner,
    draw: state.draw,
    stateVersion: state.stateVersion,
  };
}

/**
 * Góc nhìn lịch sử tạm thời.
 *
 * HistoryEntry.detail hiện chưa có schema phân loại dữ liệu công khai
 * và bí mật. Vì vậy chỉ trả metadata an toàn, không gửi detail.
 *
 * Sẽ hoàn thiện khi P7 chốt cấu trúc Battle History.
 */
export interface HistoryView {
  seq: number;
  type: string;
  team: Team | null;
}

export function createHistoryView(
  history: HistoryEntry[],
  _viewer: Team,
): HistoryView[] {
  return history.map((entry) => ({
    seq: entry.seq,
    type: entry.type,
    team: entry.team,
  }));
}

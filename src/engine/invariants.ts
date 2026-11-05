
import type { GameState, Piece, Team } from './types.ts';
import { SPECIES } from './species.ts';

/** Mã của 14 bất biến tại S1 §17. */
export type InvariantCode =
  | 'I-01' | 'I-02' | 'I-03' | 'I-04' | 'I-05' | 'I-06' | 'I-07'
  | 'I-08' | 'I-09' | 'I-10' | 'I-11' | 'I-12' | 'I-13' | 'I-14';

export interface InvariantViolation {
  code: InvariantCode;
  message: string;
  pieceId?: string;
  eventId?: string;
}

interface LocatedPiece {
  containerTeam: Team;
  piece: Piece;
}

/**
 * Kiểm tra các bất biến có thể xác định từ GameState hiện tại.
 *
 * I-10 đến I-14 cần thêm cấu trúc dữ liệu ở các phase sau.
 * I-03 được bảo đảm về mặt cấu trúc bởi D-026:
 * mỗi quân chỉ có một locationType và không có mảng BOARD/QUEUE riêng.
 */
export function checkInvariants(state: GameState): InvariantViolation[] {
  const violations: InvariantViolation[] = [];

  const allPieces: LocatedPiece[] = [
    ...state.teams.RED.pieces.map((piece) => ({
      containerTeam: 'RED' as const,
      piece,
    })),
    ...state.teams.BLUE.pieces.map((piece) => ({
      containerTeam: 'BLUE' as const,
      piece,
    })),
  ];

  const addViolation = (
    code: InvariantCode,
    message: string,
    pieceId?: string,
  ): void => {
    violations.push({
      code,
      message,
      ...(pieceId === undefined ? {} : { pieceId }),
    });
  };

  // I-01: ID của mỗi quân phải duy nhất.
  const pieceIds = new Set<string>();

  for (const { piece } of allPieces) {
    if (pieceIds.has(piece.id)) {
      addViolation(
        'I-01',
        `ID quân bị trùng: ${piece.id}`,
        piece.id,
      );
    } else {
      pieceIds.add(piece.id);
    }
  }

  // I-02: Quân phải thuộc đúng đội chứa quân đó.
  for (const { containerTeam, piece } of allPieces) {
    if (piece.team !== containerTeam) {
      addViolation(
        'I-02',
        `Quân ${piece.id} khai báo đội ${piece.team} nhưng nằm trong danh sách ${containerTeam}.`,
        piece.id,
      );
    }
  }

  // I-03: Được bảo đảm bởi D-026.
  // Mỗi quân chỉ có một locationType; GameState không có mảng queue/cells riêng.
  // Không thể đồng thời ghi nhận một quân ở BOARD và QUEUE trong cấu trúc hiện tại.

  // I-04: Mỗi ô tối đa một quân sống.
  const occupiedSquares = new Map<string, string>();

  for (const { piece } of allPieces) {
    if (
      piece.lifeStatus !== 'ALIVE' ||
      piece.locationType !== 'BOARD' ||
      piece.position === null
    ) {
      continue;
    }

    const square = `${piece.position.x},${piece.position.y}`;
    const occupyingPieceId = occupiedSquares.get(square);

    if (occupyingPieceId !== undefined) {
      addViolation(
        'I-04',
        `Quân ${piece.id} và quân ${occupyingPieceId} cùng chiếm ô ${square}.`,
        piece.id,
      );
    } else {
      occupiedSquares.set(square, piece.id);
    }
  }

  // I-05: Quân ELIMINATED không được ở BOARD hoặc QUEUE.
  for (const { piece } of allPieces) {
    if (
      piece.lifeStatus === 'ELIMINATED' &&
      (piece.locationType === 'BOARD' || piece.locationType === 'QUEUE')
    ) {
      addViolation(
        'I-05',
        `Quân đã bị loại ${piece.id} vẫn có locationType ${piece.locationType}.`,
        piece.id,
      );
    }
  }

  // I-06: Quân BOARD phải có tọa độ hợp lệ.
  for (const { piece } of allPieces) {
    if (piece.locationType !== 'BOARD') continue;

    const position = piece.position;
    const validPosition =
      position !== null &&
      Number.isInteger(position.x) &&
      Number.isInteger(position.y) &&
      position.x >= 0 &&
      position.x < state.board.columns &&
      position.y >= 0 &&
      position.y < state.board.rows;

    if (!validPosition) {
      addViolation(
        'I-06',
        `Quân BOARD ${piece.id} không có tọa độ hợp lệ.`,
        piece.id,
      );
    }
  }

  // I-07: Quân QUEUE không được có tọa độ trên bàn.
  for (const { piece } of allPieces) {
    if (piece.locationType === 'QUEUE' && piece.position !== null) {
      addViolation(
        'I-07',
        `Quân QUEUE ${piece.id} vẫn có tọa độ trên bàn.`,
        piece.id,
      );
    }
  }

  // I-08: Tổng số quân ALIVE của mỗi đội không vượt quá 15.
  const teams: Team[] = ['RED', 'BLUE'];

  for (const team of teams) {
    const livingCount = state.teams[team].pieces.filter(
      (piece) => piece.lifeStatus === 'ALIVE',
    ).length;

    if (livingCount > 15) {
      addViolation(
        'I-08',
        `Đội ${team} có ${livingCount} quân sống, vượt quá giới hạn 15.`,
      );
    }
  }

  // I-09: Rank phải khớp với cấu hình loài.
  for (const { piece } of allPieces) {
    const species = SPECIES.find((item) => item.id === piece.type);

    if (species === undefined || species.rank !== piece.rank) {
      addViolation(
        'I-09',
        `Rank của quân ${piece.id} không khớp với loài ${piece.type}.`,
        piece.id,
      );
    }
  }

  // I-10: Chưa có cấu trúc client/view và quyền truy cập.
  // TODO(P8): Kiểm tra dữ liệu bí mật không được gửi cho client không có quyền.

  // I-11: Chưa có dữ liệu giao dịch/ID hành động đã commit.
  // TODO(P8): Kiểm tra một hành động chính không bị commit hai lần.

  // I-12: GameEvent hiện chỉ có PENDING/DONE, chưa có lịch sử xử lý.
  // TODO(P7/P8): Kiểm tra một event không bị xử lý hai lần.

  // I-13: Chưa có trạng thái transaction/Effect Queue hoàn tất.
  // TODO(P3/P5): Kiểm tra không đổi lượt trước khi transaction/Effect Queue hoàn tất.

  // I-14: GameState chưa lưu dấu vết hành động sau khi FINISHED.
  // TODO: Kiểm tra không tiếp tục ván sau khi trạng thái đã kết thúc.

  return violations;
}

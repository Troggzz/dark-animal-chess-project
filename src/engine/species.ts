// Bảng loài và Rank. Nguồn: S1 §4 (L109). Không thêm loài (spec cấm).
import type { Rank, SpeciesId } from './types.ts';

export interface SpeciesInfo { id: SpeciesId; rank: Rank; nameVi: string }

export const SPECIES: readonly SpeciesInfo[] = [
  { id: 'mouse', rank: 1, nameVi: 'Chuột' },
  { id: 'cat', rank: 2, nameVi: 'Mèo' },
  { id: 'dog', rank: 3, nameVi: 'Chó' },
  { id: 'wolf', rank: 4, nameVi: 'Sói' },
  { id: 'leopard', rank: 5, nameVi: 'Báo' },
  { id: 'tiger', rank: 6, nameVi: 'Hổ' },
  { id: 'lion', rank: 7, nameVi: 'Sư Tử' },
  { id: 'bear', rank: 8, nameVi: 'Gấu' },
  { id: 'elephant', rank: 9, nameVi: 'Voi' },
];

export function speciesById(id: SpeciesId): SpeciesInfo {
  const s = SPECIES.find((x) => x.id === id);
  if (!s) throw new Error(`Loài không tồn tại: ${id}`);
  return s;
}

export function speciesByRank(rank: Rank): SpeciesInfo {
  const s = SPECIES.find((x) => x.rank === rank);
  if (!s) throw new Error(`Rank không tồn tại: ${rank}`);
  return s;
}

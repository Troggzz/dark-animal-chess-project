# Nhật ký từng bước (WORKLOG)

**Mục đích:** mô tả đủ chi tiết từng bước đã làm để một phiên Claude khác (không nhớ gì) đọc xong là làm tiếp được, không làm trùng, không giẫm chân.
**Quy tắc:** sau MỖI bước nhỏ phải thêm một mục ở **cuối** file này (không sửa mục cũ, trừ để đánh dấu "ĐÃ BỊ THAY BẰNG W-xxx"). Mỗi mục dùng đúng khung dưới đây. Thông tin phải kiểm chứng được (lệnh chạy + kết quả thật).

## Khung một mục
```
### W-xxx · <ngày> · <phiên> · <task ID> · <tên bước>
- Mục tiêu:
- Đã làm (chi tiết, theo thứ tự):
- File tạo/sửa:
- Kiểm tra (lệnh + kết quả thật):
- Quyết định/giả định phát sinh (D-xxx, Q-xxx):
- Chưa làm / giới hạn đã biết:
- Bước kế tiếp (một việc cụ thể, kèm nguồn cần đọc):
- Tránh xung đột: file nào KHÔNG được động vào, việc nào làm song song được
```

---

### W-001 · 2026-11-05 · Acc1-2026-11-05 · T1.1 · Dựng khung dự án engine
- **Mục tiêu:** có thể chạy test và kiểm tra kiểu cho engine TypeScript mà không cần cài thêm gói nào.
- **Đã làm:**
  1. Kiểm tra môi trường: Node v22.23.4, `tsc` 6.0.3 có sẵn, KHÔNG có Vitest và không có mạng để cài.
  2. Thử `node --test` chạy trực tiếp file `.ts` (Node tự bỏ phần kiểu, "type stripping"): chạy được, không cần cờ.
  3. Chọn bộ test có sẵn của Node (`node:test` + `node:assert/strict`) thay cho Vitest; dùng `tsc --noEmit` để kiểm tra kiểu. Lý do: không cần cài gì, đúng với môi trường hiện tại, đổi sang Vitest sau này rất dễ (cú pháp `test`/`assert` tương tự). → D-024.
  4. Tạo `package.json` (type module, `engines.node >= 22.18`, script `test`, `typecheck`), `tsconfig.json`, `.gitignore`, `tests/smoke.test.ts`.
- **File tạo:** `package.json`, `tsconfig.json`, `.gitignore`, `tests/smoke.test.ts`.
- **Kiểm tra:** `npm test` → 1 test, 1 pass, 0 fail. `npm run typecheck` lúc đó báo TS18003 "không có file đầu vào" vì chưa có file trong `src/engine` (đúng như dự kiến; hết lỗi sau W-002/W-003).
- **Quyết định:** D-024 (bộ test và cách chạy TypeScript).
- **Giới hạn:** (1) Cần Node ≥ 22.18 (bản cũ hơn phải thêm cờ `--experimental-strip-types`). (2) Không dùng `enum`, `namespace` hay tham số-thuộc-tính trong `.ts` vì type stripping không hỗ trợ (đã bật `erasableSyntaxOnly` để tsc báo lỗi nếu ai làm vậy). (3) Import nội bộ phải ghi đuôi `.ts`.
- **Bước kế tiếp:** W-002.
- **Tránh xung đột:** `package.json`, `tsconfig.json` chỉ sửa khi đổi công cụ, và phải ghi quyết định mới.

### W-002 · 2026-11-05 · Acc1-2026-11-05 · T1.2 · Kiểu dữ liệu lõi
- **Mục tiêu:** định nghĩa kiểu dữ liệu đúng S1 §6 và §19, trước khi viết logic.
- **Đã làm:**
  1. Đọc S1 §6 (L180) và §19 (L475) và §4 (L109) để lấy đúng tên trường và giá trị.
  2. Viết `src/engine/types.ts`: `Team` (`RED`/`BLUE`), `SpeciesId`, `Rank` 1–9, **ba nhóm trạng thái độc lập** `Visibility`, `LifeStatus`, `LocationType` (S1 §6 cấm gộp), `Position`, `Piece`, `GameState`, và các kiểu giữ chỗ `SecretCard`, `GameEvent`, `HistoryEntry` (sẽ chốt chi tiết ở P5–P7).
  3. Viết `src/engine/species.ts`: bảng 9 loài với Rank đúng S1 §4 (Chuột 1 … Voi 9) và tên tiếng Việt; hàm `speciesById`, `speciesByRank`.
  4. Viết `src/engine/state.ts`: `createEmptyState(id, firstTurn)` tạo GameState rỗng đúng khung §19 (chưa có quân; tạo quân thuộc P2).
  5. Hai quyết định thiết kế: toạ độ 0-based (D-025) và **một nguồn dữ liệu duy nhất** cho hàng chờ và ô (D-026), vì S1 §19 yêu cầu chọn một nguồn chuẩn.
- **File tạo:** `src/engine/types.ts`, `src/engine/species.ts`, `src/engine/state.ts`, `tests/species.test.ts`.
- **Kiểm tra:** xem W-003 (chạy chung vì `state.ts` import `board.ts`).
- **Quyết định:** D-025, D-026.
- **Giới hạn:** `SecretCard.status` đang ghi 4 giá trị theo S1 §11 nhưng là giữ chỗ; `GameEvent`/`HistoryEntry` rất tối giản. Đừng coi là chuẩn cuối. `random.history` chỉ là mảng số giữ chỗ cho T2.1.
- **Bước kế tiếp:** W-003.
- **Tránh xung đột:** `types.ts` là file dùng chung; khi sửa kiểu `Piece` hoặc `GameState` phải ghi quyết định mới và chạy lại toàn bộ test.

### W-003 · 2026-11-05 · Acc1-2026-11-05 · T1.3 · Bàn cờ (Board Engine)
- **Mục tiêu:** có hàm thuần cho bàn 6×7, ID ô, vùng 3–1–3, ô kề, truy vấn quân trên bàn.
- **Đã làm:**
  1. Đọc S1 §3 (L84).
  2. Viết `src/engine/board.ts`: `COLUMNS=6`, `ROWS=7`, `inBounds`, `samePosition`, `cellId` (`{x:0,y:0}` → `"A1"`, `{x:5,y:6}` → `"F7"`, ném lỗi nếu ngoài bàn), `parseCellId` (không hợp lệ thì trả `null`), `zoneOf` (hàng 1–3 `RED`, hàng 4 `NEUTRAL`, hàng 5–7 `BLUE`), `allPositions`, `homeCells(team)` (18 ô), `neighbors` (4 hướng, không chéo, thứ tự cố định lên-xuống-trái-phải), `isAdjacent`, `piecesOnBoard`, `pieceAt`, `emptyCells`.
  3. `pieceAt`/`piecesOnBoard` chỉ tính quân `ALIVE` và `BOARD` (S1 §3 "mỗi ô tối đa một quân sống"; S1 §6 quân hàng chờ không chiếm ô).
  4. Viết `tests/board.test.ts` (5 test) và thêm 1 test cho `createEmptyState` vào `tests/species.test.ts`.
- **File tạo:** `src/engine/board.ts`, `tests/board.test.ts`.
- **Kiểm tra:** `npm test` → **9 test, 9 pass, 0 fail** (smoke 1, species 3 gồm test state, board 5). `npm run typecheck` → thoát với mã 0, không lỗi. (Test files chưa được kiểm kiểu vì chưa có `@types/node`; chỉ `src/engine` được kiểm.)
- **Quyết định:** không có thêm.
- **Giới hạn:** chưa kiểm tra "hai quân sống cùng một ô" (đó là bất biến, thuộc T1.4); `pieceAt` chỉ trả quân đầu tiên tìm thấy. Chưa có hàm theo vùng cho luật "quân úp ở sân đối phương" (Q-05 còn mở).
- **Bước kế tiếp:** **T1.4 – bộ kiểm tra bất biến.** Đọc S1 §17 (L433–L452, 14 điều kiện). Tạo `src/engine/invariants.ts` xuất `checkInvariants(state): InvariantViolation[]`, mỗi điều kiện một mã `I-01…I-14` ghi rõ số thứ tự trong §17; test ở `tests/invariants.test.ts`. Nên tách hàm dựng quân giả trong `tests/board.test.ts` ra `tests/helpers.ts` (tên không có đuôi `.test.ts` để `npm test` không chạy nó) rồi dùng chung. Những điều kiện cần Effect Queue/lá/lưu trữ (P5, P6, P8) thì cài sẵn khung và ghi `TODO(P…)`, đừng bịa luật.
- **Tránh xung đột:** T1.4 (`invariants.ts`) và T1.5 (`view.ts`, lọc dữ liệu ẩn) là hai file khác nhau, có thể giao hai phiên chạy song song. Cả hai chỉ được **đọc** `types.ts`, `board.ts`; nếu cần sửa hai file đó thì phải làm thành phiên riêng và ghi W mới.

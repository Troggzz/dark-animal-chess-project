# Bàn giao giữa các phiên

## 1. Trạng thái hiện tại (cập nhật cuối mỗi phiên)

- **Cập nhật lần cuối:** 2026-11-05, phiên `Acc1-2026-11-05`
- **Phase đang làm:** P1 (engine) song song với P0 (còn đọc Phụ lục B). Prototype hot-seat v0.8 chơi được; engine e0.1 có bàn, loài, kiểu dữ liệu (xem `docs/WORKLOG.md`).
- **Đã xong:** T0.1, T9.1, T1.1, T1.2, T1.3. Một phần: T2.2, T2.3, T3.1–T3.5, T4.4, T7.1–T7.3 (xem TASKS.md).
- **Việc kế tiếp nên làm:** T1.4 (bộ kiểm tra bất biến) hoặc T1.5 (lọc dữ liệu ẩn theo người xem); hai việc làm song song được. Hướng dẫn cụ thể: cuối mục W-003 trong `docs/WORKLOG.md`. Việc P0 còn lại: đọc Phụ lục B để đối chiếu T0.2; hỏi chủ dự án Q-25.
- **Điểm prototype đang lệch spec (không được coi là luật):** D-017 (timeout: hướng đã chốt, cách chọn chờ xác nhận), D-004 (chủ sở hữu không thấy quân úp của mình, trái S1 §6.1).
- **Đang chờ chủ dự án:** Q-01, Q-05, Q-06, Q-07, Q-08, Q-09, Q-10, Q-11 (cách tự chọn), Q-25 (Battle History sau trận có lộ quân úp đã loại không), Q-13, Q-14 (phần mất kết nối), Q-20. Đã chốt trong phiên đầu: Q-12, Q-12b, Q-15, Q-17, Q-18, Q-19, Q-21, Q-22, Q-23, Q-24.

## 1b. Giới hạn kiểm chứng (đọc trước khi tin vào hồ sơ)

- Prototype v0.4 **chưa chạy test tự động**; mới kiểm tra bằng đọc mã và chơi thử cơ bản. Có thể còn lỗi.
- Chưa đọc kỹ nội dung S1 §19–§22 (dữ liệu, lưu trữ, bảo mật, lỗi), Phụ lục A/B chi tiết, và hình trong S2. Các task T4.2, T5.x, T6.x, T8.x được lập từ tiêu đề và đoạn đã đọc, cần kiểm lại khi nhận việc.
- Link artifact claude.ai của prototype thuộc tài khoản cũ; tài khoản khác dùng file `src/prototype/dark-animal-chess.html` trong kho.
- Chủ dự án viết tiếng Việt; trả lời bằng tiếng Việt, giải thích ngắn gọn, nêu rõ chỗ nào là giả định.
- Spec tự mâu thuẫn ở điều kiện thắng (Q-19) và ở quân úp của chủ sở hữu (Q-16): đừng tự chọn, hỏi chủ dự án.

## 2. Nhật ký phiên

| Phiên | Ngày | Vai | Làm gì | Để lại gì |
|---|---|---|---|---|
| Acc1-2026-11-05 | 2026-11-05 | PM + R1 + R3 | Dựng prototype v0.1→v0.8, dựng bộ hồ sơ, bảng chiến đấu | Toàn bộ pack này |
| Acc1-2026-11-05 | 2026-11-05 | R2 | T1.1–T1.3: khung engine, kiểu dữ liệu, bàn cờ (W-001..W-003) | `package.json`, `tsconfig.json`, `src/engine/*`, `tests/*`, `docs/WORKLOG.md` |

(Thêm dòng mới ở cuối. Tên phiên: `Acc<số tài khoản>-<ngày>[-<số thứ tự>]`.)

## 3. Prompt mở phiên mới (dán vào Claude, kèm các file bên dưới)

**Đính kèm/dán trước:** `README.md`, `docs/WORKLOG.md` (ít nhất các mục W cuối cùng), `docs/HANDOFF.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, `docs/OPEN_QUESTIONS.md`, `docs/ROADMAP.md` (phase liên quan), và **chỉ các đoạn spec** liên quan task (theo `docs/00_SOURCES.md`, không dán cả file 4.800 dòng). Nếu làm việc trên prototype, đính kèm `src/prototype/dark-animal-chess.html`.

```
Bạn đang tiếp tục một dự án đã có hồ sơ. Bạn KHÔNG nhớ gì từ các cuộc chat trước; nguồn sự thật duy nhất là các file tôi đính kèm.

Việc cần làm: <ghi ID task, ví dụ T0.2>. Vai của bạn: <R1/R2/R3/R4/R5>. Tên phiên: <Acc?-ngày>.

Quy tắc bắt buộc:
1. Đọc README.md, HANDOFF.md, TASKS.md, DECISIONS.md trước, rồi tóm tắt cho tôi trong 5 dòng bạn hiểu dự án đang ở đâu. Chờ tôi xác nhận rồi mới làm.
2. Chỉ làm đúng task được giao. Không tự điền luật chưa chốt (spec §26); nếu thiếu luật, ghi vào OPEN_QUESTIONS và hỏi tôi.
3. Mỗi kết luận hoặc thay đổi phải gắn nguồn (S1 §…, D-…, TC…).
4. Khi còn khoảng 30% khả năng của phiên, hoặc khi tôi nói "chốt phiên", hoặc khi xong task: dừng việc đang làm và xuất đầy đủ các file đã sửa (TASKS.md, DECISIONS.md, OPEN_QUESTIONS.md, CHANGELOG.md, HANDOFF.md mục 1 và 2, cùng file mã/luật đã đổi), mỗi file trong một khối riêng có ghi tên đường dẫn, để tôi lưu vào kho.
5. Trong TASKS.md ghi rõ cột "Làm đến đâu": việc cuối đã xong và việc kế tiếp.
```

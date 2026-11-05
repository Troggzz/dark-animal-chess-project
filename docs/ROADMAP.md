# Lộ trình P0–P10

Khung lấy từ S1 §25 (L652), thêm P0 (chốt luật) vì S1 §26 yêu cầu không tự điền luật. Việc chi tiết nằm ở `TASKS.md`.

**Vai trò** (gán cho phiên Claude hoặc người):
- `R1 Luật` đọc spec, đối chiếu, soạn bảng luật và quyết định.
- `R2 Engine` viết logic game thuần (không giao diện).
- `R3 UI` giao diện và hình ảnh.
- `R4 Server` máy chủ, lưu trữ, đồng bộ.
- `R5 QA` viết và chạy test, đối chiếu spec.
- `PM` người chủ dự án: duyệt quyết định, cập nhật hồ sơ.

**Cỡ việc:** S ≤ 1 phiên chat, M = 2–3 phiên, L = 4+ phiên. Mỗi task trong TASKS.md được cắt để vừa 1 phiên.

---

## P0. Chốt luật và nguồn · R1 + PM · cỡ M
- **Nguồn:** S1 §26 (L665), §10.1, §13.2, §9, Phụ lục A (L696), Phụ lục B (L3638), Nhật ký V2.6.1 (L4826).
- **Bàn giao:** `OPEN_QUESTIONS.md` đóng hết hoặc ghi "hoãn"; `docs/RULES_TABLE.md` (bảng chiến đấu 8 tổ hợp, quy tắc chiếm ô); spec V2.7 hợp nhất.
- **Xong khi:** không còn Q ở trạng thái MỞ mà phase sau cần; mọi quyết định có dòng trong DECISIONS.
- **Phụ thuộc:** không.

## P1. Core Board & State · R2 · cỡ M
- **Nguồn:** S1 §2, §3, §6, §17, §18, §19.
- **Bàn giao:** kiểu dữ liệu (Team, Piece, Cell, GameState), bàn 6×7 vùng 3–1–3, bộ kiểm tra 14 bất biến (§17), bộ lọc thông tin ẩn theo người xem (§6.1, D-004).
- **Xong khi:** test bất biến chạy được; TC004–TC007 qua.
- **Phụ thuộc:** P0 (D-004 và Q-16).

## P2. Piece & Setup · R2 · cỡ M
- **Nguồn:** S1 §4, §5, §15; D-001, D-002, D-003.
- **Bàn giao:** random có seed (cùng seed ra cùng kết quả), tạo bộ 15 quân mỗi đội (tối thiểu 1 Chuột + 1 Voi, hai đội có thể khác nhau), chọn N, chia BOARD/QUEUE, đặt vị trí, kiểm tra hợp lệ §5.3.
- **Xong khi:** TC001–TC003, TC030, TC033–TC035 qua.
- **Phụ thuộc:** P1.

## P3. Turn & Movement · R2 · cỡ M
- **Nguồn:** S1 §7, §8, §9; D-005, D-006, D-007; Phụ lục A §10.2 (L1412).
- **Bàn giao:** quản lý lượt, đồng hồ 30s, lượt đầu bắt buộc triển khai rồi chọn MOVE/DEPLOY, MOVE (9 bước kiểm tra §7.2), DEPLOY (§8), giới hạn quân úp nếu Q-05 bật.
- **Xong khi:** TC008–TC012, TC019 qua; hành động bị từ chối không đổi trạng thái.
- **Phụ thuộc:** P2; Q-11, Q-17, Q-18.

## P4. Combat · R2 + R5 · cỡ L
- **Nguồn:** S1 §4.1, §4.2, §10, §10.1; Phụ lục A phần chiến đấu; RULES_TABLE.md (P0).
- **Bàn giao:** snapshot bất biến, thứ tự xử lý 12 bước, Chuột–Voi, cùng Rank, bảng úp/ngửa, chiếm ô.
- **Xong khi:** TC013–TC017 và mọi tổ hợp trong RULES_TABLE có test; đổi màu đội không đổi kết quả.
- **Phụ thuộc:** P3; Q-06, Q-07 phải chốt.

## P5. Secret Cards · R1 → R2 · cỡ L
- **Nguồn:** S1 §11; Q-08, Q-09.
- **Bàn giao:** mô hình lá (ID, chủ, điều kiện, thời điểm, mục tiêu, hiệu ứng, số lần, trạng thái ACTIVE/DISABLED/CONSUMED/PENDING), phân bổ, kích hoạt, vô hiệu hóa, chống kích hoạt lặp.
- **Xong khi:** TC018, TC022 qua; lá của đối thủ không lộ.
- **Phụ thuộc:** P4; danh sách lá phải chốt trước khi viết code.

## P6. Effect Queue · R2 · cỡ L
- **Nguồn:** S1 §12, §14; Nhật ký V2.6.1 điểm 5–6; Q-10.
- **Bàn giao:** hàng đợi sự kiện, Kéo Theo (chỉ chọn quân sống trên bàn của đội tấn công; không dây chuyền), Nổ Lan, chống vòng lặp.
- **Xong khi:** TC018–TC024, TC027 qua.
- **Phụ thuộc:** P5.

## P7. Victory & Match Flow · R2 · cỡ M
- **Nguồn:** S1 §13; D-009, D-010, D-016; Q-12.
- **Bàn giao:** kiểm tra thắng/thua/hòa sau Effect Queue, đầu hàng, timeout, Battle History (ghi cả hành động bị từ chối, xem/không xem sau trận).
- **Xong khi:** TC025–TC027, TC036–TC040 qua.
- **Phụ thuộc:** P6; Q-12.

## P8. Persistence & Multiplayer · R4 · cỡ L
- **Nguồn:** S1 §15, §20, §21, §22; Q-13, Q-14.
- **Bàn giao:** server giữ trạng thái chính thức, client chỉ gửi hành động; actionId chống trùng; state version chống xung đột; lưu và khôi phục; reconnect; replay từ seed.
- **Xong khi:** TC028–TC032 qua; server không bao giờ gửi dữ liệu úp/lá của đối phương xuống client.
- **Phụ thuộc:** P7 (engine ổn định).

## P9. UI/UX · R3 · cỡ L (có thể làm song song từ P3)
- **Nguồn:** S1 §16; S2 (hình minh họa).
- **Bàn giao:** bàn cờ, quân úp/ngửa, bộ đếm, lượt và đồng hồ, lịch sử, ô gợi ý, phản hồi chấp nhận/từ chối kèm lý do, hình ảnh thật lấy từ S2, chạy tốt trên điện thoại.
- **Xong khi:** mọi mục §16 hiển thị; không có dữ liệu bí mật trong DOM.
- **Phụ thuộc:** engine từng phase.

## P10. QA & Release · R5 · cỡ M
- **Nguồn:** S1 §23 (TC001–TC040), §24.
- **Bàn giao:** bộ test tự động đủ TC001–TC040, báo cáo đối chiếu spec, replay các ván, cân bằng loài/lá, bản phát hành thử.
- **Xong khi:** 40/40 TC qua; không còn Q mở bắt buộc.
- **Phụ thuộc:** P1–P9.

---

## Thứ tự đề xuất
`P0 → P1 → P2 → P3` song song với `P9 (bản hot-seat)` → `P4` → chơi thử với người thật → `P5 → P6 → P7` → `P8` → `P10`.
Lý do: P5, P6, P8 tốn công nhất và phụ thuộc nhiều vào các luật chưa chốt.

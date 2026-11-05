# Bảng việc

Trạng thái: `TODO` · `DOING` · `DONE` · `PARTIAL` (làm một phần, ghi rõ đến đâu) · `BLOCKED` (ghi chờ Q nào).
**Khi nhận việc:** đổi sang `DOING`, điền cột Phiên (ví dụ `Acc2-2026-11-06`). **Khi dừng:** ghi vào cột "Làm đến đâu" việc cuối cùng đã xong và việc kế tiếp. Không xóa dòng.
Bằng chứng = file/commit/test chứng minh việc xong.

| ID | Phase | Việc | Nguồn | Vai | Phiên | Trạng thái | Làm đến đâu / Bằng chứng |
|---|---|---|---|---|---|---|---|
| T0.1 | P0 | Dựng bộ hồ sơ dự án và quy trình bàn giao | D-015 | PM | Acc1-2026-11-05 | DONE | Bộ file này |
| T0.2 | P0 | Đọc Phụ lục A/B, lập bảng chiến đấu 8 tổ hợp úp/ngửa × 2 đội vào `docs/RULES_TABLE.md` | S1 §10, L696, L3638; Q-06 | R1 | | PARTIAL | Bản nháp docs/RULES_TABLE.md đã duyệt C1–C3 (D-021, D-022); còn Q-24 và đọc Phụ lục B để đối chiếu nốt |
| T0.3 | P0 | Chốt quy tắc chiếm ô từng trường hợp | S1 §10.1; Q-07 | R1+PM | | PARTIAL | Spec A §14 đã nêu quy tắc chiếm ô (xem RULES_TABLE mục 2); Q-21, Q-22 đã chốt (D-021, D-022); gần xong, chỉ cần PM xác nhận tổng thể |
| T0.4 | P0 | Chốt điều kiện thắng/thua tổng quát | S1 §13.2; Q-12; TC025 | PM | | PARTIAL | D-019 đã chốt thắng/thua/đầu hàng; còn Q-20 (hàng chờ có tính là "còn quân" không) |
| T0.5 | P0 | Chốt timeout, đội đi trước, đầu hàng, mất kết nối, thời gian reconnect | S1 §9, §22, §26; Q-11, 12b, 13, 14 | PM | | PARTIAL | Timeout hướng D-017; đi trước D-020 (ngẫu nhiên); đầu hàng D-019; còn mất kết nối, reconnect (Q-13, Q-14) |
| T0.6 | P0 | Liệt kê toàn bộ Lá Bí Mật: tên, điều kiện, thời điểm, hiệu ứng | S1 §11; Q-08 | R1+PM | | TODO | |
| T0.7 | P0 | Chốt luật Nổ Lan và ưu tiên với Kéo Theo | S1 §12, §14; Q-10 | R1+PM | | TODO | |
| T0.8 | P0 | Chốt luật di chuyển đặc biệt theo loài; giới hạn 4 quân úp sân đối phương | S1 §7.2 bước 8; Q-05, Q-15 | PM | | PARTIAL | Q-15 đã chốt (D-018); còn Q-05 |
| T0.9 | P0 | Hợp nhất mọi quyết định thành spec V2.7 (sửa cả §6.1 theo D-004, §5.2 theo D-001) | DECISIONS; Q-16 | R1 | | TODO | Phụ thuộc T0.2–T0.8 |
| T1.1 | P1 | Dựng repo, TypeScript, bộ test node:test (D-024) | SETUP | R2 | Acc1-2026-11-05 | DONE | W-001; `npm test` chạy được |
| T1.2 | P1 | Định nghĩa kiểu: Team, Species, Piece (3 nhóm trạng thái độc lập), GameState (không có Cell riêng, D-026) | S1 §6, §19 | R2 | Acc1-2026-11-05 | DONE | W-002; `src/engine/types.ts`, `species.ts`, `state.ts`; typecheck sạch |
| T1.3 | P1 | Board Engine: ô A–F × 1–7, vùng 3–1–3, ID ô | S1 §3 | R2 | Acc1-2026-11-05 | DONE | W-003; `src/engine/board.ts`; 9/9 test qua. Prototype S3 vẫn là bản riêng, chưa dùng engine |
| T1.4 | P1 | Bộ kiểm tra 14 bất biến | S1 §17; TC004–007 | R2 | | TODO | VIỆC KẾ TIẾP. Hướng dẫn chi tiết ở cuối WORKLOG W-003 (đọc S1 L433–452) |
| T1.5 | P1 | Hàm "góc nhìn người xem" lọc dữ liệu ẩn (D-004) | S1 §6.1; D-004 | R2 | | TODO | Làm song song được với T1.4 (file riêng `view.ts`). Theo D-004: quân úp ẩn với CẢ HAI bên; chỉ quân ngửa lộ loài/Rank |
| T2.1 | P2 | Random Engine có seed (PRNG tất định) | S1 §15; TC030 | R2 | | TODO | Prototype dùng Math.random, chưa có seed |
| T2.2 | P2 | Tạo bộ 15 quân/đội, min 1 Chuột + 1 Voi, hai đội độc lập | D-001; S1 §5.2; TC034 | R2 | | PARTIAL | Prototype v0.4 đã làm logic này (random đều); chưa có seed, chưa có engine; Q-01 mở |
| T2.3 | P2 | Chọn N (8–10), chia BOARD/QUEUE, đặt vị trí trong sân nhà | D-002, D-003; S1 §5.1, §5.3; TC001–003, 033, 035 | R2 | | PARTIAL | Prototype v0.4 làm được; chưa có kiểm tra §5.3 dạng test |
| T2.4 | P2 | Hàm kiểm tra hợp lệ khi khởi tạo §5.3 | S1 §5.3 | R2 | | TODO | |
| T3.1 | P3 | Turn Manager: luân phiên, 1 hành động chính/lượt, không chuyển lượt khi chưa xong | S1 §9 | R2 | | PARTIAL | Prototype có luân phiên; chưa có transaction |
| T3.2 | P3 | Lượt đầu bắt buộc DEPLOY, từ lượt 2 chọn MOVE/DEPLOY | D-006; Q-18 | R2 | | PARTIAL | Luật đã xác nhận (D-006); prototype làm đúng, còn viết lại trong engine |
| T3.3 | P3 | DEPLOY: rút 1 quân hàng chờ, đặt ô trống, luôn ngửa | D-005, D-007; S1 §8; TC010, 019; Q-17 | R2 | | PARTIAL | Luật đã xác nhận (D-005); prototype làm đúng, còn viết lại trong engine |
| T3.4 | P3 | Đồng hồ 30s + xử lý timeout theo luật đã chốt | S1 §9; D-011; Q-11 | R2 | | PARTIAL | Prototype v0.5: hệ thống tự chọn hành động ngẫu nhiên (D-017, cách chọn chờ xác nhận); chưa vào engine |
| T3.5 | P3 | MOVE: 9 bước kiểm tra, lật ngửa, từ chối không đổi trạng thái | S1 §7, §7.2; TC008, 009, 011, 012 | R2 | | PARTIAL | Prototype có 1 ô 4 hướng + lật ngửa; chưa tách bước kiểm tra, chưa giới hạn quân úp |
| T4.1 | P4 | Snapshot bất biến trước chiến đấu | S1 §10 | R2 | | TODO | |
| T4.2 | P4 | Combat Engine theo bảng RULES_TABLE (12 bước) | S1 §10; T0.2 | R2 | | BLOCKED | Chờ T0.2 |
| T4.3 | P4 | Quy tắc chiếm ô | S1 §10.1; T0.3 | R2 | | BLOCKED | Chờ T0.3 |
| T4.4 | P4 | Chuột–Voi và cùng Rank | S1 §4.1, §4.2; TC013–015 | R2 | | PARTIAL | Prototype đã có hai luật này; hành vi úp/ngửa theo D-022 đã làm ở v0.7 |
| T4.5 | P4 | Test mọi tổ hợp úp/ngửa × Đỏ/Xanh (đổi màu không đổi kết quả) | S1 §10.1 cuối | R5 | | TODO | |
| T5.1 | P5 | Mô hình dữ liệu Lá Bí Mật + 4 trạng thái | S1 §11 | R2 | | BLOCKED | Chờ T0.6 |
| T5.2 | P5 | Phân bổ lá theo Rank | S1 §11; Q-09 | R2 | | BLOCKED | Chờ Q-09 |
| T5.3 | P5 | Kích hoạt, vô hiệu hóa, chống kích hoạt lặp | S1 §11; TC018, 022 | R2 | | BLOCKED | |
| T6.1 | P6 | Effect Queue + chống xử lý event hai lần | S1 §14; §17 mục 12 | R2 | | TODO | |
| T6.2 | P6 | Kéo Theo (mục tiêu hợp lệ, lật quân úp, vô hiệu lá, không dây chuyền) | S1 §12; V2.6.1 điểm 5–6; TC018–024 | R2 | | TODO | |
| T6.3 | P6 | Nổ Lan và thứ tự ưu tiên | T0.7 | R2 | | BLOCKED | Chờ T0.7 |
| T7.1 | P7 | Victory Engine (hòa đã chốt; thắng/thua theo T0.4) | S1 §13; TC025–027, 036 | R2 | | PARTIAL | Luật thắng/thua đã chốt D-019 (còn Q-20); prototype làm theo cách hiểu "hết quân trên bàn" |
| T7.2 | P7 | Đầu hàng, timeout theo luật chốt | T0.5 | R2 | | PARTIAL | Đầu hàng = thua (D-019); prototype đã có nút đầu hàng |
| T7.3 | P7 | Battle History: ghi mọi sự kiện kể cả bị từ chối; xem/không xem sau trận; client không sửa được | D-016; TC037–040 | R2 | | PARTIAL | Cần theo D-023 (không lộ quân úp bị loại) và Q-25. Prototype có nhật ký 8 dòng, chưa lưu, chưa ghi hành động bị từ chối |
| T8.1 | P8 | Chọn công nghệ server và dựng khung (SETUP.md) | S1 §18, §20 | R4 | | TODO | |
| T8.2 | P8 | actionId chống trùng + state version | S1 §17; TC028, 029 | R4 | | TODO | |
| T8.3 | P8 | Lưu, khôi phục, replay từ seed | S1 §20, §15; TC030, 032 | R4 | | TODO | |
| T8.4 | P8 | Bảo mật: không gửi dữ liệu ẩn, chống client giả | S1 §21; TC031 | R4 | | TODO | Đọc §21 trước khi làm |
| T8.5 | P8 | Reconnect và mất kết nối | S1 §22; Q-13, 14 | R4 | | TODO | |
| T9.1 | P9 | Giao diện hot-seat cơ bản | S1 §16 | R3 | Acc1-2026-11-05 | DONE | `src/prototype/dark-animal-chess.html` |
| T9.2 | P9 | Trích hình từ S2, đưa vào giao diện | S2 | R3 | | TODO | |
| T9.3 | P9 | Hiệu ứng lật, đánh nhau, thông báo từ chối kèm lý do | S1 §16 | R3 | | TODO | |
| T9.4 | P9 | Màn hình bắt đầu/kết thúc, xem lịch sử | TC037, 038 | R3 | | TODO | |
| T9.5 | P9 | Tối ưu điện thoại | | R3 | | TODO | |
| T9.6 | P9 | Chế độ chơi với máy (AI đơn giản) | | R3 | | TODO | Ngoài spec, cần PM duyệt thêm vào phạm vi |
| T10.1 | P10 | Bộ test tự động đủ TC001–TC040 | S1 §23.1 | R5 | | TODO | |
| T10.2 | P10 | Báo cáo đối chiếu spec ↔ code | S1 toàn bộ | R5 | | TODO | |
| T10.3 | P10 | Cân bằng loài/lá, phát hành thử | S1 §24 | PM+R5 | | TODO | |

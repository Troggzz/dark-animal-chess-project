# Nhật ký quyết định

Trạng thái: `XÁC NHẬN` (chủ dự án đã chốt) · `TỪ SPEC` (spec đã chốt, S1 ghi rõ) · `DIỄN GIẢI` (mình hiểu ý chủ dự án, chờ xác nhận) · `GIẢ ĐỊNH` (tạm chọn để chạy thử, spec chưa chốt) · `THAY BẰNG D-xxx`.
Quy tắc: chỉ thêm dòng mới ở cuối; quyết định cũ bị đổi thì sửa cột Trạng thái, không xóa.

| ID | Ngày | Quyết định | Nguồn | Trạng thái | Ảnh hưởng |
|---|---|---|---|---|---|
| D-001 | 2026-11-05 | Mỗi đội đúng 15 quân; mỗi đội có tối thiểu 1 Chuột và 1 Voi; **cơ cấu loài của hai đội KHÔNG bắt buộc giống nhau** (có thể giống hoặc khác) | U-2026-11-05; S1 §5.2 | XÁC NHẬN | P2, T2.2; trả lời Q-03 |
| D-002 | 2026-11-05 | Quân úp ban đầu trên bàn được lấy từ chính bộ 15 quân của đội đó; phần còn lại là hàng chờ | U-2026-11-05; S1 §5.1 | XÁC NHẬN | P2, T2.3; trả lời Q-02 |
| D-003 | 2026-11-05 | Số quân trên bàn N từ 8–10, hai đội bằng nhau; hàng chờ = 15 − N | S1 §5.1, §26, Nhật ký V2.6.1 điểm 2–3 | TỪ SPEC | P2 |
| D-004 | 2026-11-05 | Mọi quân úp đều ẩn với **tất cả**, kể cả chủ sở hữu; chỉ lộ khi di chuyển, chiến đấu, hoặc triển khai | U-2026-11-05 (lượt chat 2) | XÁC NHẬN (xác nhận lại lần 2: quân trên bàn và hàng chờ đều ẩn với cả hai bên cho đến khi di chuyển hoặc đặt xuống), cần sửa spec, hòa giải với S1 §6.1 ("xem dữ liệu bí mật thuộc quyền của mình") | P1, P9 |
| D-005 | 2026-11-05 | Hàng chờ cũng là quân chưa lộ; Triển khai = rút 1 quân từ hàng chờ rồi đặt vào ô trống, quân lật ngửa | U-2026-11-05; S1 §8 | XÁC NHẬN (rút ngẫu nhiên, không biết trước loài) | P3; đóng Q-17 |
| D-006 | 2026-11-05 | Lượt đầu của mỗi đội bắt buộc DEPLOY; từ lượt 2 của đội đó người chơi chọn MOVE hoặc DEPLOY | U-2026-11-05; S1 Phụ lục A §10.2 (L1412) | XÁC NHẬN (chủ dự án xác nhận "lượt 2" là lượt 2 của từng đội) | P3; đóng Q-18 |
| D-007 | 2026-11-05 | Mỗi lượt chỉ 1 hành động chính; DEPLOY chỉ 1 quân, xong mới cập nhật hàng chờ và chuyển lượt | S1 §8, §9; U-2026-11-05 | TỪ SPEC + XÁC NHẬN | P3 |
| D-008 | 2026-11-05 | Chuột thắng Voi ở mọi trạng thái, tấn công hay phòng thủ; Chuột giữ nguyên ô | S1 §4.1; TC013, TC014 | TỪ SPEC | P4 |
| D-009 | 2026-11-05 | Hòa khi cả hai đội hết quân trên bàn (hàng chờ không tính), kiểm tra sau Effect Queue | S1 §13.1; TC026, TC036 | TỪ SPEC | P7 |
| D-010 | 2026-11-05 | Prototype dùng "hết quân trên bàn = thua" | S3 | THAY BẰNG D-019 | P7; Q-12 |
| D-011 | 2026-11-05 | Prototype: hết giờ 30s thì mất lượt | S3 | THAY BẰNG D-017 | P3; Q-11 |
| D-012 | 2026-11-05 | Prototype: Đỏ đi trước | S3 | THAY BẰNG D-020 | P3; Q-12b |
| D-013 | 2026-11-05 | Prototype chiến đấu: úp đấu úp thì lật cả hai; phòng thủ thắng khi úp thì giữ úp; tấn công thắng thì chiếm ô | S3; S1 §10.1 | THAY BẰNG D-021, D-022 (phần úp/ngửa); chiếm ô vẫn theo spec | P4; Q-06, Q-07 |
| D-014 | 2026-11-05 | Prototype v0.x chỉ chơi chung một máy (hot-seat), chưa có Lá Bí Mật, Kéo Theo, Nổ Lan, lưu trận, server | S3 | PHẠM VI | P5–P8 |
| D-015 | 2026-11-05 | Làm việc qua nhiều tài khoản Claude: dùng bộ hồ sơ này làm nguồn sự thật, bàn giao bằng `HANDOFF.md` | U-2026-11-05 | XÁC NHẬN | WORKFLOW |
| D-016 | 2026-11-05 | Spec V2.6.1 thêm Battle History: server ghi mọi diễn biến kể cả hành động bị từ chối; sau trận người chơi chọn xem hoặc không | S1 Nhật ký V2.6.1 điểm 8; TC037–TC040 | TỪ SPEC | P7 |
| D-017 | 2026-11-05 | Hết giờ 30s: hệ thống tự chọn hành động thay người chơi (không mất lượt, không phạt) | U-2026-11-05 ("sẽ tự chọn"); S1 §9 | DIỄN GIẢI: chưa nói cách chọn; prototype v0.5 chọn ngẫu nhiên một hành động hợp lệ (lượt đầu của đội thì bắt buộc triển khai) | T3.4, T7.2; Q-11 còn mở phần cách chọn |
| D-018 | 2026-11-05 | Không có luật di chuyển đặc biệt theo loài; mọi loài đi 1 ô, 4 hướng | U-2026-11-05; S1 §7 | XÁC NHẬN | T3.5; đóng Q-15 |
| D-019 | 2026-11-05 | Thua khi **hết quân** của đội mình, hoặc khi **đầu hàng**; đối phương thắng. Cả hai cùng hết quân thì hòa (D-009) | U-2026-11-05; S1 §13.1, §13.2; TC025 | XÁC NHẬN phần thắng/thua; DIỄN GIẢI "hết quân" = hết quân trên bàn (hàng chờ không tính, theo S1 §13.1), xem Q-20 | T0.4, T7.1, T7.2; đóng Q-12, Q-19 |
| D-020 | 2026-11-05 | Đội đi trước được chọn ngẫu nhiên | U-2026-11-05 | XÁC NHẬN | T3.1; đóng Q-12b |
| D-021 | 2026-11-05 | Quân di chuyển, kể cả khi tấn công, luôn lật ngửa trước khi đánh; vì vậy không có trường hợp "quân tấn công úp" (Phụ lục A D, E và §14.2 phần "tiếp tục úp" không áp dụng) | S1 §7.1; U-2026-11-05 (lượt chat 2: "chỉ khi di chuyển nó mới lật"); RULES_TABLE C1 | XÁC NHẬN (suy ra từ lựa chọn D-022) | T4.2; đóng Q-21 |
| D-022 | 2026-11-05 | Úp đánh úp: **chỉ quân tấn công lộ**. Quân bị đánh nếu thắng thì giữ nguyên ô và vẫn úp; nếu thua thì bị loại. Không lật cả hai (trường hợp D bị bỏ) | U-2026-11-05 ("cách 2"); S1 Phụ lục A §13.3, 13.8, 13.9 | XÁC NHẬN | T4.2; đóng Q-22; chấp nhận Q-23 |
| D-023 | 2026-11-05 | Quân **úp** bị loại thì **không lộ** loài/Rank cho đối thủ; chỉ quân ngửa mới lộ, trong mọi trường hợp (kể cả Chuột–Voi) | U-2026-11-05; S1 Phụ lục A §13.3 ("không tiết lộ danh tính"); RULES_TABLE C4, C5 | XÁC NHẬN (còn Q-25: Battle History sau trận có hiện không) | T4.2, T7.3, T9.3; đóng Q-24 |
| D-024 | 2026-11-05 | Bộ test dùng `node:test` có sẵn của Node, chạy file `.ts` trực tiếp (type stripping, Node ≥ 22.18); kiểm tra kiểu bằng `tsc --noEmit`. Không dùng Vitest ở giai đoạn này. Không dùng `enum`/`namespace` | W-001; thay khuyến nghị Vitest trong SETUP | XÁC NHẬN của Claude phiên Acc1 (chưa hỏi chủ dự án; đổi lại được) | T1.1; mọi test |
| D-025 | 2026-11-05 | Toạ độ trong code 0-based `{x:0..5, y:0..6}`; ID hiển thị `A1`..`F7` (cột A–F, hàng = y+1); y tăng về phía sân Xanh | S1 §3; S1 §19 (mẫu `{x:0,y:0}`) | GIẢ ĐỊNH thiết kế (spec không nói rõ gốc toạ độ) | T1.3 và mọi module dùng Position |
| D-026 | 2026-11-05 | Một nguồn dữ liệu chuẩn: hàng chờ = quân có `locationType==='QUEUE'`; ô có quân = suy ra từ `position` của quân ALIVE+BOARD. Không có mảng `queue` hay `cells` riêng trong GameState | S1 §19 (cuối mục: phải chọn một nguồn duy nhất) | GIẢ ĐỊNH thiết kế | T1.2, T1.4 |

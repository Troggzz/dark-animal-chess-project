# Điểm cần xác nhận

Nguồn: S1 §26 (L665) + điểm phát sinh trong quá trình làm. Khi chốt: điền cột "Chốt bởi", thêm dòng vào DECISIONS.md.

| ID | Nội dung | Nguồn | Trạng thái | Chốt bởi | Cần cho |
|---|---|---|---|---|---|
| Q-01 | Cách random số lượng từng loài ngoài Chuột và Voi (đều nhau hay có trọng số?) | S1 §26 | MỞ (prototype đang random đều 1/9) | | T2.2 |
| Q-02 | Vị trí BOARD/QUEUE của Chuột và Voi lúc khởi tạo | S1 §26 | ĐÃ TRẢ LỜI một phần | D-002 (lấy từ bộ 15, chia ngẫu nhiên) | T2.3 |
| Q-03 | Cơ cấu loài có giống nhau giữa hai đội không | S1 §26 | ĐÃ CHỐT | D-001 | T2.2 |
| Q-04 | Số quân trên bàn khởi tạo | S1 §26 | ĐÃ CHỐT | D-003 | |
| Q-05 | Giới hạn 4 quân úp ở sân đối phương có bật ở mọi chế độ không | S1 §26 | MỞ (prototype không cần vì quân đi là lật ngửa) | | T3.5 |
| Q-06 | Bảng chiến đấu đủ 8 tổ hợp úp/ngửa × hai đội | S1 §26 | MỞ, cần đối chiếu Phụ lục A (V2.5) | | T0.2, T4.2 |
| Q-07 | Quy tắc chiếm ô từng trường hợp | S1 §26, §10.1 | MỞ | | T0.3, T4.3 |
| Q-08 | Danh sách và điều kiện toàn bộ Lá Bí Mật | S1 §26, §11 | MỞ | | T0.6, P5 |
| Q-09 | Phân bổ Lá Bí Mật theo Rank (giữ quy tắc V2.5) | S1 §26 | MỞ, cần xác nhận cấu hình | | T5.2 |
| Q-10 | Luật Nổ Lan và thứ tự ưu tiên với Kéo Theo | S1 §26 | MỞ | | T0.7, P6 |
| Q-11 | Xử lý timeout 30s (mất lượt, tự chọn hành động, hay phạt) | S1 §26, §9 | MỘT PHẦN: hệ thống tự chọn hành động; còn hỏi cách chọn (ngẫu nhiên, ưu tiên gì) | D-017 | T0.5, T3.4 |
| Q-12 | Điều kiện thắng/thua tổng quát | S1 §13.2 | ĐÃ CHỐT | D-019 | T0.4, P7 |
| Q-12b | Đội đi trước và cách chọn | S1 §26 | ĐÃ CHỐT | D-020 | T0.5 |
| Q-13 | Thời gian cho phép kết nối lại | S1 §26 | MỞ | | P8 |
| Q-14 | Điều kiện đầu hàng và xử lý mất kết nối | S1 §26 | MỘT PHẦN: đầu hàng thì thua (D-019); còn xử lý mất kết nối | D-019 | P8 |
| Q-15 | Luật di chuyển đặc biệt theo loài (nếu có) | S1 §26 | ĐÃ CHỐT | D-018 | T0.8 |
| Q-16 | Hòa giải D-004 với S1 §6.1: chủ sở hữu có xem được quân úp của mình không (chủ dự án đã nói không) | S1 §6.1 | CẦN SỬA SPEC (ý muốn đã xác nhận) | D-004 | T0.9 |
| Q-17 | Triển khai: rút ngẫu nhiên 1 quân úp từ hàng chờ, hay người chơi chọn quân (và có biết loài trước khi đặt không)? | D-005 | ĐÃ CHỐT | D-005 | T3.3 |
| Q-18 | "Từ lượt thứ 2" là lượt 2 của từng đội (đang dùng) hay lượt 2 của cả ván? | D-006 | ĐÃ CHỐT | D-006 | T3.2 |
| Q-19 | Hai chỗ trong S1 lệch nhau về điều kiện thắng: L20 nói bản V2.5.1 có "điều kiện thắng theo số quân trên bàn", còn §13.2 (L363) nói thắng/thua tổng quát chưa chốt. Lấy chỗ nào làm chuẩn? | S1 L20 vs §13.2 | ĐÃ CHỐT | D-019 | T0.4 |
| Q-20 | "Hết quân" để thua tính thế nào: chỉ quân trên bàn (hàng chờ không tính, như S1 §13.1), hay cả quân trong hàng chờ? Nếu hết quân trên bàn nhưng hàng chờ còn, đội đó thua ngay hay được triển khai tiếp? | S1 §13.1, TC025; D-019 | MỞ (prototype: hết quân trên bàn là thua ngay) | | T0.4, T7.1 |
| Q-21 | Quân tấn công có luôn ngửa khi đánh không (S1 §7.1) hay có thể "tiếp tục úp" (Phụ lục A D, E, §14.2)? | RULES_TABLE C1 | ĐÃ CHỐT | D-021 | T4.2 |
| Q-22 | Úp đánh úp: quân phòng thủ có bị lật không (trường hợp D) hay giữ úp nếu thắng (trường hợp A/F)? | RULES_TABLE C2 | ĐÃ CHỐT (cách 2) | D-022 | T4.2 |
| Q-23 | Phòng thủ úp thắng mà vẫn úp: chấp nhận người tấn công suy ra quân úp mạnh hơn? | RULES_TABLE C3 | ĐÃ CHỐT (chấp nhận, theo cách 2) | D-022 | T4.2 |
| Q-24 | Quân bị loại (kể cả quân úp) có lộ loài/Rank cho đối thủ không? | RULES_TABLE C4 | ĐÃ CHỐT | D-023 | T4.2, T7.3 |
| Q-25 | Battle History xem sau trận (S1 §22.4, L2290): có hiện loài/Rank của quân úp đã bị loại không, hay vẫn giữ ẩn như trong trận? | D-023; S1 L2290–2305; TC038 | MỞ (nhỏ, cần trước khi làm T7.3) | | T7.3, T9.4 |

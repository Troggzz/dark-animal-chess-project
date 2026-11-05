# Bảng chiến đấu (task T0.2) · ĐÃ DUYỆT C1–C4 (D-021, D-022, D-023)

Nguồn đã đọc: S1 §4.1, §4.2, §7.1, §10, §10.1 · Phụ lục A §13 (L1640–L1865, các trường hợp A–H và bảng tổng hợp L1820), §14 chiếm ô (L1867–L1890), nguyên tắc ưu tiên §13.12.
Chưa đọc: Phụ lục B (V2.5.1) và các đoạn khác của Phụ lục A; nếu có chỗ nào nói khác thì cần đối chiếu thêm.

## 1. Thứ tự quyết định kết quả (không phụ thuộc đội)
1. **Chuột–Voi** (S1 §4.1): Chuột thắng Voi mọi trạng thái, tấn công hay phòng thủ. Voi bị loại, Chuột **giữ nguyên ô**.
2. **So Rank**: cao thắng thấp.
3. **Cùng Rank** (§4.2): cả hai bị loại, không ai chiếm ô, hai ô được giải phóng.
Màu đội không được đổi kết quả (S1 §10.1, đoạn cuối).

## 2. Kết quả và chiếm ô theo trạng thái úp/ngửa (S1 Phụ lục A §13, §14)
Trạng thái tính **trước khi đi**.

| Mã | Quân tấn công | Quân phòng thủ | Tấn công thắng | Phòng thủ thắng | Cùng Rank | Nguồn |
|---|---|---|---|---|---|---|
| S1 | ngửa | ngửa | Phòng thủ bị loại; tấn công chiếm ô, vẫn ngửa | Tấn công bị loại; phòng thủ giữ ô | Cả hai bị loại | A §13.4, 13.5, 13.10 |
| S2 | ngửa | úp | Phòng thủ bị loại; tấn công chiếm ô, ngửa | Tấn công bị loại; phòng thủ giữ ô **và vẫn úp** (không lộ) | Cả hai bị loại | A §13.3, 13.8, 13.9 |
| S3 | úp | ngửa | Phòng thủ bị loại; tấn công chiếm ô **và vẫn úp** | Tấn công bị loại; phòng thủ giữ ô | Cả hai bị loại | A §13.7, §14.2 cuối |
| S4 | úp | úp | **Lật cả hai** rồi xử lý; quân sống sót chuyển ngửa | (như bên trái) | Cả hai bị loại | A §13.6 |

Ngoại lệ chiếm ô: Chuột thắng Voi thì Chuột không chiếm ô (A §14.5, S1 §4.1). Quân phòng thủ thắng thì không bao giờ tự di chuyển (A §14.3).

## 3. Ánh xạ 8 tổ hợp (đội tấn công × trạng thái) sang các trường hợp A–H của spec

| # | Tấn công | Phòng thủ | Mã ở mục 2 | Chữ cái trong spec | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đỏ ngửa | Xanh ngửa | S1 | B | |
| 2 | Đỏ ngửa | Xanh úp | S2 | F | |
| 3 | Đỏ úp | Xanh ngửa | S3 | E | |
| 4 | Đỏ úp | Xanh úp | S4 | D | D dùng chung cho hai đội |
| 5 | Xanh ngửa | Đỏ ngửa | S1 | C và H | **Trùng nhau** |
| 6 | Xanh ngửa | Đỏ úp | S2 | A và G | **Trùng nhau** |
| 7 | Xanh úp | Đỏ ngửa | S3 | không có | G tự nhận "đối xứng với E" nhưng nội dung lại là Xanh ngửa đánh Đỏ úp |
| 8 | Xanh úp | Đỏ úp | S4 | D | |

Vì màu đội không đổi kết quả nên 8 tổ hợp chỉ còn 4 kết quả (S1–S4). Nhãn A–H trong spec bị trùng và thiếu; cần dọn lại khi lập spec V2.7 (T0.9).

## 4. Chỗ spec mâu thuẫn hoặc chưa nói (cần chủ dự án quyết)

| Mã | Vấn đề | Nguồn | Hướng đề xuất |
|---|---|---|---|
| C1 (Q-21) | **Quân tấn công có luôn ngửa khi đánh không?** S1 §7.1 bắt buộc lật ngay khi bắt đầu mọi hành động di chuyển hợp lệ. Nhưng Phụ lục A D, E và §14.2 vẫn nói quân tấn công "tiếp tục úp". Hai nơi không thể cùng đúng | S1 §7.1 vs A §13.6, 13.7, 14.2 | Theo §7.1 (cũng khớp lời bạn "chỉ khi di chuyển nó mới lật"): quân tấn công luôn ngửa, S3 và S4 không xảy ra |
| C2 (Q-22) | Nếu theo C1, khi quân úp tấn công quân **úp**: quân phòng thủ có bị lật không? Trường hợp D nói lật cả hai; trường hợp A/F/G nói quân phòng thủ thắng thì vẫn úp | A §13.6 vs 13.3, 13.8 | Phải chọn một. Đây là tình huống **xảy ra thường xuyên nhất**, vì đầu ván mọi quân đều úp |
| C3 (Q-23) | Phòng thủ úp thắng mà vẫn úp: người tấn công vẫn biết quân úp mạnh hơn quân mình. Có chấp nhận lộ thông tin đó không? | A §13.3, 13.8, 13.9 | Giữ theo spec nếu bạn đồng ý |
| C4 (Q-24) | Quân bị loại có lộ loài/Rank cho đối thủ không (kể cả quân úp bị loại)? Spec chỉ nói Battle History ghi "quân bị loại và nguyên nhân" | S1 L2305 | Chưa nói rõ |
| C5 | Chuột phòng thủ úp bị Voi đánh: Chuột có lộ không? | S1 §4.1 | Chưa nói rõ (nhập vào C3/C4) |

## 5. Đối chiếu prototype v0.6 với bảng này

| Hành vi | Prototype | Theo spec |
|---|---|---|
| Quân đi luôn lật ngửa trước khi đánh | Có | Khớp S1 §7.1 |
| Tấn công úp đánh phòng thủ úp: lật cả hai | Không còn (v0.7 đã bỏ) | Khớp D-022 (chỉ quân tấn công lộ) |
| Phòng thủ úp thắng: vẫn úp | Có | Khớp A §13.3 |
| Chuột–Voi, cùng Rank, chiếm ô | Có | Khớp S1 §4.1, §4.2, A §14 |
| Quân bị loại bị lộ | Không lộ (v0.8);  trong nhật ký khi quân úp bị loại; quân úp còn sống thì nhật ký ghi "quân úp" | **Chờ C4 (Q-24)** |

## 6. Test cần viết sau khi duyệt (T4.5)
- Mỗi hàng S1–S4 × (tấn công thắng, phòng thủ thắng, cùng Rank) × (Đỏ tấn công, Xanh tấn công) và kiểm tra kết quả giống nhau.
- Chuột–Voi ở cả bốn trạng thái, cả hai chiều tấn công (TC013, TC014).
- Quân thắng chiếm ô đúng; quân phòng thủ thắng không dời ô; Chuột không chiếm ô Voi (TC016, TC017).

## 7. Quyết định của chủ dự án (2026-11-05)
- C1 → quân tấn công luôn ngửa khi đánh (D-021). Hàng S3, S4 ở mục 2 không xảy ra; còn S1 và S2.
- C2 → cách 2: chỉ quân tấn công lộ, quân bị đánh thắng thì vẫn úp (D-022). Trường hợp D của spec bị bỏ.
- C3 → chấp nhận người tấn công suy ra quân úp mạnh hơn mình.
- C4 (Q-24) → còn mở: quân bị loại có lộ loài/Rank cho đối thủ không.
- C4 (Q-24) → quân úp bị loại không lộ loài/Rank; chỉ quân ngửa lộ, mọi trường hợp (D-023). C5 (Chuột phòng thủ úp bị Voi đánh) áp dụng cùng quy tắc. Còn Q-25 về Battle History sau trận.

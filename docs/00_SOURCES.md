# Danh mục nguồn

| Mã | File | Phiên bản | SHA-256 (16 ký tự đầu) | Ghi chú |
|---|---|---|---|---|
| S1 | `docs/source/S1_Master_Spec_V2_6_1.md` | Master Spec V2.6.1, 4839 dòng | `ef80373dede2b770` | Nguồn luật chính. Hai lần người dùng gửi lên có nội dung giống hệt nhau |
| S2 | `docs/source/S2_Master_Spec_V2_6_1_Illustrated.docx` | V2.6.1 bản có hình | `43234350e9c3044c` | Cùng nội dung S1 + hình minh họa (nguồn hình cho giai đoạn UI). Chưa trích xuất hình |
| S3 | `src/prototype/dark-animal-chess.html` | v0.8 (xem CHANGELOG) | – | Bản chơi thử, không phải nguồn luật |
| U | Chat với chủ dự án | – | – | Xác nhận trực tiếp. Mã `U-2026-11-05` = các xác nhận ngày đó |

Kiểm tra file gốc có bị đổi không: `sha256sum docs/source/*` rồi so với bảng trên.

## Bản đồ mục lục S1 (số dòng của file `.md`)

| Mục | Dòng | Nội dung | Dùng cho phase |
|---|---:|---|---|
| Lịch sử & nguyên tắc hợp nhất | 16 | Cách V2.5, V2.5.1, V2.6 được hợp nhất | P0 |
| §2 Thông số trận | 61 | Bàn 6×7, 15 quân, 8–10 trên bàn, lượt 30s | P1, P2 |
| §3 Bàn cờ & vùng | 84 | Cột A–F, hàng 1–7, vùng 3–1–3 | P1 |
| §4 Loài & Rank | 109 | 9 loài, Chuột–Voi (§4.1), cùng Rank (§4.2) | P2, P4 |
| §5 Số lượng & thiết lập | 148 | 15 quân, N=8–10, QUEUE=15−N, kiểm tra hợp lệ (§5.3) | P2 |
| §6 Trạng thái quân | 180 | Úp/ngửa, sống/chết, BOARD/QUEUE/REMOVED, thông tin ẩn | P1 |
| §7 Di chuyển | 203 | 1 ô 4 hướng, lật ngửa, 9 bước kiểm tra | P3 |
| §8 Triển khai & hàng chờ | 231 | DEPLOY ngang cấp MOVE, luôn ngửa | P3 |
| §9 Lượt & đồng hồ | 251 | 10 bước một lượt, timeout chưa chốt | P3 |
| §10 Chiến đấu & chiếm ô | 275 | Snapshot, 12 bước, kết quả cơ bản | P4 |
| §11 Lá Bí Mật | 313 | 4 trạng thái lá, nguyên tắc | P5 |
| §12 Kéo Theo | 332 | Chọn thêm 1 quân, không dây chuyền | P6 |
| §13 Kết thúc trận | 363 | Hòa đã chốt; thắng/thua tổng quát CHƯA chốt | P7 |
| §14 Effect Queue | 377 | Xử lý chuỗi sự kiện | P6 |
| §15 Random & Seed | 403 | Random phía server, tái hiện được | P2 |
| §16 Giao diện | 421 | Thông tin phải hiển thị | P9 |
| §17 Bất biến dữ liệu | 433 | 14 điều kiện sau mỗi giao dịch | P1 (xuyên suốt) |
| §18 Kiến trúc engine | 455 | 14 module | P1–P8 |
| §19 Cấu trúc dữ liệu | 475 | Mẫu dữ liệu tham khảo | P1 |
| §20 Giao dịch & lưu trữ | 531 | | P8 |
| §21 Bảo mật & chống gian lận | 556 | | P8 |
| §22 Lỗi & mất kết nối | 568 | | P8 |
| §23 Kiểm thử | 582 | Nhóm test + TC001–TC040 | P10, và test từng phase |
| §24 Phi chức năng | 643 | | P10 |
| §25 Roadmap đề xuất | 652 | 10 giai đoạn gốc | ROADMAP |
| §26 Cần xác nhận | 665 | 15 điểm | OPEN_QUESTIONS |
| Phần III + Phụ lục A (V2.5) | 689 / 696 | Luật chi tiết kế thừa, gồm §10.2 Lượt đầu (L1412) | P0, P4 |
| Phụ lục B (V2.5.1) | 3638 | | P0 |
| Nhật ký cập nhật V2.6.1 | 4826 | 8 điểm đã được người dùng xác nhận | P0 |

> Phụ lục A, B rất dài (~4.000 dòng). Khi làm một task, chỉ đọc đúng dòng liên quan, đừng nạp cả file vào một phiên.

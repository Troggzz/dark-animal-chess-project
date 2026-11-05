# Lịch sử thay đổi

Mỗi dòng: phiên bản · ngày · thay đổi · nguồn/quyết định · task. Thêm mới ở trên cùng.

## Engine e0.1 · 2026-11-05
- Dựng khung dự án (node:test, tsc), kiểu dữ liệu lõi, bảng loài, GameState rỗng, Board Engine (ô, vùng, ô kề, truy vấn quân). 9 test qua. · W-001..W-003 · T1.1–T1.3 · D-024..D-026
## v0.8 · 2026-11-05
- Quân úp bị loại không lộ loài/Rank: nhật ký chỉ ghi "quân úp"; lời tường thuật Chuột–Voi đổi thành "thắng/thua" để không lộ loài của quân úp. · D-023 · T4.4, T7.3
## v0.7 · 2026-11-05
- Úp đánh úp: chỉ quân tấn công lộ; quân bị đánh thắng thì vẫn úp (bỏ "lật cả hai"). Nhật ký không còn tiết lộ loài của quân úp bị đánh khi nó chưa bị loại. · D-021, D-022 · T4.4
## Tài liệu · 2026-11-05
- Thêm docs/RULES_TABLE.md (bản nháp T0.2) và Q-21–Q-24. · T0.2
## v0.6 · 2026-11-05
- Đội đi trước chọn ngẫu nhiên mỗi ván. · D-020 · T3.1
- Ghi nhận luật thắng/thua: hết quân hoặc đầu hàng là thua (hành vi prototype không đổi). · D-019 · T7.1
## v0.5 · 2026-11-05
- Hết giờ 30s: hệ thống tự chọn một hành động hợp lệ ngẫu nhiên (lượt đầu của đội thì triển khai), thay cho "mất lượt". · D-017 · T3.4
## v0.4 · 2026-11-05
- Mỗi đội có bộ 15 quân riêng (tối thiểu 1 Chuột + 1 Voi), không còn dùng chung cơ cấu giữa hai đội. · D-001 · T2.2
## v0.3 · 2026-11-05
- Lượt đầu của mỗi đội bắt buộc triển khai; từ lượt 2 hỏi Di chuyển hay Triển khai; nút "Đổi hành động". · D-006 · T3.2
- Triển khai = rút đúng 1 quân úp từ hàng chờ, đặt vào ô trống, xong mới cập nhật hàng chờ. · D-005, D-007 · T3.3
## v0.2 · 2026-11-05
- Mọi quân úp ẩn với cả chủ sở hữu; hàng chờ hiển thị là quân úp; bỏ màn "chuyển máy". · D-004
## v0.1 · 2026-11-05
- Bản hot-seat đầu tiên: bàn 6×7, 15 quân/đội, N=8–10, Rank, Chuột–Voi, cùng Rank, đồng hồ 30s, đầu hàng, nhật ký. · S1 §2–§10, §13.1 · T9.1
- Giả định tạm: D-010, D-011, D-012, D-013.

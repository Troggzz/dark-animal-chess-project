# Làm việc qua nhiều tài khoản Claude

## Sự thật cần biết trước
- Các cuộc chat và tài khoản Claude **không chia sẻ trí nhớ với nhau**. Không có cách tự động "nối" Claude này sang Claude khác. Trí nhớ (memory) nếu bật cũng thuộc riêng từng tài khoản.
- Cách khả thi là đưa trạng thái dự án ra **ngoài Claude** (kho file) và cho mỗi phiên mới đọc lại. Bộ hồ sơ này sinh ra để làm việc đó.
- Cách này cũng cần cả khi chỉ dùng một tài khoản, vì mỗi cuộc chat mới hoặc chat quá dài đều mất ngữ cảnh.
- Nếu định dùng nhiều tài khoản để vượt hạn mức dùng miễn phí, nên tự đọc điều khoản và chính sách sử dụng của Anthropic xem có cho phép không. Mình không khẳng định được điều đó.

## Kho chung (một nguồn sự thật)
- Tạo kho Git (GitHub, riêng tư) chứa đúng cấu trúc thư mục này. Đây là bản duy nhất được coi là đúng. Chat chỉ là nơi làm việc tạm.
- Nếu chưa muốn dùng Git: một thư mục Google Drive hoặc OneDrive, đặt tên file có ngày, và không bao giờ sửa file trong `docs/source/`.
- Các phiên Claude không tự ghi vào kho được. **Người chơi vai PM là người sao chép kết quả vào kho.**

## Nghi thức mở phiên
1. Chọn task trong `TASKS.md` (trạng thái TODO, không BLOCKED).
2. Đổi nó sang `DOING`, ghi tên phiên, lưu lên kho **trước khi** bắt đầu để tài khoản khác không làm trùng.
3. Mở chat mới, dán prompt ở `HANDOFF.md` mục 3, đính kèm file theo danh sách ở đó.
4. Yêu cầu Claude tóm tắt hiểu biết trong 5 dòng, xác nhận đúng rồi mới cho làm.

## Nghi thức đóng phiên (làm sớm, đừng đợi hết hạn mức)
Claude không biết chính xác khi nào hết hạn mức. Vì vậy:
1. Với task dài, cứ sau mỗi cụm việc lớn, bảo Claude xuất ngay `TASKS.md` và `HANDOFF.md` đã cập nhật (không đợi cuối).
2. Khi thấy chat bắt đầu chậm hoặc lặp, hoặc đã dùng khoảng 70% hạn mức: nói "chốt phiên".
3. Lưu mọi file Claude xuất ra vào kho, commit với thông điệp `[Txx] mô tả ngắn`.
4. Đổi trạng thái task thành DONE, PARTIAL hoặc BLOCKED và ghi cột "Làm đến đâu".

## Cắt việc để vừa một phiên
- Mỗi task trong TASKS.md được thiết kế vừa **một phiên** (cỡ S). Task nào dài hơn thì tách thành T-a, T-b trước khi giao.
- Không dán cả spec (4.839 dòng). Dùng bản đồ ở `00_SOURCES.md`, dán đúng đoạn cần.
- Mỗi phiên chỉ giữ một vai (R1…R5) để ngữ cảnh gọn.

## Tránh xung đột
- Mỗi lúc chỉ một phiên `DOING` trên cùng một file mã. Khác file thì làm song song được.
- Khi hai phiên sửa cùng `DECISIONS.md`: chỉ thêm dòng ở cuối, ID tăng dần, PM gộp và đánh lại ID nếu trùng.
- Claude xuất file **đầy đủ**, không xuất đoạn vá, để dán đè không bị lệch.
- Sau khi dán vào kho, chạy test (khi có) trước khi coi là DONE.

## Kiểm tra sau khi bàn giao
- Claude mới có tóm tắt đúng không? So với mục 1 của `HANDOFF.md`.
- Có phát sinh quyết định mới không? Phải có dòng `D-xxx` tương ứng.
- Có chỗ mã lệch spec không? Phải có `D-xxx` trạng thái GIẢ ĐỊNH.

## Nhật ký từng bước (WORKLOG)
- Sau MỖI bước nhỏ, Claude phải thêm một mục vào cuối `docs/WORKLOG.md` theo khung có sẵn: đã làm gì, file nào, lệnh kiểm tra và kết quả thật, quyết định phát sinh, giới hạn, **bước kế tiếp cụ thể**, và file nào không được động vào.
- Phiên mới đọc các mục W cuối cùng trước tiên: đó là chỗ biết chính xác việc dừng ở đâu.
- Khi hai phiên làm song song, mỗi phiên chỉ viết mục W của mình; PM đánh lại số W nếu trùng.

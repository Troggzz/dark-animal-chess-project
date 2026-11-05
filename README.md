# Dark Animal Chess – Hồ sơ dự án

Đây là **nguồn sự thật duy nhất** của dự án. Mọi phiên Claude (kể cả khác tài khoản) và mọi người tham gia đều làm việc dựa trên bộ file này, không dựa vào trí nhớ của cuộc chat.

## Cấu trúc

| File | Dùng để làm gì | Ai sửa |
|---|---|---|
| `docs/00_SOURCES.md` | Danh mục nguồn, mã nguồn (S1, S2…), hash để phát hiện file gốc bị đổi, bản đồ mục lục spec | Người, khi có nguồn mới |
| `docs/DECISIONS.md` | Nhật ký quyết định: ai chốt, khi nào, dựa nguồn nào, đã xác nhận hay mới là giả định | Mọi phiên (thêm dòng mới, không xóa dòng cũ) |
| `docs/OPEN_QUESTIONS.md` | Các điểm "CẦN XÁC NHẬN" của spec (mục 26) và điểm phát sinh | Mọi phiên |
| `docs/WORKLOG.md` | Nhật ký từng bước làm, chi tiết đủ để phiên Claude khác làm tiếp | Mọi phiên, sau MỖI bước |
| `docs/RULES_TABLE.md` | Bảng chiến đấu úp/ngửa và chiếm ô, kèm chỗ spec mâu thuẫn | R1, khi chốt luật |
| `docs/ROADMAP.md` | Lộ trình P0–P10: mục tiêu, nguồn, sản phẩm bàn giao, tiêu chí xong, test | Khi đổi phạm vi |
| `docs/TASKS.md` | Bảng việc chi tiết: ai làm, làm đến đâu, bằng chứng | Mọi phiên (mỗi lần làm) |
| `docs/CHANGELOG.md` | Lịch sử thay đổi của sản phẩm (code/luật) | Mọi phiên |
| `docs/HANDOFF.md` | Ảnh chụp trạng thái hiện tại + mẫu prompt bàn giao sang phiên/tài khoản khác | Cuối mỗi phiên |
| `docs/WORKFLOW_MULTI_ACCOUNT.md` | Quy trình làm việc nhiều tài khoản Claude | Khi đổi quy trình |
| `docs/SETUP.md` | Công cụ cần cài và cách cài | Khi đổi công nghệ |
| `docs/source/` | Bản gốc spec (chỉ đọc, KHÔNG sửa) | Không ai |
| `src/engine/`, `tests/`, `package.json`, `tsconfig.json` | Engine TypeScript và test (chạy `npm test`) | Theo TASKS (P1 trở đi) |
| `src/prototype/` | Bản chơi thử v0.x | Theo TASKS |

## Quy tắc vàng
1. **Không sửa file trong `docs/source/`.** Muốn đổi luật: ghi quyết định vào `DECISIONS.md`, rồi tạo bản spec mới (V2.7…) ở nhiệm vụ T0.9.
2. **Mỗi thay đổi phải truy được nguồn**: gắn mã nguồn (ví dụ `S1 §5.2`) hoặc mã quyết định (`D-004`).
3. **Không tự điền luật chưa chốt.** Spec §26 yêu cầu vậy. Nếu buộc phải giả định để chạy thử, ghi vào `DECISIONS.md` với trạng thái `GIẢ ĐỊNH`.
4. **Sửa thì thêm, không xóa lịch sử.** Quyết định cũ bị thay thì đánh dấu `THAY BẰNG D-0xx`.
5. **Hết phiên là phải cập nhật** `TASKS.md`, `CHANGELOG.md`, `HANDOFF.md` (xem `WORKFLOW_MULTI_ACCOUNT.md`).
6. **Sau MỖI bước nhỏ** thêm một mục vào cuối `docs/WORKLOG.md` theo đúng khung ở đầu file đó (đã làm gì, kiểm tra thế nào, bước kế tiếp, tránh xung đột).

## Mã nguồn tham chiếu
`S1` = `docs/source/S1_Master_Spec_V2_6_1.md` (dùng `S1 §n` hoặc `S1 L<số dòng>`); `S2` = bản docx có hình minh họa; `S3` = `src/prototype/`; `U-<ngày>` = lời xác nhận của chủ dự án trong chat.

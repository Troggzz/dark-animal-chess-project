# Công cụ cần cài

Không bắt buộc cài hết ngay. Cột "Khi nào" cho biết cần từ phase nào. Phiên bản và gói miễn phí của dịch vụ thay đổi theo thời gian, nên kiểm tra lại trang chính thức trước khi dùng.

## Chạy engine hiện tại (đã có từ W-001)
```
npm test            # chạy toàn bộ test (cần Node 22.18 trở lên, không cần cài gói nào)
npm run typecheck   # kiểm tra kiểu cho src/engine bằng tsc
```
Tuỳ chọn: `npm i -D @types/node` nếu muốn tsc kiểm cả file test.

## Tối thiểu (từ P1)
| Công cụ | Để làm gì | Khi nào |
|---|---|---|
| Trình duyệt hiện đại (Chrome, Edge, Firefox) | Chơi thử, xem prototype | Ngay |
| Trình soạn thảo mã: Visual Studio Code | Sửa mã và tài liệu | P1 |
| Git + tài khoản GitHub | Kho chung, lịch sử thay đổi, đồng bộ nhiều phiên | P1 (nên có từ P0) |
| Node.js 22.18 trở lên (bản LTS) kèm npm | Chạy engine, test, build giao diện | P1 |
| TypeScript | Kiểu dữ liệu chặt cho Piece/GameState, bắt lỗi bất biến sớm | P1 |
| (Không cần Vitest) | Test dùng `node:test` có sẵn của Node, xem D-024; có thể đổi sau nếu cần | P1 |
| Vite | Chạy và đóng gói giao diện | P9 (có thể dùng từ P1) |

Khởi tạo giao diện Vite (chỉ khi tới P9; kho đã có sẵn `package.json` cho engine, KHÔNG chạy lệnh này ở thư mục gốc kho):
```
npm create vite@latest dark-animal-chess -- --template vanilla-ts
cd dark-animal-chess
npm install
npm install -D vitest
```
Rồi chép thư mục `docs/` vào gốc dự án.

## Cho P8 (nhiều người chơi)
| Nhu cầu | Lựa chọn tham khảo | Ghi chú |
|---|---|---|
| Máy chủ giữ trạng thái thật | Node.js + WebSocket (thư viện `ws` hoặc Socket.IO), hoặc framework game như Colyseus | Chọn ở T8.1 và ghi vào DECISIONS |
| Lưu trận và lịch sử | SQLite (một file, dễ bắt đầu) hoặc Postgres (ví dụ qua Supabase) | Lịch sử là bắt buộc lưu (S1 §2) |
| Chạy giao diện trên mạng | GitHub Pages, Netlify, Cloudflare Pages | Chỉ phần giao diện tĩnh |
| Chạy máy chủ trên mạng | Render, Fly.io, Railway hoặc VPS nhỏ | Gói miễn phí hay đổi, có thể ngủ khi không dùng |

## Cho nhóm làm việc với Claude
| Công cụ | Dùng để |
|---|---|
| claude.ai (các tài khoản) | Phiên làm việc theo `WORKFLOW_MULTI_ACCOUNT.md`; Claude tạo file để tải về, bạn lưu vào kho |
| Claude Code (nếu gói của bạn có) | Làm việc trực tiếp trên thư mục dự án, tự sửa file và chạy test; đỡ phải sao chép tay |
| Pandoc hoặc Word | Chỉ khi cần xuất tài liệu |

## Việc nên làm ngay (không cần lập trình)
1. Tạo kho GitHub riêng tư, đưa cả thư mục hồ sơ này vào.
2. Chạy `sha256sum docs/source/*`, so với `00_SOURCES.md` để chắc file gốc đúng.
3. Mở phiên đầu tiên cho T0.2 bằng prompt trong `HANDOFF.md`.

# DARK ANIMAL CHESS
# ULTIMATE EDITION – MASTER SPECIFICATION V2.6.1

**Tài liệu hợp nhất và nâng cấp từ V2.5 và V2.5.1**

- **Tên dự án:** Dark Animal Chess
- **Phiên bản tài liệu:** 2.6.1 – Master Specification
- **Phiên bản luật nền:** 2.5 / 2.5.1
- **Loại tài liệu:** Game Design Document (GDD) + Technical Design Document (TDD)
- **Nền tảng mục tiêu:** Web / Desktop / Mobile
- **Ngôn ngữ:** Tiếng Việt
- **Trạng thái:** Bản cập nhật theo các xác nhận mới của người dùng; các mục chưa được xác nhận tiếp tục được đánh dấu rõ.

---

## LỊCH SỬ VÀ NGUYÊN TẮC HỢP NHẤT

Tài liệu này hợp nhất hai tài liệu đầu vào:
1. `read.md` – Dark Animal Chess Ultimate Edition V2.5: đặc tả chi tiết về gameplay, 9 loài, Rank, chiến đấu úp/ngửa, chiếm ô, Lá Bí Mật, Nổ Lan, đồng hồ, random, lưu trữ, đồng bộ, bảo mật, thuật toán, kiểm thử và roadmap.
2. `readmev2,5.md` – README Master V2.5.1: bổ sung và làm rõ giới hạn 15 quân mỗi đội, 8–10 quân ban đầu trên bàn cho từng đội, quân di chuyển phải lật ngửa, quân triển khai luôn ngửa, điều kiện thắng theo số quân trên bàn, Kéo Theo và Effect Queue.

### Thứ tự ưu tiên khi có khác biệt

Các quy tắc được V2.5.1 nêu rõ và có tính cập nhật được lấy làm quy tắc chuẩn của V2.6. Các nội dung chi tiết ở V2.5 được giữ lại nếu không mâu thuẫn. Không tự suy diễn những điểm mà cả hai tài liệu chưa chốt.

| Chủ đề | V2.5 | V2.5.1 | Quy tắc chuẩn V2.6 |
|---|---|---|---|
| Tổng số quân mỗi đội | 8–10 quân | Tối đa 15 quân | Chính xác 15 quân/đội khi bắt đầu trận, tính cả bàn và hàng chờ |
| Quân ban đầu trên bàn | Chưa chốt rõ số đặt bàn | Random độc lập 8–10 quân/đội | Mỗi đội có cùng số quân trên bàn, số lượng được chọn trong khoảng 8–10 |
| Cân bằng số quân ban đầu | Hai đội bằng nhau | Random độc lập, có thể khác nhau | Bắt buộc số quân trên bàn ban đầu của hai đội bằng nhau |
| Cơ cấu loài | Cùng cơ cấu; bắt buộc Chuột và Voi | Chưa xác định đầy đủ | Mỗi đội bắt buộc có ít nhất 1 Chuột và 1 Voi; các quân còn lại random theo quy tắc hiện có |
| Sân bàn cờ | Chia sân Đỏ/Xanh | 3 hàng Đỏ, 1 trung lập, 3 hàng Xanh | Dùng phân vùng 3–1–3 của V2.5.1 |
| Quân di chuyển | Có quy tắc úp/ngửa chi tiết | Mọi quân úp di chuyển hợp lệ đều lật ngửa | Áp dụng V2.5.1: lật ngửa ngay khi bắt đầu thực thi di chuyển hợp lệ |
| Quân triển khai | Có thể có trạng thái theo cấu hình | Luôn ngửa | Triển khai từ hàng chờ luôn FACE_UP |
| Điều kiện thua | Có mô tả hết quân còn sống và hòa | Hết quân trên bàn là thua, không tính hàng chờ | Áp dụng V2.5.1: chỉ đếm quân sống trên bàn |
| Cùng Rank | Cả hai bị loại | Để theo luật chi tiết, không tự suy diễn | Giữ luật chi tiết V2.5: cả hai bị loại đồng thời; đưa vào test bắt buộc |
| Di chuyển | Tối đa 1 ô, 4 hướng | Không định nghĩa lại khoảng cách | Giữ V2.5: tối đa 1 ô theo 4 hướng, không đi chéo, trừ khi luật loài được xác nhận khác |
| Lượt chơi | 1 hành động chính, 30 giây | Không quy định lại thời gian | Giữ V2.5: 1 hành động chính/lượt, 30 giây |
| Giới hạn quân úp sân đối phương | Mặc định tối đa 4 | Giữ nếu bật cấu hình | Mặc định 4; cần xác nhận cấu hình cuối và kiểm tra tại mọi thay đổi vị trí |
| Kéo Theo | Có quy trình chi tiết và tương tác lá | Làm rõ vô hiệu hóa lá, chọn thêm 1 quân, không dây chuyền | Dùng quy trình V2.5.1 làm chuẩn; giữ chi tiết kỹ thuật V2.5 nếu tương thích |

> **Quy tắc khởi tạo đã chốt ở V2.6.1:** Mỗi đội có đúng 15 quân. Hai đội có cùng số quân đặt trên bàn lúc bắt đầu (từ 8 đến 10 quân); số quân còn lại tự động được đưa vào hàng chờ theo công thức `QUEUE = 15 - BOARD`. Mỗi đội phải có ít nhất 1 Chuột và 1 Voi trong tổng cơ cấu 15 quân.

---

# PHẦN I – LUẬT CHƠI CHUẨN V2.6

## 1. Tổng quan

Dark Animal Chess là trò chơi chiến thuật theo lượt giữa hai đội Đỏ và Xanh. Người chơi điều khiển các quân động vật có Rank, trạng thái úp/ngửa và có thể sở hữu Lá Bí Mật. Trò chơi kết hợp:
- Di chuyển và chiến đấu theo lượt.
- Thông tin ẩn thông qua quân úp.
- Triển khai quân từ hàng chờ.
- So sánh Rank và các ngoại lệ theo loài.
- Lá Bí Mật, Kéo Theo và các hiệu ứng đặc biệt.
- Random có Seed để tái hiện trận.
- Đồng hồ, lịch sử hành động và đồng bộ trạng thái.

Mục tiêu là đánh bại đối phương theo điều kiện thắng được định nghĩa tại Mục 12.

## 2. Thông số trận đấu

| Thành phần | Quy định chuẩn |
|---|---|
| Số đội | 2: Đỏ và Xanh |
| Kích thước bàn | 6 cột × 7 hàng |
| Tổng số ô | 42 |
| Sân Đỏ | 3 hàng |
| Vùng trung lập | 1 hàng |
| Sân Xanh | 3 hàng |
| Số loài | 9 loài hiện tại |
| Tổng số quân mỗi đội khi bắt đầu | Chính xác 15 quân |
| Quân ban đầu trên bàn | Cùng một số lượng cho cả hai đội, từ 8–10 quân/đội |
| Quân trong hàng chờ ban đầu | Tự động tính: 15 trừ số quân đặt trên bàn |
| Hàng chờ | Có; chứa quân chưa triển khai |
| Hành động chính | 1 hành động/lượt |
| Thời gian lượt | 30 giây |
| Di chuyển cơ bản | Tối đa 1 ô, trên/dưới/trái/phải |
| Trạng thái quân | FACE_DOWN / FACE_UP |
| Trạng thái tồn tại | ALIVE / ELIMINATED |
| Vị trí quân | BOARD / QUEUE / REMOVED |
| Lịch sử và Seed | Bắt buộc lưu |

## 3. Cấu trúc bàn cờ và vùng

Bàn cờ có 6 cột A–F và 7 hàng 1–7. Quy ước:
- Hàng 1–3: Sân Đỏ.
- Hàng 4: Vùng trung lập.
- Hàng 5–7: Sân Xanh.

```text
                 ĐỘI XANH
          A    B    C    D    E    F
     7    □    □    □    □    □    □
     6    □    □    □    □    □    □
     5    □    □    □    □    □    □

              VÙNG TRUNG LẬP
     4    □    □    □    □    □    □

                 ĐỘI ĐỎ
     3    □    □    □    □    □    □
     2    □    □    □    □    □    □
     1    □    □    □    □    □    □
```

Mỗi ô có ID duy nhất. Mỗi ô chỉ chứa tối đa một quân sống. Vùng trung lập không thuộc đội nào. Quân được phép đi vào sân đối phương nếu hành động hợp lệ.

## 4. Danh sách loài và Rank

Danh sách 9 loài được giữ nguyên, không tự ý thêm loài:

| Rank | Loài | ID |
|---:|---|---|
| 1 | Chuột | `mouse` |
| 2 | Mèo | `cat` |
| 3 | Chó | `dog` |
| 4 | Sói | `wolf` |
| 5 | Báo | `leopard` |
| 6 | Hổ | `tiger` |
| 7 | Sư Tử | `lion` |
| 8 | Gấu | `bear` |
| 9 | Voi | `elephant` |

Rank cao hơn thắng Rank thấp hơn theo luật cơ bản. Các ngoại lệ được kiểm tra trước phép so sánh Rank.

### 4.1. Ngoại lệ Chuột – Voi

Chuột luôn thắng Voi trong mọi trạng thái úp/ngửa và bất kể là quân tấn công hay phòng thủ:
- Voi bị loại.
- Chuột sống sót.
- Không áp dụng so sánh Rank.
- Không áp dụng luật cùng Rank.
- Chuột **không chiếm ô** của Voi; Chuột giữ nguyên vị trí ban đầu.

Chuột không bất tử và vẫn có thể bị các loài khác đánh bại theo Rank.

### 4.2. Hai quân cùng Rank

Khi hai quân cùng Rank chiến đấu:
- Cả hai bị loại đồng thời.
- Không có quân chiến thắng.
- Không quân nào chiếm ô của quân còn lại.
- Cả hai ô được giải phóng theo kết quả giao dịch.
- Kiểm tra các Lá Bí Mật/hiệu ứng đủ điều kiện sau khi xác định kết quả cơ bản.
- Chỉ kiểm tra kết thúc trận sau khi toàn bộ hiệu ứng hoàn tất.

## 5. Số lượng quân và thiết lập trận

Mỗi đội có **chính xác 15 quân** khi bắt đầu trận, tính cả quân trên bàn và quân trong hàng chờ. Quân đã bị loại không còn được tính là quân sống.

### 5.1. Số lượng quân trên bàn và hàng chờ

1. Chọn một số lượng quân trên bàn `N` trong khoảng từ 8 đến 10.
2. Cả Đỏ và Xanh phải có cùng số lượng `N` quân trên bàn.
3. Số quân trong hàng chờ của mỗi đội được hệ thống tự động tính: `QUEUE = 15 - N`.
4. Vì vậy, mỗi đội có từ 5 đến 7 quân trong hàng chờ.
5. Quân đặt trên bàn ban đầu ở trạng thái úp (`FACE_DOWN`).
6. Quân trong hàng chờ chưa được triển khai lên bàn. Khi triển khai, áp dụng quy tắc quân triển khai luôn ngửa (`FACE_UP`).
7. Server lưu Seed và kết quả random để có thể kiểm tra, tái hiện quá trình khởi tạo.

### 5.2. Cơ cấu loài

- Mỗi đội phải có ít nhất 1 Chuột và ít nhất 1 Voi trong tổng số 15 quân.
- Không có loài nào khác bắt buộc phải xuất hiện với số lượng tối thiểu theo xác nhận hiện tại.
- Các quân còn lại được random theo quy tắc/cấu hình phân phối loài hiện có của trò chơi.
- Không tự đặt thêm số lượng cố định cho từng loài nếu chưa được người dùng xác nhận.
- Việc chia quân vào BOARD và QUEUE phải bảo đảm tổng mỗi đội luôn bằng 15 và số quân BOARD của hai đội bằng nhau.

### 5.3. Kiểm tra hợp lệ khi khởi tạo

- `8 <= BOARD <= 10` cho mỗi đội.
- `BOARD_RED == BOARD_BLUE`.
- `QUEUE_RED == 15 - BOARD_RED` và `QUEUE_BLUE == 15 - BOARD_BLUE`.
- `BOARD + QUEUE == 15` cho từng đội.
- Mỗi đội có ít nhất một Chuột và một Voi trong tổng quân.
- Không có hai quân cùng chiếm một ô.
- Mọi quân BOARD ban đầu ở trạng thái úp.

## 6. Trạng thái quân

Các nhóm trạng thái phải được lưu độc lập:

| Nhóm | Giá trị | Ý nghĩa |
|---|---|---|
| Hiển thị | `FACE_DOWN` | Quân úp |
| Hiển thị | `FACE_UP` | Quân ngửa |
| Sinh tồn | `ALIVE` | Còn sống |
| Sinh tồn | `ELIMINATED` | Đã bị loại |
| Vị trí | `BOARD` | Đang trên bàn |
| Vị trí | `QUEUE` | Trong hàng chờ |
| Vị trí | `REMOVED` | Đã rời khỏi trận |

Không gộp các trạng thái trên thành một biến. Quân trong hàng chờ vẫn có thể còn sống nhưng không được tính là quân đang tồn tại trên bàn để xét thắng thua.

### 6.1. Quy tắc thông tin

- Quân úp của đối phương không tiết lộ loài, Rank hoặc chức năng bí mật chưa được công khai.
- Quân ngửa hiển thị loài, Rank và thông tin hiệu ứng được phép công khai.
- Người chơi chỉ được xem dữ liệu bí mật thuộc quyền của mình.
- Server không gửi dữ liệu bí mật của đối phương xuống client rồi chỉ ẩn bằng giao diện.

## 7. Di chuyển

Di chuyển cơ bản tối đa một ô theo bốn hướng: trên, dưới, trái, phải. Không đi chéo, không đi xuyên quân, không ra ngoài bàn, không đi vào ô đồng đội. Di chuyển vào ô đối phương được xử lý như một hành động tấn công hợp lệ.

Một hành động MOVE chỉ chọn một quân và một ô đích. Không được di chuyển tiếp sau khi hành động và các hiệu ứng của nó đã hoàn tất.

### 7.1. Lật ngửa khi di chuyển

Mọi quân úp khi bắt đầu thực thi một hành động di chuyển hợp lệ phải lật ngửa ngay, không phụ thuộc điểm đến:
- Di chuyển thông thường.
- Di chuyển cưỡng chế.
- Di chuyển do hiệu ứng hoặc Lá Bí Mật.
- Di chuyển nhiều ô nếu một luật đặc biệt sau này cho phép.

Nếu yêu cầu bị từ chối trước khi thực thi, trạng thái quân không thay đổi. Quân đã ngửa không tự động úp lại, trừ khi một Lá Bí Mật/hiệu ứng được xác nhận quy định rõ.

### 7.2. Kiểm tra di chuyển

1. Trận đang hoạt động và đúng lượt.
2. Hành động chưa được sử dụng trong lượt.
3. Quân tồn tại, còn sống, thuộc đội hiện tại và đang ở BOARD.
4. Ô đích nằm trong bàn.
5. Khoảng cách và hướng hợp lệ.
6. Ô đích không có đồng đội.
7. Nếu có quân đối phương, chuyển sang Combat Engine.
8. Kiểm tra giới hạn quân úp ở sân đối phương nếu cấu hình đang bật.
9. Nếu hợp lệ, lật quân úp, thực hiện hành động và xử lý các hiệu ứng phát sinh.

## 8. Triển khai và hàng chờ

Mỗi đội có hàng chờ riêng, chứa quân sống chưa được triển khai. Triển khai là một hành động chính `DEPLOY`, ngang cấp với `MOVE`.

Điều kiện triển khai:
- Đúng lượt, trận đang hoạt động, đồng hồ chưa hết.
- Quân thuộc đội hiện tại, còn sống và đang ở QUEUE.
- Ô đích thuộc bàn cờ, đang trống và hợp lệ.
- Chưa sử dụng hành động chính của lượt.
- Không vượt giới hạn cấu hình.

Khi triển khai:
- Chuyển vị trí quân từ QUEUE sang BOARD.
- Quân luôn ở trạng thái `FACE_UP`.
- Không tạo thêm quân mới.
- Không để cùng một quân đồng thời xuất hiện trong hàng chờ và trên bàn.
- Cập nhật bộ đếm, lịch sử và trạng thái trận.

Không khóa triển khai chỉ vì hàng chờ còn đúng một quân. Ngoại lệ “quân cuối hàng chờ” không cho phép triển khai nhiều quân trong một lượt.

## 9. Hệ thống lượt và đồng hồ

Đỏ và Xanh luân phiên. Mỗi lượt chỉ có một hành động chính:
- `MOVE`
- `DEPLOY`

Các hiệu ứng tự động phát sinh từ hành động chính không tính là hành động chính thứ hai.

Một lượt chuẩn:
1. Xác định đội hiện tại.
2. Bắt đầu đồng hồ 30 giây.
3. Nhận yêu cầu hành động.
4. Kiểm tra quyền và tính hợp lệ.
5. Thực hiện hành động.
6. Xử lý chiến đấu.
7. Xử lý Lá Bí Mật và Effect Queue.
8. Cập nhật bàn cờ và lịch sử.
9. Kiểm tra thắng/thua/hòa.
10. Nếu trận chưa kết thúc, chuyển lượt.

Không chuyển lượt khi còn hiệu ứng chờ, giao dịch chưa hoàn tất hoặc trạng thái chưa đồng bộ.

Hết giờ phải được xử lý nhất quán ở server. Cách xử lý cụ thể (mất lượt, tự động chọn hành động, hay hình phạt khác) cần được xác nhận; không tự đặt luật mới.

## 10. Chiến đấu và chiếm ô

Chiến đấu xảy ra khi một quân di chuyển vào ô có quân đối phương. Quân chủ động di chuyển là ATTACKER; quân đang chiếm ô là DEFENDER. Cả Đỏ và Xanh đều có quyền tấn công.

Trước khi xử lý, tạo snapshot bất biến chứa tối thiểu:
- Combat ID.
- ID, đội, loài, Rank, trạng thái hiển thị, vị trí và trạng thái sống của hai quân.
- Thời điểm chụp.
- ID hành động cha và phiên bản trạng thái trận.

Thứ tự xử lý chuẩn:
1. Xác thực hành động và hai quân.
2. Tạo snapshot.
3. Kiểm tra Chuột–Voi.
4. Kiểm tra luật đặc biệt và tương tác Lá Bí Mật.
5. Áp dụng quy tắc úp/ngửa chi tiết.
6. So sánh Rank nếu không có ngoại lệ.
7. Xử lý cùng Rank.
8. Kiểm tra hiệu ứng cứu quân/thay đổi kết quả nếu được luật cho phép.
9. Xác định quân bị loại và vị trí cuối.
10. Commit giao dịch.
11. Xử lý Effect Queue.
12. Kiểm tra điều kiện kết thúc trận.

Kết quả cơ bản:
- `ATTACKER_WINS`
- `DEFENDER_WINS`
- `BOTH_ELIMINATED`

### 10.1. Quy tắc chiếm ô

- Quân tấn công thắng: xử lý chiếm ô theo quy tắc chi tiết của V2.5; không áp dụng máy móc cho ngoại lệ Chuột–Voi.
- Quân phòng thủ thắng: quân phòng thủ giữ ô; quân tấn công bị loại theo kết quả.
- Cùng Rank: cả hai bị loại, không có quân chiếm ô.
- Chuột thắng Voi: Chuột giữ nguyên vị trí ban đầu, không chiếm ô của Voi.

Các trường hợp úp/ngửa đối xứng Đỏ/Xanh trong V2.5 là phần luật chi tiết cần được giữ trong Combat Engine. Không được để màu đội làm thay đổi kết quả nếu không có quy tắc được xác nhận.

## 11. Lá Bí Mật

Lá Bí Mật là khả năng đặc biệt gắn với quân. Lá có thể ảnh hưởng chiến đấu, di chuyển, phòng thủ, loại quân, Kéo Theo hoặc hiệu ứng khác.

Trạng thái kỹ thuật:
- `ACTIVE`: đang hoạt động.
- `DISABLED`: bị vô hiệu hóa.
- `CONSUMED`: đã dùng hết.
- `PENDING`: đang chờ xử lý.

Mỗi lá cần có ID, chủ sở hữu, điều kiện kích hoạt, thời điểm kích hoạt, mục tiêu hợp lệ, hiệu ứng, số lần kích hoạt và trạng thái.

Nguyên tắc:
- Chỉ kích hoạt khi điều kiện cụ thể được thỏa mãn.
- Không kích hoạt lặp trong cùng một sự kiện.
- Lá đã vô hiệu hóa không được kích hoạt.
- Không tự ý phân bổ lá cho Rank thấp nhất hoặc cao nhất nếu quy tắc phân bổ V2.5 đang được áp dụng.
- Phải bảo vệ thông tin Lá Bí Mật của đối thủ ở server.

## 12. Kéo Theo

Kéo Theo là hiệu ứng khiến quân sở hữu bị loại kéo theo quân tấn công và thêm một quân hợp lệ khác của đội tấn công.

Điều kiện:
- Quân sở hữu Lá Kéo Theo bị quân đối phương đánh bại.
- Lá vẫn `ACTIVE`.
- Hiệu ứng chưa kích hoạt trong sự kiện hiện tại.

Kết quả:
1. Quân sở hữu Kéo Theo bị loại.
2. Quân tấn công bị loại theo.
3. Server chọn ngẫu nhiên thêm một quân khác của đội tấn công.
4. Quân được chọn cũng bị loại.
5. Nếu không còn mục tiêu hợp lệ, bỏ qua bước 3–4.

Mục tiêu ngẫu nhiên phải:
- Thuộc đội của quân tấn công.
- Còn sống và đang ở BOARD.
- Không phải quân tấn công đã bị chọn.
- Chưa bị loại trong chuỗi sự kiện hiện tại.
- Không được lấy từ QUEUE.

Nếu mục tiêu có Lá Bí Mật:
- Nếu đang úp, lật ngửa trước khi loại.
- Vô hiệu hóa toàn bộ chức năng của lá trước khi commit loại.
- Không kích hoạt hiệu ứng cứu quân, phòng thủ hoặc Kéo Theo.
- Không tạo Kéo Theo dây chuyền.

Toàn bộ thao tác phải nằm trong một giao dịch có thể rollback. Việc chọn mục tiêu sử dụng Seed phía server và được ghi vào lịch sử.

## 13. Điều kiện kết thúc trận: thắng, thua và hòa

### 13.1. Quy tắc hòa đã xác nhận

Nếu sau khi xử lý xong toàn bộ hiệu ứng đang chờ mà **cả hai đội đều không còn quân sống trên bàn**, trận đấu kết thúc với kết quả hòa. Quân trong hàng chờ không được xem là quân đang có mặt trên bàn trong phép kiểm tra này.

### 13.2. Điều kiện thắng/thua tổng quát

Các điều kiện thắng và thua tổng quát sẽ được chốt ở bước thiết kế tiếp theo. Không tự động áp dụng hoặc coi các mô tả thắng/thua trong bản hợp nhất trước đây là quyết định cuối cùng cho đến khi người dùng xác nhận.

### 13.3. Thời điểm kiểm tra kết thúc

Không kiểm tra kết thúc trận giữa chừng khi Effect Queue còn sự kiện. Chỉ kiểm tra sau khi toàn bộ hiệu ứng phát sinh từ hành động hiện tại đã được xử lý và commit.

## 14. Effect Queue và xử lý sự kiện

Mọi hiệu ứng phát sinh phải đi qua một hàng đợi sự kiện tập trung. Các loại sự kiện tham khảo:
`MOVE`, `REVEAL`, `COMBAT`, `ELIMINATION`, `FOLLOW`, `SECRET_DISABLE`, `DEPLOY`, `VICTORY_CHECK`, `TIMEOUT`, `SURRENDER`.

Mỗi event có:
- `id`
- `parentEventId`
- `sourcePieceId`
- `targetPieceId`
- `type`
- `reason`
- `status` (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`)
- `createdAt`

Nguyên tắc:
- Xử lý theo thứ tự xác định.
- Mỗi event chỉ commit một lần.
- Không xử lý quân đã bị loại.
- Không để event cũ ghi đè trạng thái mới.
- Có giới hạn số event trong một transaction để ngăn vòng lặp.
- Chỉ chạy Victory Check khi các event liên quan đã hoàn tất.

Quy trình Kéo Theo:
`COMBAT_RESULT → FOLLOW_CHECK → RANDOM_TARGET → REVEAL → DISABLE_SECRET → ELIMINATION_COMMIT → BOARD_UPDATE → VICTORY_CHECK`.

## 15. Random và khả năng tái hiện

Random được phép dùng cho:
- Số quân đặt trên bàn ban đầu (8–10 mỗi đội).
- Thành phần quân nếu cấu hình cho phép.
- Vị trí quân ban đầu.
- Trạng thái úp/ngửa theo cấu hình.
- Phân bổ Lá Bí Mật theo luật.
- Chọn mục tiêu Kéo Theo.

Yêu cầu:
- Random phía server.
- Seed được tạo và quản lý ở server.
- Client không được tự gửi kết quả random.
- Lưu Seed, đầu vào random, kết quả random và thời điểm.
- Không công khai Seed hoặc dữ liệu làm lộ quân úp/Lá Bí Mật trong trận.
- Cùng Seed và cùng trạng thái đầu vào phải tái tạo được kết quả.

## 16. Giao diện và trải nghiệm

Giao diện phải hiển thị:
- Bàn cờ 6×7 và phân vùng Đỏ/trung lập/Xanh.
- Quân và trạng thái úp/ngửa.
- Số quân sống trên bàn và số quân trong hàng chờ của từng đội.
- Lượt hiện tại, đồng hồ 30 giây.
- Lịch sử hành động và thông báo hiệu ứng.
- Các ô có thể di chuyển/triển khai khi người chơi chọn quân.

Không tiết lộ loài, Rank, chức năng của quân úp đối phương hoặc Lá Bí Mật chưa được công khai. Phản hồi hành động phải nêu rõ chấp nhận/từ chối và lý do phù hợp.

## 17. Điều kiện bất biến dữ liệu

Sau mỗi giao dịch, phải kiểm tra:
1. Mỗi ID quân là duy nhất.
2. Một quân chỉ thuộc một đội.
3. Một quân không thể đồng thời nằm trên bàn và hàng chờ.
4. Một ô không có hơn một quân sống.
5. Quân `ELIMINATED` không ở BOARD/QUEUE.
6. Quân BOARD phải có vị trí hợp lệ.
7. Quân QUEUE không có vị trí ô trên bàn.
8. Tổng quân sống mỗi đội không vượt 15.
9. Rank khớp cấu hình loài.
10. Trạng thái bí mật không bị gửi cho client không có quyền.
11. Một hành động chính không được commit hai lần.
12. Một event không được xử lý hai lần.
13. Không chuyển lượt khi transaction/Effect Queue chưa hoàn tất.
14. Không tiếp tục trận khi trạng thái đã kết thúc.

---

# PHẦN II – ĐẶC TẢ KỸ THUẬT

## 18. Kiến trúc Game Engine

Tách thành các module:
- **Game State Manager:** quản lý trạng thái trận.
- **Rule Engine:** nguồn duy nhất quyết định luật hợp lệ.
- **Board Engine:** quản lý ô, tọa độ và vùng.
- **Movement Engine:** kiểm tra và thực hiện di chuyển.
- **Combat Engine:** snapshot, Rank, ngoại lệ và kết quả chiến đấu.
- **Secret Card Engine:** kích hoạt/vô hiệu hóa Lá Bí Mật.
- **Effect Queue:** xử lý chuỗi sự kiện.
- **Deployment Engine:** hàng chờ và triển khai.
- **Random Engine:** random có Seed.
- **Victory Engine:** kiểm tra thắng/thua/hòa.
- **Clock/Turn Manager:** lượt và đồng hồ.
- **Persistence Layer:** lưu/khôi phục.
- **Synchronization Layer:** đồng bộ nhiều client.
- **Audit/History Service:** lịch sử và replay.

Rule Engine và server là nguồn quyết định cuối cùng. Giao diện chỉ gửi yêu cầu và hiển thị kết quả.

## 19. Cấu trúc dữ liệu tham khảo

```js
const gameState = {
  id: "GAME_ID",
  version: "2.6",
  status: "IN_PROGRESS",
  currentTurn: "RED",
  turnNumber: 1,
  board: { columns: 6, rows: 7, cells: [] },
  teams: {
    RED: { pieces: [], queue: [] },
    BLUE: { pieces: [], queue: [] }
  },
  random: { seed: null, history: [] },
  eventQueue: [],
  history: [],
  winner: null,
  draw: false,
  stateVersion: 1
};

const piece = {
  id: "PIECE_ID",
  team: "RED",
  type: "mouse",
  rank: 1,
  visibility: "FACE_DOWN",
  lifeStatus: "ALIVE",
  locationType: "BOARD",
  position: { x: 0, y: 0 },
  secretCards: [],
  activeEffects: []
};

const secretCard = {
  id: "SECRET_ID",
  type: "FOLLOW",
  status: "ACTIVE",
  ownerPieceId: "PIECE_ID",
  activationCount: 0
};

const event = {
  id: "EVENT_ID",
  type: "ELIMINATION",
  sourcePieceId: "SOURCE_ID",
  targetPieceId: "TARGET_ID",
  parentEventId: null,
  reason: "FOLLOW_EFFECT",
  status: "PENDING"
};
```

Không lưu hai nguồn dữ liệu mâu thuẫn cho cùng một trạng thái. Có thể suy ra danh sách hàng chờ từ `locationType`, nhưng phải chọn một nguồn dữ liệu chuẩn duy nhất và duy trì nhất quán.

## 20. Giao dịch, lưu trữ và khôi phục

Mỗi hành động cần có:
- `actionId` duy nhất (idempotency key).
- `gameId`.
- `playerId`.
- `expectedStateVersion`.
- `actionType`.
- `payload`.
- `createdAt`.

Quy trình:
1. Xác thực người chơi và quyền.
2. Kiểm tra phiên bản trạng thái.
3. Kiểm tra actionId đã xử lý chưa.
4. Tạo snapshot.
5. Validate bằng Rule Engine.
6. Thực thi trong transaction.
7. Xử lý Effect Queue.
8. Kiểm tra bất biến.
9. Commit hoặc rollback.
10. Ghi lịch sử và phát trạng thái mới.

Lưu dữ liệu cần thiết để khôi phục trận: Game State, Seed, lịch sử hành động, sự kiện, kết quả random, đồng hồ, phiên bản luật và trạng thái kết nối. LocalStorage chỉ nên dùng cho dữ liệu giao diện/cục bộ không nhạy cảm; trạng thái chính thức của trận nhiều người chơi phải do server quản lý.

## 21. Bảo mật và chống gian lận

- Server authoritative.
- Không tin Rank, kết quả chiến đấu, random, trạng thái quân hoặc thắng thua do client gửi.
- Kiểm tra quyền sở hữu và lượt ở server.
- Không gửi thông tin bí mật không cần thiết xuống client.
- Chống gửi hành động trùng bằng actionId.
- Dùng state version để chống ghi đè/xung đột.
- Ghi log các quyết định quan trọng.
- Giới hạn tần suất request và kiểm tra payload.
- Có cơ chế phát hiện trạng thái bất khả thi.

## 22. Xử lý lỗi và mất kết nối

Các tình huống tối thiểu:
- Di chuyển/triển khai không hợp lệ: từ chối, không đổi state.
- Quân đã bị loại: từ chối hành động.
- Quân không còn trên bàn: không được tham gia chiến đấu.
- Không còn mục tiêu Kéo Theo hợp lệ: bỏ qua chọn mục tiêu.
- Hiệu ứng lỗi: rollback transaction, giữ trạng thái nhất quán.
- Mất kết nối: lưu trạng thái server; cho phép kết nối lại và đồng bộ state version.
- Gửi action trùng: trả lại kết quả đã xử lý hoặc từ chối idempotently.
- Hai request đồng thời: chỉ một request được commit theo state version/transaction.

Chính sách thời gian chờ kết nối lại và xử thua khi mất kết nối cần được xác nhận.

## 23. Kiểm thử

Các nhóm test bắt buộc:
- Khởi tạo: số quân, giới hạn 15, random 8–10 quân trên bàn, hàng chờ, Seed.
- Bàn cờ: tọa độ, vùng 3–1–3, ô trống/trùng.
- Trạng thái quân: úp/ngửa, sống/chết, BOARD/QUEUE/REMOVED.
- Di chuyển: đúng lượt, một ô, bốn hướng, không đi chéo, lật ngửa.
- Triển khai: đúng đội, đúng hàng chờ, ô hợp lệ, luôn ngửa.
- Chiến đấu: hai hướng tấn công, Rank, Chuột–Voi, cùng Rank, chiếm ô.
- Lá Bí Mật: kích hoạt, vô hiệu hóa, không kích hoạt lặp.
- Kéo Theo: mục tiêu hợp lệ, không chọn hàng chờ, lật quân úp, vô hiệu hóa lá, không dây chuyền.
- Thắng thua: không tính hàng chờ, hai đội hết quân hòa, kiểm tra sau Effect Queue.
- Đồng hồ/lượt: 30 giây, timeout, không chuyển lượt sớm.
- Bảo mật: không lộ thông tin, chống action trùng, client giả mạo.
- Khôi phục: mất kết nối, rollback, replay.

### 23.1. Test Case chuẩn

| ID | Tình huống | Kết quả mong đợi |
|---|---|---|
| TC001 | Mỗi đội khởi tạo 8 quân trên bàn | Hợp lệ; mỗi đội có đúng 7 quân trong hàng chờ, tổng 15 |
| TC002 | Mỗi đội khởi tạo 10 quân trên bàn | Hợp lệ; mỗi đội có đúng 5 quân trong hàng chờ, tổng 15 |
| TC003 | Khởi tạo 11 quân trên bàn | Từ chối |
| TC033 | Hai đội khởi tạo số quân trên bàn khác nhau | Từ chối; số quân trên bàn phải bằng nhau |
| TC034 | Đội thiếu Chuột hoặc thiếu Voi trong tổng 15 quân | Từ chối khởi tạo |
| TC035 | Đội có đúng 15 quân, BOARD 9 và QUEUE 6 | Hợp lệ |
| TC036 | Sau khi hiệu ứng kết thúc, cả hai đội không còn quân trên bàn | Kết quả hòa |
| TC037 | Người chơi chọn KHÔNG XEM lịch sử | Bỏ qua hiển thị; lịch sử vẫn được lưu |
| TC038 | Người chơi chọn XEM LỊCH SỬ | Hiển thị bản ghi trận đấu theo thứ tự sự kiện |
| TC039 | Client cố sửa/xóa lịch sử | Server từ chối; bản ghi không thay đổi |
| TC040 | Hành động thất bại hoặc bị từ chối | Vẫn được ghi vào lịch sử nếu là sự kiện xử lý của trận |
| TC004 | Tổng quân đội vượt 15 | Từ chối |
| TC005 | Hai quân cùng ô | Từ chối |
| TC006 | Quân BOARD không có tọa độ hợp lệ | Từ chối/rollback |
| TC007 | Quân QUEUE có tọa độ trên bàn | Từ chối/rollback |
| TC008 | Quân úp di chuyển hợp lệ | Lật ngửa khi bắt đầu thực thi |
| TC009 | Di chuyển không hợp lệ | Không đổi trạng thái, không lật |
| TC010 | Triển khai quân hàng chờ | Quân xuất hiện FACE_UP |
| TC011 | Di chuyển chéo | Từ chối theo luật cơ bản |
| TC012 | Di chuyển quá một ô | Từ chối theo luật cơ bản |
| TC013 | Chuột tấn công Voi | Voi bị loại, Chuột giữ nguyên ô |
| TC014 | Voi tấn công Chuột | Voi bị loại, Chuột giữ nguyên ô |
| TC015 | Hai quân cùng Rank | Cả hai bị loại đồng thời |
| TC016 | Quân tấn công thắng theo Rank | Áp dụng quy tắc chiếm ô tương ứng |
| TC017 | Quân phòng thủ thắng | Phòng thủ giữ ô |
| TC018 | Lá Kéo Theo ACTIVE và chủ sở hữu bị đánh bại | Kích hoạt đúng một lần |
| TC019 | Quân ngẫu nhiên thuộc hàng chờ | Không được chọn |
| TC020 | Quân mục tiêu đã bị loại | Không được chọn |
| TC021 | Mục tiêu Kéo Theo đang úp | Lật ngửa rồi vô hiệu hóa lá và loại |
| TC022 | Mục tiêu có Lá Bí Mật | Vô hiệu hóa toàn bộ, không kích hoạt |
| TC023 | Mục tiêu cũng có Kéo Theo | Không tạo dây chuyền |
| TC024 | Không còn mục tiêu ngẫu nhiên hợp lệ | Bỏ qua bước chọn thêm |
| TC025 | Một đội hết quân trên bàn nhưng còn hàng chờ | Ghi nhận trạng thái; kết luận thắng/thua tổng quát đang chờ xác nhận |
| TC026 | Hai đội cùng hết quân trên bàn | Hòa |
| TC027 | Effect Queue chưa hoàn tất | Chưa kiểm tra kết thúc trận |
| TC028 | Gửi lại actionId đã commit | Không thực thi lần hai |
| TC029 | Hai request cùng state version | Không được commit xung đột |
| TC030 | Cùng Seed và cùng đầu vào | Kết quả random tái tạo giống nhau |
| TC031 | Client gửi Rank giả | Server bỏ qua/từ chối |
| TC032 | Mất kết nối rồi kết nối lại | Khôi phục trạng thái server |

## 24. Yêu cầu phi chức năng

- **Tính nhất quán:** mọi client nhận cùng một trạng thái chính thức.
- **Tính tái hiện:** replay được trận từ Seed và lịch sử.
- **Hiệu năng:** kiểm tra luật và giao dịch phải đủ nhanh để không làm gián đoạn lượt.
- **Khả năng mở rộng:** thêm loài/lá/hiệu ứng qua cấu hình và module, không rải điều kiện trong mã.
- **Khả năng bảo trì:** luật, giao diện, dữ liệu và đồng bộ tách biệt.
- **Khả năng truy vết:** mọi hành động/hiệu ứng có ID và lịch sử.

## 25. Roadmap phát triển đề xuất

1. **Core Board & State:** bàn 6×7, vùng 3–1–3, Game State và bất biến.
2. **Piece & Setup:** 9 loài, Rank, giới hạn 15, random 8–10 trên bàn, hàng chờ.
3. **Turn & Movement:** lượt, đồng hồ, di chuyển, lật ngửa, triển khai.
4. **Combat:** snapshot, Rank, Chuột–Voi, cùng Rank, chiếm ô.
5. **Secret Cards:** phân bổ, kích hoạt, vô hiệu hóa.
6. **Effect Queue:** Kéo Theo, Nổ Lan và chống vòng lặp.
7. **Victory & Match Flow:** thắng/thua/hòa, đầu hàng, timeout.
8. **Persistence & Multiplayer:** lưu, khôi phục, đồng bộ, chống gian lận.
9. **UI/UX:** bàn cờ, thông tin, lịch sử, phản hồi.
10. **QA & Release:** test case, replay, cân bằng và phát hành.

## 26. Các nội dung cần xác nhận trước khi phát hành

Không tự điền các điểm dưới đây bằng giả định:

| Nội dung | Trạng thái |
|---|---|
| Cách random chi tiết số lượng từng loài ngoài Chuột và Voi | CẦN XÁC NHẬN |
| Vị trí BOARD/QUEUE cụ thể của Chuột và Voi ở thời điểm khởi tạo | CẦN XÁC NHẬN |
| Cơ cấu loài có giống nhau giữa hai đội khi số quân trên bàn random độc lập | CẦN XÁC NHẬN |
| Số quân trên bàn khởi tạo | ĐÃ CHỐT: hai đội bằng nhau, trong khoảng 8–10 |
| Giới hạn 4 quân úp trong sân đối phương có bật ở mọi chế độ không | CẦN XÁC NHẬN |
| Chi tiết bảng chiến đấu cho đủ 8 tổ hợp úp/ngửa và hai đội | CẦN ĐỐI CHIẾU/DUYỆT; chưa tự suy diễn |
| Quy tắc chiếm ô trong từng trường hợp chiến đấu | CẦN XÁC NHẬN |
| Danh sách và điều kiện của toàn bộ Lá Bí Mật | CẦN XÁC NHẬN |
| Phân bổ Lá Bí Mật theo Rank | Giữ quy tắc V2.5, cần xác nhận cấu hình |
| Quy tắc Nổ Lan và thứ tự ưu tiên với Kéo Theo | CẦN XÁC NHẬN |
| Cách xử lý timeout 30 giây | CẦN XÁC NHẬN |
| Đội đi trước và cách chọn đội đi trước | CẦN XÁC NHẬN |
| Thời gian cho phép kết nối lại | CẦN XÁC NHẬN |
| Điều kiện đầu hàng và xử lý mất kết nối | CẦN XÁC NHẬN |
| Luật di chuyển đặc biệt theo từng loài (nếu có) | CẦN XÁC NHẬN |

---

# PHẦN III – CHI TIẾT KỸ THUẬT VÀ LUẬT BỔ SUNG ĐƯỢC KẾ THỪA TỪ V2.5

Phần này giữ lại các nội dung chuyên sâu của V2.5 chưa được diễn giải đầy đủ trong phần hợp nhất phía trên. Khi triển khai, phải áp dụng theo các quy tắc ưu tiên và bảng hợp nhất ở đầu tài liệu. Nếu phát hiện mâu thuẫn, quy tắc chuẩn V2.6 ở Phần I được ưu tiên; điểm chưa rõ phải đưa vào danh sách xác nhận.


---

# PHỤ LỤC A – TÀI LIỆU NGUỒN V2.5 (BẢN ĐẦY ĐỦ)

Nội dung dưới đây được giữ nguyên từ tài liệu V2.5 để tra cứu các bảng luật chi tiết, thuật toán, trường hợp úp/ngửa, chiếm ô, Lá Bí Mật, Nổ Lan, đồng hồ, lưu trữ, test case và tiêu chí hoàn thành. Đây là bản nguồn tham chiếu; các quy tắc xung đột phải theo Master Specification V2.6.

DARK ANIMAL CHESS
ULTIMATE EDITION – VERSION 2.5

COMPLETE GAME DESIGN DOCUMENT & TECHNICAL SPECIFICATION

Phiên bản: 2.5
Tên dự án: Dark Animal Chess
Loại tài liệu: README.md – Game Design Document (GDD) + Technical Design Document (TDD)
Trạng thái: Đặc tả phát triển chính thức, các mục được đánh dấu cần xác nhận vẫn chờ chốt
Ngôn ngữ: Tiếng Việt
Nền tảng: Web / Desktop / Mobile
Phiên bản luật: 2.5
MỤC LỤC
Giới thiệu dự án
Mục tiêu thiết kế
Tổng quan gameplay
Cấu trúc bàn cờ
Thành phần quân cờ
Hệ thống phân cấp sức mạnh
Cấu hình quân đầu trận
Hệ thống triển khai quân
Hệ thống hàng chờ
Hệ thống lượt chơi
Hệ thống di chuyển
Hệ thống chiến đấu
Cơ chế quân úp và quân ngửa
Quy tắc chiếm ô và giữ vị trí
Hệ thống Lá Bí Mật
Tương tác giữa các Lá Bí Mật
Cơ chế Kéo Theo
Hệ thống Nổ Lan và hiệu ứng đặc biệt
Hệ thống kiểm tra chiến thắng
Hệ thống đồng hồ
Hệ thống Random
Hệ thống thông tin bí mật
Giao diện người chơi
Kiến trúc dữ liệu
Quản lý trạng thái trận đấu
Hệ thống lưu trữ
Xử lý sự kiện và đồng bộ
Xử lý lỗi và chống xung đột
Bảo mật và chống gian lận
Thuật toán xử lý chiến đấu
Thuật toán triển khai quân
Luồng hoạt động của trận đấu
Các trường hợp ngoại lệ
Tiêu chuẩn kiểm thử
Danh sách Test Case
Yêu cầu hiệu năng
Yêu cầu giao diện và trải nghiệm
Cấu trúc thư mục đề xuất
Roadmap phát triển
Tiêu chí hoàn thành phiên bản 2.5
Các điểm cần xác nhận trước khi phát hành
Phụ lục A – Nguyên tắc không được vi phạm
Phụ lục B – Thuật ngữ
Phụ lục C – Tuyên bố phiên bản
1. GIỚI THIỆU DỰ ÁN
1.1. Tổng quan

Dark Animal Chess là trò chơi chiến thuật đối kháng giữa hai đội quân động vật: Đỏ và Xanh.

Trò chơi kết hợp:

Cờ chiến thuật theo lượt.
Quân cờ có cấp bậc sức mạnh.
Quân úp và quân ngửa.
Thông tin ẩn.
Triển khai quân.
Hàng chờ quân chưa triển khai.
Chiến đấu trực tiếp.
Các Lá Bí Mật có hiệu ứng đặc biệt.
Cơ chế khắc chế giữa các loài động vật.
Random thành phần quân và vị trí.
Quản lý thời gian cho từng lượt.
Hệ thống lịch sử và đồng bộ trận đấu.

Hai đội thi đấu trên bàn cờ kích thước 6 × 7, gồm 42 ô.

Mỗi đội có từ 8 đến 10 quân.

Hai đội luôn có số lượng quân bằng nhau trong chế độ đấu cân bằng.

Ví dụ:

Đội Đỏ	Đội Xanh	Tổng quân
8	8	16
9	9	18
10	10	20

Mỗi trận sử dụng một cấu hình quân động vật được random theo luật.

Hai loài Chuột và Voi bắt buộc phải xuất hiện trong thành phần quân của trận đấu.

Quân có thể xuất hiện ngay trên bàn cờ dưới trạng thái úp hoặc nằm trong hàng chờ để người chơi triển khai sau đó.

1.2. Nguyên tắc thiết kế

Trò chơi phải bảo đảm:

Công bằng: Hai đội có số quân bằng nhau và cùng cơ cấu loài.
Thông tin ẩn: Quân úp của đối phương không bị tiết lộ.
Chiến thuật: Người chơi lựa chọn giữa triển khai và di chuyển.
Minh bạch: Mọi kết quả chiến đấu có lịch sử và lý do.
Nhất quán: Mỗi hành động chỉ được thực hiện một lần.
Giới hạn hành động: Mỗi lượt chỉ có một hành động chính.
Giới hạn di chuyển: Mỗi lần di chuyển tối đa một ô.
Công bằng thời gian: Mỗi lượt có giới hạn 30 giây.
Tính tái tạo: Random phải có seed.
Bảo mật: Thông tin quân úp và Lá Bí Mật được bảo vệ tại máy chủ.
2. MỤC TIÊU THIẾT KẾ

Phiên bản 2.5 tập trung vào:

Điều chỉnh số quân thành 8–10 quân mỗi đội.
Giữ hai đội có số lượng quân bằng nhau.
Hoàn thiện danh sách 9 loài động vật hiện tại.
Cố định thứ tự sức mạnh của 9 loài.
Bắt buộc Chuột và Voi xuất hiện trong thành phần quân mỗi trận.
Chuẩn hóa random vị trí quân ban đầu.
Phân biệt quân trên bàn và quân trong hàng chờ.
Cho phép triển khai quân hoặc di chuyển quân ở các lượt phù hợp.
Chuẩn hóa chiến đấu cho cả Đỏ và Xanh.
Hoàn thiện quy tắc chiến đấu úp/ngửa.
Xác định quy tắc Chuột luôn thắng Voi.
Quy định hai quân cùng cấp tự loại nhau.
Chuẩn hóa việc chiếm ô và giữ vị trí.
Hoàn thiện hệ thống Lá Bí Mật.
Bổ sung kiểm soát Kéo Theo và Nổ Lan.
Giữ đồng hồ 30 giây mỗi lượt.
Bổ sung cơ chế xử lý mất kết nối.
Tăng cường kiểm tra trạng thái và chống gian lận.
Hoàn thiện Test Case.
Không tự ý thay đổi những luật đã được xác nhận.
3. TỔNG QUAN GAMEPLAY
3.1. Người chơi

Một trận đấu gồm hai đội:

Đội Đỏ.
Đội Xanh.

Mỗi đội do một người chơi hoặc AI điều khiển.

3.2. Thành phần trận đấu
Thành phần	Quy định
Số đội	2
Quân mỗi đội	8–10
Tổng số quân	16–20
Số quân hai đội	Bằng nhau
Bàn cờ	6 × 7
Tổng số ô	42
Loài hiện tại	9
Trạng thái quân	Úp / Ngửa
Hàng chờ	Có
Lá Bí Mật	Có
Thời gian mỗi lượt	30 giây
Hành động chính mỗi lượt	1
Khoảng cách di chuyển	Tối đa 1 ô
Random	Có
Lịch sử	Có
3.3. Mục tiêu

Người chơi tìm cách đánh bại đội đối phương thông qua:

Triển khai quân hợp lý.
Di chuyển chiến thuật.
Tấn công quân đối phương.
Tận dụng cấp bậc sức mạnh.
Khai thác ngoại lệ Chuột – Voi.
Sử dụng Lá Bí Mật.
Chiếm giữ vị trí quan trọng.
3.4. Nguyên tắc kết thúc

Trận đấu có thể kết thúc bằng:

Một đội hết toàn bộ quân còn sống.
Một đội đầu hàng.
Hai đội không còn quân trên bàn cờ: hòa theo luật được xác nhận.

Hệ thống chiến thắng phải kiểm tra độc lập sau khi toàn bộ hành động và hiệu ứng hoàn tất.

4. CẤU TRÚC BÀN CỜ
4.1. Kích thước

Bàn cờ có 6 cột và 7 hàng.

6 × 7 = 42 ô.

4.2. Hệ tọa độ
Cột: A, B, C, D, E, F.
Hàng: 1, 2, 3, 4, 5, 6, 7.

Ví dụ:

A1, B3, C5, F7.

Mỗi ô có ID duy nhất.

4.3. Phân chia sân

Bàn cờ được chia thành:

Sân nhà Đỏ.
Sân nhà Xanh.

Ranh giới hai sân phải được hiển thị rõ ràng.

Quân được phép đi sang sân đối phương.

Sân nhà không phải khu vực cấm di chuyển.

4.4. Quy tắc chiếm ô
Mỗi ô chỉ có tối đa một quân còn sống.
Không được triển khai vào ô đang có quân.
Không được di chuyển ra ngoài bàn.
Không được di chuyển vào ô đồng đội.
Có thể di chuyển vào ô đối phương nếu hành động tấn công hợp lệ.
Quân bị loại phải được xử lý và giải phóng ô đúng quy trình.
Quân chiến thắng chỉ được chiếm ô nếu luật chiến đấu cho phép.
5. THÀNH PHẦN QUÂN CỜ
5.1. Danh sách loài hiện tại

Phiên bản 2.5 sử dụng 9 loài động vật đã xác định:

Loài	ID
Chuột	mouse
Mèo	cat
Chó	dog
Sói	wolf
Báo	leopard
Hổ	tiger
Sư Tử	lion
Gấu	bear
Voi	elephant

Đây là danh sách hiện tại.

Không tự ý bổ sung loài mới khi chưa có cập nhật luật.

5.2. Thuộc tính quân
Thuộc tính	Ý nghĩa
id	ID duy nhất
owner	Đội sở hữu
species	Loài động vật
rank	Cấp bậc
position	Vị trí
isFaceDown	Trạng thái úp
isAlive	Còn sống
locationType	BOARD / QUEUE / ELIMINATED
secretCardId	Lá Bí Mật
secretStatus	Trạng thái lá
activeEffects	Hiệu ứng đang áp dụng
createdAt	Thời điểm tạo
updatedAt	Thời điểm cập nhật
lastAction	Hành động gần nhất
5.3. Trạng thái quân
js
const PIECE_STATUS = {
    FACE_DOWN: "face_down",
    FACE_UP: "face_up",
    ALIVE: "alive",
    ELIMINATED: "eliminated"
};

const PIECE_LOCATION = {
    BOARD: "board",
    QUEUE: "queue",
    ELIMINATED: "eliminated"
};


Trạng thái úp/ngửa và sống/chết phải được lưu riêng.

Một quân có thể sống nhưng chưa triển khai.

Một quân bị loại không được tồn tại trên bàn hoặc trong hàng chờ.

6. HỆ THỐNG PHÂN CẤP SỨC MẠNH
6.1. Thứ tự sức mạnh cố định

Thứ tự Rank hiện tại được xác định như sau:

Rank	Loài	Mã
1	Chuột	mouse
2	Mèo	cat
3	Chó	dog
4	Sói	wolf
5	Báo	leopard
6	Hổ	tiger
7	Sư Tử	lion
8	Gấu	bear
9	Voi	elephant

Rank càng cao thì sức mạnh thông thường càng lớn.

Chuột là loài có cấp bậc thấp nhất.

Voi là loài có cấp bậc cao nhất.

Đây là thứ tự cố định của phiên bản 2.5, không random theo trận.

6.2. Ngoại lệ Chuột – Voi

Chuột luôn thắng Voi.

Quy tắc áp dụng:

Chuột úp đấu Voi úp.
Chuột úp đấu Voi ngửa.
Chuột ngửa đấu Voi úp.
Chuột ngửa đấu Voi ngửa.
Chuột là quân tấn công.
Chuột là quân phòng thủ.

Kết quả:

Chuột thắng.
Voi bị loại.
Chuột sống sót.
Không áp dụng so sánh Rank thông thường.
Không áp dụng kết quả hòa cùng cấp.
Chuột không được chiếm ô của Voi.
Chuột giữ nguyên vị trí ban đầu.

Nếu Chuột là quân tấn công, Chuột vẫn giữ ô xuất phát.

Nếu Chuột là quân phòng thủ, Chuột giữ ô phòng thủ.

Ngoại lệ này có độ ưu tiên cao nhất trong việc xác định kết quả chiến đấu.

Chuột không phải quân bất tử. Chuột vẫn có thể bị các quân khác loại theo Rank.

Voi cũng không phải quân bất tử.

6.3. Hai quân cùng cấp

Khi hai quân cùng Rank chiến đấu:

Cả hai quân đều bị loại.
Không có quân chiến thắng.
Không có quân chiếm ô.
Ô của cả hai quân được giải phóng.
Cả hai Lá Bí Mật được kiểm tra theo luật kích hoạt.
Sau khi hiệu ứng hoàn tất, hệ thống kiểm tra kết thúc trận.

Không sử dụng thứ tự xử lý sự kiện để quyết định quân nào sống.

6.4. Cấu hình sức mạnh
js
const SPECIES_CONFIG = {
    mouse: {
        id: "mouse",
        rank: 1,
        counters: ["elephant"]
    },

    cat: {
        id: "cat",
        rank: 2,
        counters: []
    },

    dog: {
        id: "dog",
        rank: 3,
        counters: []
    },

    wolf: {
        id: "wolf",
        rank: 4,
        counters: []
    },

    leopard: {
        id: "leopard",
        rank: 5,
        counters: []
    },

    tiger: {
        id: "tiger",
        rank: 6,
        counters: []
    },

    lion: {
        id: "lion",
        rank: 7,
        counters: []
    },

    bear: {
        id: "bear",
        rank: 8,
        counters: []
    },

    elephant: {
        id: "elephant",
        rank: 9,
        counters: []
    }
};

6.5. Hàm xác định kết quả
js
function determineCombatResult(attacker, defender) {
    if (
        attacker.species === "mouse" &&
        defender.species === "elephant"
    ) {
        return "ATTACKER_WINS";
    }

    if (
        attacker.species === "elephant" &&
        defender.species === "mouse"
    ) {
        return "DEFENDER_WINS";
    }

    if (attacker.rank > defender.rank) {
        return "ATTACKER_WINS";
    }

    if (attacker.rank < defender.rank) {
        return "DEFENDER_WINS";
    }

    return "BOTH_ELIMINATED";
}


Hàm trên xác định kết quả sức mạnh cơ bản. Việc xử lý úp/ngửa, Lá Bí Mật và vị trí phải thực hiện ở các module riêng.

7. CẤU HÌNH QUÂN ĐẦU TRẬN
7.1. Số lượng quân

Mỗi đội được random từ 8 đến 10 quân.

js
const matchConfig = {
    minPiecesPerTeam: 8,
    maxPiecesPerTeam: 10,
    balancedTeams: true,
    boardColumns: 6,
    boardRows: 7
};


Quy trình:

Random một số nguyên từ 8 đến 10.
Gán cùng số lượng cho Đỏ và Xanh.
Tạo cơ cấu loài hợp lệ.
Bảo đảm Chuột và Voi xuất hiện.
Sử dụng cùng cơ cấu loài cho hai đội.
Xáo trộn thứ tự quân.
Gán ID riêng.
Random trạng thái quân theo cấu hình.
Phân bổ Lá Bí Mật.
Random vị trí các quân được đặt ban đầu.
Đưa các quân còn lại vào hàng chờ.

Không random số quân hai đội độc lập.

7.2. Random cơ cấu quân

Ví dụ trận đấu có 8 quân mỗi đội:

Loài	Số lượng
Chuột	1
Mèo	1
Chó	1
Sói	1
Báo	1
Hổ	1
Sư Tử	1
Voi	1
Tổng	8

Đây chỉ là một ví dụ.

Hệ thống có thể tạo cơ cấu khác.

Điều kiện:

Không tạo loài ngoài cấu hình.
Không vượt số quân cho phép.
Hai đội có cơ cấu giống nhau.
Mỗi đội có ít nhất một Chuột.
Mỗi đội có ít nhất một Voi.
Không tự ý thay đổi Rank.
Không tạo trùng ID.

Nếu số quân vượt số loài thì các loài được phép xuất hiện nhiều quân theo cấu hình phân bổ.

7.3. Random vị trí ban đầu

Khi trận đấu bắt đầu:

Hệ thống tạo bàn cờ 6 × 7.
Random các quân được đặt ban đầu của cả hai đội.
Quân ban đầu trên bàn ở trạng thái úp.
Vị trí phải nằm trong các ô hợp lệ.
Không được trùng ô.
Hai đội phải có cách phân bổ công bằng.
Các quân chưa được đặt ban đầu nằm trong hàng chờ.

Vị trí random phải tuân thủ giới hạn quân úp trong sân đối phương.

Không được đặt quân ngoài bàn.

Không được đặt hai quân cùng ô.

Không được đưa cùng một quân vừa lên bàn vừa vào hàng chờ.

Lưu ý cấu hình: Số quân được random đặt lên bàn ngay từ đầu phải là một tham số riêng. Tài liệu chưa ấn định số lượng cụ thể.

7.4. Random Seed
js
const matchConfig = {
    seed: "MATCH_RANDOM_SEED",
    pieceCountPerTeam: 8,
    boardColumns: 6,
    boardRows: 7
};


Seed phải cho phép tái tạo:

Thành phần quân.
Thứ tự quân.
Vị trí khởi tạo.
Trạng thái úp/ngửa.
Phân bổ Lá Bí Mật.
Thứ tự random khác.

Seed phải được tạo và quản lý phía máy chủ.

Không cho client tự thay đổi seed.

Không công khai seed hoặc dữ liệu có thể làm lộ thông tin bí mật trong khi trận đang diễn ra.

8. HỆ THỐNG TRIỂN KHAI QUÂN
8.1. Tổng quan

Đầu trận, hệ thống đã random một số quân úp trên bàn cờ.

Những quân còn lại được đưa vào hàng chờ.

Trong quá trình chơi, người chơi có thể lựa chọn:

DEPLOY: Triển khai một quân từ hàng chờ lên bàn.
MOVE: Di chuyển một quân đang có trên bàn.

Hai hành động này đều là hành động chính của lượt.

8.2. Giai đoạn triển khai đầu trận

Khi trận bắt đầu:

Khởi tạo hai đội.
Random cơ cấu quân.
Random các quân ban đầu trên bàn.
Đưa quân chưa được đặt vào hàng chờ.
Kiểm tra số quân.
Kiểm tra vị trí.
Kiểm tra giới hạn sân.
Bắt đầu lượt đầu tiên.

Giai đoạn triển khai chỉ quản lý các quân còn trong hàng chờ.

Không được tạo thêm quân trong quá trình triển khai.

8.3. Các lượt tiếp theo

Người chơi được lựa chọn một trong hai hành động:

js
const ACTION_TYPES = {
    DEPLOY: "deploy",
    MOVE: "move"
};


Người chơi không bắt buộc phải triển khai nếu muốn di chuyển.

Người chơi không bắt buộc phải di chuyển nếu muốn triển khai.

8.4. Điều kiện triển khai
Đúng lượt.
Trận đang hoạt động.
Quân thuộc đội hiện tại.
Quân còn sống.
Quân đang nằm trong hàng chờ.
Ô đích nằm trong bàn cờ.
Ô đích chưa có quân.
Không vượt giới hạn triển khai.
Chưa sử dụng hành động chính.
Đồng hồ chưa hết.
8.5. Vị trí triển khai

Người chơi có thể triển khai vào bất kỳ ô trống hợp lệ nào trên bàn cờ.

Không bắt buộc triển khai vào sân nhà.

Có thể triển khai vào sân đối phương.

Tuy nhiên, quân úp trong sân đối phương bị giới hạn số lượng.

8.6. Giới hạn quân úp trong sân đối phương

Giữ quy tắc của phiên bản trước:

js
const deploymentRules = {
    maxFaceDownPiecesInEnemyTerritory: 4
};


Mặc định tối đa 4 quân úp trong sân đối phương cho mỗi đội.

Giới hạn có thể được cấu hình trong khoảng 3–5 nếu luật chế độ cho phép.

Chỉ đếm quân:

Còn sống.
Đang ở trên bàn.
Đang úp.
Thuộc đội đối phương của khu vực đang xét.

Không tính:

Quân đã bị loại.
Quân trong hàng chờ.
Quân đã lật ngửa.

Giới hạn được kiểm tra khi:

Khởi tạo random.
Triển khai quân.
Di chuyển quân úp.
Khôi phục trận.
Cập nhật sau chiến đấu.
Thực hiện hiệu ứng thay đổi vị trí.
8.7. Giới hạn một hành động

Mỗi lượt chỉ được triển khai một quân hoặc di chuyển một quân.

Không được:

Triển khai hai quân.
Di chuyển hai quân.
Triển khai rồi di chuyển.
Di chuyển rồi triển khai.

Các hiệu ứng tự động không được tính là hành động chính thứ hai.

9. HỆ THỐNG HÀNG CHỜ
9.1. Tổng quan

Hàng chờ chứa các quân còn sống nhưng chưa được triển khai lên bàn.

9.2. Tự động cập nhật

Hàng chờ được cập nhật khi:

Bắt đầu trận.
Triển khai thành công.
Khôi phục trận.
Đồng bộ trạng thái.
Có hiệu ứng đưa quân về hàng chờ nếu luật cho phép.
9.3. Quy trình triển khai
Chọn quân.
Chọn ô.
Kiểm tra lượt.
Kiểm tra quyền sở hữu.
Kiểm tra quân còn sống.
Kiểm tra hàng chờ.
Kiểm tra ô.
Kiểm tra giới hạn sân.
Commit triển khai.
Xóa quân khỏi hàng chờ.
Cập nhật bàn cờ.
Cập nhật bộ đếm.
Ghi lịch sử.
Kết thúc hành động.
9.4. Hàng chờ còn một quân

Không khóa triển khai chỉ vì hàng chờ còn một quân.

Giữ nguyên ngoại lệ của phiên bản trước.

Tuy nhiên, ngoại lệ này không cho phép triển khai nhiều quân trong cùng một lượt.

js
const deploymentState = {
    queueCount: 0,
    lastTurnDeployedCount: 0,
    allowLastPieceException: true
};

10. HỆ THỐNG LƯỢT CHƠI
10.1. Nguyên tắc

Đỏ và Xanh luân phiên thực hiện hành động.

Mỗi lượt chỉ có một người chơi được quyền hành động.

10.2. Lượt đầu tiên
Trận bắt đầu.
Hệ thống khởi tạo quân.
Random vị trí ban đầu.
Tạo hàng chờ.
Bắt đầu giai đoạn triển khai.
Người chơi thực hiện một hành động hợp lệ.
Kết thúc hành động.
Chuyển lượt.

Giai đoạn đầu ưu tiên triển khai quân còn trong hàng chờ.

Nếu cấu hình cho phép hành động tự do ngay từ lượt đầu, người chơi có thể chọn MOVE hoặc DEPLOY.

10.3. Các lượt tiếp theo

Mỗi lượt:

Bắt đầu lượt.
Khởi động đồng hồ 30 giây.
Xác định người chơi hiện tại.
Hiển thị quyền hành động.
Người chơi chọn DEPLOY hoặc MOVE.
Kiểm tra hành động.
Thực hiện hành động.
Xử lý chiến đấu.
Xử lý Lá Bí Mật.
Xử lý hiệu ứng.
Cập nhật bàn cờ.
Kiểm tra chiến thắng.
Kết thúc hành động.
Chuyển lượt.
10.4. Giới hạn hành động
js
const turnState = {
    currentPlayer: "red",
    turnNumber: 1,
    phase: "ACTION",
    selectedAction: null,
    actionCount: 0,
    maxPrimaryActions: 1,
    turnStartedAt: null,
    turnEndedAt: null
};


Một hành động MOVE có thể phát sinh chiến đấu và hiệu ứng.

Những hiệu ứng này thuộc cùng một hành động chính.

Sau khi hành động hoàn tất, không cho phép thực hiện hành động thứ hai.

11. HỆ THỐNG DI CHUYỂN
11.1. Nguyên tắc

Mỗi lần di chuyển chỉ được đi tối đa một ô.

Mặc định cho phép:

Trên.
Dưới.
Trái.
Phải.

Không cho phép đi chéo nếu luật gốc chưa bổ sung.

11.2. Giới hạn di chuyển

Mỗi hành động MOVE:

Chỉ chọn một quân.
Chỉ chọn một ô đích.
Khoảng cách tối đa một ô.
Không đi xuyên qua quân khác.
Không đi ra ngoài bàn.
Không đi vào ô đồng đội.
Có thể tấn công ô đối phương.
Không di chuyển tiếp sau khi chiến đấu.
11.3. Kiểm tra hợp lệ
js
function validateMove(game, piece, destination) {
    if (!piece || !piece.isAlive) {
        return false;
    }

    if (!isInsideBoard(destination)) {
        return false;
    }

    if (!isCurrentPlayerPiece(game, piece)) {
        return false;
    }

    if (!isAdjacent(piece.position, destination)) {
        return false;
    }

    if (isOccupiedByAlly(game, piece, destination)) {
        return false;
    }

    if (!isMovementAllowed(piece, destination)) {
        return false;
    }

    if (!isDeploymentLimitValid(
        game,
        piece,
        destination
    )) {
        return false;
    }

    return true;
}

11.4. Sau khi di chuyển

Sau khi di chuyển thành công:

Tạo snapshot nếu phát sinh chiến đấu.
Xác định kết quả.
Xử lý quân thắng và thua.
Xử lý vị trí.
Cập nhật bộ đếm.
Xử lý Lá Bí Mật.
Xử lý hiệu ứng.
Ghi lịch sử.
Kết thúc hành động.

Không cho phép di chuyển thêm trong lượt.

12. HỆ THỐNG CHIẾN ĐẤU
12.1. Nguyên tắc

Cả Đỏ và Xanh đều có quyền tấn công.

Không có đội nào chỉ được phòng thủ.

Chiến đấu phát sinh khi một quân di chuyển vào ô đang có quân đối phương.

12.2. Vai trò chiến đấu
Quân tấn công: Quân chủ động di chuyển đến ô đối phương.
Quân phòng thủ: Quân đang chiếm ô bị tấn công.

Cả hai vai trò có thể thuộc Đỏ hoặc Xanh.

12.3. Snapshot

Trước khi xử lý chiến đấu phải tạo snapshot bất biến.

js
const combatSnapshot = {
    combatId: "COMBAT_ID",

    attacker: {
        id: "A001",
        owner: "red",
        species: null,
        rank: null,
        isFaceDown: true,
        position: "C3",
        isAlive: true
    },

    defender: {
        id: "B001",
        owner: "blue",
        species: null,
        rank: null,
        isFaceDown: true,
        position: "C4",
        isAlive: true
    },

    capturedAt: Date.now()
};


Snapshot phải chứa đủ dữ liệu nội bộ để xử lý.

Không gửi toàn bộ dữ liệu bí mật cho người chơi không có quyền xem.

12.4. Quy tắc xác định kết quả

Thứ tự xác định:

Kiểm tra hai quân còn sống.
Tạo snapshot.
Kiểm tra Chuột – Voi.
Kiểm tra tương tác Lá Bí Mật.
Kiểm tra đội sở hữu.
Kiểm tra trạng thái úp/ngửa.
Kiểm tra Rank.
Xác định quân thắng hoặc thua.
Xử lý trường hợp cùng cấp.
Kiểm tra hiệu ứng cứu quân hoặc thay đổi kết quả.
Xử lý vị trí.
Commit kết quả.
Kiểm tra kết thúc trận.
12.5. Kết quả chiến đấu

Có ba kết quả cơ bản:

js
const COMBAT_RESULT = {
    ATTACKER_WINS: "attacker_wins",
    DEFENDER_WINS: "defender_wins",
    BOTH_ELIMINATED: "both_eliminated"
};


Ngoại lệ Chuột – Voi được kiểm tra trước khi so sánh Rank.

12.6. Kết thúc chiến đấu

Sau mỗi cuộc chiến:

Xác định quân bị loại.
Kích hoạt hiệu ứng nếu đủ điều kiện.
Xử lý vị trí.
Cập nhật trạng thái quân.
Cập nhật hàng chờ nếu hiệu ứng có tác động.
Ghi lịch sử.
Kiểm tra bất biến dữ liệu.
Kết thúc hành động chính.
13. CƠ CHẾ QUÂN ÚP VÀ QUÂN NGỬA
13.1. Nguyên tắc

Phải phân biệt:

Đội Đỏ.
Đội Xanh.
Quân úp.
Quân ngửa.
Quân tấn công.
Quân phòng thủ.

Không được chỉ dùng Rank để xử lý toàn bộ trường hợp.

13.2. Quy tắc chung

Quân úp không được tiết lộ danh tính cho đối phương trừ khi luật yêu cầu lật.

Việc tính sức mạnh vẫn sử dụng dữ liệu thật trong máy chủ.

Trạng thái úp/ngửa ảnh hưởng đến cách hiển thị và kết quả trạng thái sau chiến đấu.

13.3. Trường hợp A: Quân Đỏ úp bị quân Xanh tấn công

Nếu Xanh mạnh hơn:

Đỏ bị loại.
Xanh sống.
Xanh giữ trạng thái ngửa.
Xanh được xử lý vị trí theo quy tắc chiếm ô.
Ô của Đỏ được giải phóng.
Không được tiết lộ thông tin bí mật không cần thiết.

Nếu Xanh yếu hơn:

Xanh bị loại.
Đỏ sống.
Đỏ tiếp tục úp.
Đỏ giữ nguyên ô.
Không tiết lộ danh tính Đỏ.

Nếu cùng cấp:

Cả hai bị loại.
Cả hai ô được giải phóng.
Kiểm tra Lá Bí Mật của cả hai.

Nếu Chuột và Voi đối đầu:

Áp dụng ngoại lệ Chuột – Voi.
13.4. Trường hợp B: Quân Đỏ ngửa tấn công quân Xanh

Nếu Xanh mạnh hơn:

Đỏ bị loại.
Xanh sống.
Xanh giữ nguyên ô.
Đỏ không chiếm được ô Xanh.

Nếu Đỏ mạnh hơn:

Xanh bị loại.
Đỏ sống.
Đỏ ngửa.
Đỏ chiếm vị trí của Xanh.
Đỏ không được di chuyển tiếp.

Nếu cùng cấp:

Cả hai bị loại.
Không có quân chiếm ô.
13.5. Trường hợp C: Quân Xanh tấn công quân Đỏ ngửa

Áp dụng quy tắc đối xứng với trường hợp chiến đấu thông thường:

Nếu Xanh mạnh hơn:

Đỏ bị loại.
Xanh sống.
Xanh chiếm ô của Đỏ.
Xanh không di chuyển tiếp.

Nếu Xanh yếu hơn:

Xanh bị loại.
Đỏ giữ nguyên ô.
Đỏ không di chuyển.

Nếu cùng cấp:

Cả hai bị loại.
Hai ô được giải phóng.
13.6. Trường hợp D: Hai quân cùng úp

Khi hai quân úp chiến đấu:

Ghi nhận snapshot.
Lật cả hai quân để xác định kết quả.
Kiểm tra Chuột – Voi.
So sánh Rank.
Xử lý kết quả.
Quân sống sót chuyển sang trạng thái ngửa.
Nếu cùng cấp, cả hai bị loại.
Cập nhật vị trí.
Ghi lịch sử.
13.7. Trường hợp E: Quân Đỏ úp tấn công quân Xanh ngửa

Nếu Đỏ thắng:

Xanh bị loại.
Đỏ sống.
Đỏ tiếp tục úp.
Đỏ được xử lý chiếm ô theo quy tắc tấn công.
Không tự động tiết lộ danh tính Đỏ.

Nếu Đỏ thua:

Đỏ bị loại.
Xanh sống.
Xanh giữ nguyên ô.

Nếu cùng cấp:

Cả hai bị loại.
13.8. Trường hợp F: Quân Xanh úp bị quân Đỏ tấn công

Áp dụng đối xứng với trường hợp A.

Nếu Đỏ mạnh hơn:

Xanh bị loại.
Đỏ sống.
Đỏ ngửa.
Đỏ được xử lý chiếm ô theo quy tắc tấn công.

Nếu Đỏ yếu hơn:

Đỏ bị loại.
Xanh sống.
Xanh giữ trạng thái úp.
Xanh giữ nguyên ô.

Nếu cùng cấp:

Cả hai bị loại.
13.9. Trường hợp G: Quân Xanh ngửa tấn công quân Đỏ úp

Áp dụng đối xứng với trường hợp E.

Nếu Xanh thắng:

Đỏ bị loại.
Xanh sống.
Xanh tiếp tục ngửa.
Xanh được xử lý chiếm ô.

Nếu Xanh thua:

Xanh bị loại.
Đỏ sống.
Đỏ tiếp tục úp.
Đỏ giữ nguyên ô.

Nếu cùng cấp:

Cả hai bị loại.
13.10. Trường hợp H: Quân Xanh ngửa tấn công quân Đỏ ngửa

Nếu Xanh mạnh hơn:

Đỏ bị loại.
Xanh sống.
Xanh chiếm ô Đỏ.

Nếu Xanh yếu hơn:

Xanh bị loại.
Đỏ giữ ô.

Nếu cùng cấp:

Cả hai bị loại.
13.11. Bảng tổng hợp chiến đấu
Trường hợp	Kết quả
Đỏ úp bị Xanh mạnh tấn công	Đỏ bị loại
Đỏ úp bị Xanh yếu tấn công	Xanh bị loại
Đỏ ngửa tấn công Xanh mạnh hơn	Đỏ bị loại
Đỏ ngửa tấn công Xanh yếu hơn	Xanh bị loại, Đỏ chiếm ô
Xanh úp bị Đỏ mạnh tấn công	Xanh bị loại
Xanh úp bị Đỏ yếu tấn công	Đỏ bị loại
Xanh ngửa tấn công Đỏ mạnh hơn	Xanh bị loại
Xanh ngửa tấn công Đỏ yếu hơn	Đỏ bị loại, Xanh chiếm ô
Hai quân cùng cấp	Cả hai bị loại
Hai quân cùng úp	Lật cả hai rồi xử lý
Chuột gặp Voi	Chuột thắng
13.12. Nguyên tắc ưu tiên
Kiểm tra quân sống.
Tạo snapshot.
Kiểm tra Chuột – Voi.
Kiểm tra hai Lá Bí Mật.
Kiểm tra trạng thái quân.
So sánh Rank.
Xử lý hòa cùng cấp.
Kiểm tra hiệu ứng.
Xác định loại quân.
Xác định vị trí.
Cập nhật trạng thái.
Kiểm tra chiến thắng.
14. QUY TẮC CHIẾM Ô VÀ GIỮ VỊ TRÍ
14.1. Nguyên tắc

Quân thắng không phải lúc nào cũng được di chuyển đến ô của quân thua.

Phải phân biệt:

Quân tấn công.
Quân phòng thủ.
Quân chiến thắng.
Ngoại lệ khắc chế.
14.2. Quân tấn công thắng

Thông thường:

Quân phòng thủ bị loại.
Ô phòng thủ được giải phóng.
Quân tấn công chiếm ô đó.
Cập nhật vị trí.
Kết thúc hành động.

Nếu quân tấn công đang úp, trạng thái úp được giữ nguyên trừ khi luật chiến đấu yêu cầu lật.

14.3. Quân phòng thủ thắng
Quân tấn công bị loại.
Quân phòng thủ giữ nguyên ô.
Không tự động di chuyển quân phòng thủ.
14.4. Hai quân cùng cấp
Cả hai bị loại.
Không có quân chiếm ô.
Hai ô được giải phóng.
14.5. Ngoại lệ Chuột – Voi

Khi Chuột thắng Voi:

Voi bị loại.
Chuột giữ nguyên vị trí trước chiến đấu.
Chuột không chiếm ô Voi.
Không áp dụng quy tắc chiếm ô thông thường.
15. HỆ THỐNG LÁ BÍ MẬT
15.1. Tổng quan

Lá Bí Mật là hiệu ứng đặc biệt được gắn ngẫu nhiên với quân.

Lá được quản lý độc lập với Rank và trạng thái úp/ngửa.

15.2. Quy tắc phân bổ

Lá Bí Mật chỉ được phân bổ cho quân:

Có cấp bậc từ 2 trở lên.
Thấp hơn cấp cao nhất.
Không phải quân cấp thấp nhất.
Không phải quân cấp cao nhất.

Với bảng Rank hiện tại từ 1 đến 9:

Rank	Loài	Có thể nhận lá
1	Chuột	Không
2	Mèo	Có
3	Chó	Có
4	Sói	Có
5	Báo	Có
6	Hổ	Có
7	Sư Tử	Có
8	Gấu	Có
9	Voi	Không

Nếu cấu hình Rank thay đổi, hệ thống tự xác định cấp cao nhất và thấp nhất.

Không viết cứng điều kiện cấp 9 trong thuật toán.

15.3. Random Lá Bí Mật

Quy trình:

Tạo danh sách quân hợp lệ.
Lọc quân từ cấp 2 đến cấp dưới cấp cao nhất.
Random quân nhận lá.
Random loại lá.
Gắn ID lá.
Lưu trạng thái bí mật.
Không tiết lộ lá cho đối phương.

Mặc định giữ tối đa hai Lá Bí Mật mỗi đội.

Nếu không đủ quân hợp lệ, không ép phân bổ lá lên quân không đủ điều kiện.

15.4. Điều kiện kích hoạt

Lá Bí Mật được kích hoạt khi quân sở hữu bị loại.

Không kích hoạt chỉ vì:

Quân bị tấn công nhưng vẫn sống.
Quân di chuyển.
Quân được triển khai.
Quân bị lật ngửa.
Quân tham gia chiến đấu nhưng không bị loại.

Quy trình:

Xác định quân sắp bị loại.
Kiểm tra Lá Bí Mật.
Kiểm tra trạng thái lá.
Đưa lá vào trạng thái TRIGGERING.
Xác định mục tiêu.
Xử lý hiệu ứng.
Cập nhật quân.
Commit kết quả.
Ghi lịch sử.

Nếu hiệu ứng có khả năng cứu quân, phải xử lý trước khi commit loại quân cuối cùng.

15.5. Trạng thái Lá Bí Mật
js
const SECRET_CARD_STATUS = {
    AVAILABLE: "available",
    TRIGGERING: "triggering",
    ACTIVATED: "activated",
    DISABLED: "disabled",
    CONSUMED: "consumed"
};

Trạng thái	Ý nghĩa
AVAILABLE	Lá còn chức năng
TRIGGERING	Đang xử lý
ACTIVATED	Đã kích hoạt
DISABLED	Bị vô hiệu hóa
CONSUMED	Đã sử dụng xong
15.6. Nguyên tắc
Một lá không được kích hoạt nhiều lần.
Lá đã vô hiệu hóa không được kích hoạt.
Lá chỉ kích hoạt theo điều kiện quân sở hữu bị loại.
Mọi kích hoạt phải có ID sự kiện.
Mọi hiệu ứng phải được ghi lịch sử.
16. TƯƠNG TÁC GIỮA CÁC LÁ BÍ MẬT
16.1. Hai Lá Bí Mật đối đầu

Khi hai quân đối đầu và cả hai cùng sở hữu Lá Bí Mật còn hoạt động:

Kiểm tra trạng thái hai lá.
Hai lá bị vô hiệu hóa.
Không loại quân chỉ vì lá đối đầu.
Tiếp tục tính chiến đấu theo Rank.
Không kích hoạt hai lá trong cùng giao dịch nếu đã bị vô hiệu hóa.
16.2. Phân biệt thao tác

Phải phân biệt:

Vô hiệu hóa lá.
Kích hoạt lá.
Tiêu thụ lá.
Loại quân.
Di chuyển quân.
Hủy hiệu ứng.

Không dùng chung một thao tác destroy() cho mọi trường hợp.

16.3. Kích hoạt khi quân bị loại

Nếu lá còn hoạt động:

Kích hoạt hiệu ứng.
Ghi nguồn kích hoạt.
Xác định mục tiêu.
Kiểm tra hiệu ứng.
Xử lý kết quả.
Hoàn tất loại quân.
Kiểm tra trạng thái trận.
17. CƠ CHẾ KÉO THEO
17.1. Tổng quan

Kéo Theo là loại Lá Bí Mật có hiệu ứng chọn quân đối phương làm mục tiêu.

17.2. Quy trình
Quân sở hữu bị loại.
Kiểm tra Lá Kéo Theo.
Kích hoạt nếu lá còn hoạt động.
Chọn mục tiêu hợp lệ.
Kiểm tra mục tiêu còn sống.
Kiểm tra quyền sở hữu.
Kiểm tra hiệu ứng.
Xử lý Lá Bí Mật của mục tiêu nếu luật cho phép.
Thực hiện hiệu ứng.
Cập nhật bàn cờ.
Ghi lịch sử.
17.3. Mục tiêu có Lá Bí Mật

Nếu Kéo Theo có quyền vô hiệu hóa Lá Bí Mật mục tiêu:

Lá mục tiêu bị vô hiệu hóa.
Quân mục tiêu tiếp tục bị xử lý.
Việc vô hiệu hóa lá không đồng nghĩa với việc quân được cứu sống.
17.4. Mục tiêu không hợp lệ

Không được chọn:

Quân đã bị loại.
Quân cùng đội.
Quân không tồn tại.
Quân không đáp ứng điều kiện.
Quân đã được xử lý trong cùng hiệu ứng.
18. HỆ THỐNG NỔ LAN VÀ HIỆU ỨNG ĐẶC BIỆT
18.1. Nguyên tắc

Mọi hiệu ứng phát sinh phải được quản lý thông qua Effect Queue.

js
const effectQueue = [];

18.2. Cấu trúc sự kiện
js
const effectEvent = {
    id: "EFFECT_ID",
    type: "ELIMINATE",
    sourcePieceId: "A001",
    targetPieceId: "B001",
    status: "pending",
    parentEventId: null,
    createdAt: null
};

18.3. Chống kích hoạt lặp
Mỗi sự kiện có ID duy nhất.
Mỗi sự kiện chỉ được commit một lần.
Hiệu ứng đã hoàn thành không chạy lại.
Không cho phép chuỗi hiệu ứng vô hạn.
Có giới hạn sự kiện mỗi giao dịch.
Có thể rollback khi chuỗi hiệu ứng không hợp lệ.
18.4. Thứ tự xử lý
Tạo sự kiện.
Kiểm tra nguồn.
Kiểm tra mục tiêu.
Kiểm tra quyền tác động.
Kiểm tra Lá Bí Mật.
Thực thi hiệu ứng.
Cập nhật trạng thái.
Ghi lịch sử.
Đánh dấu hoàn thành.
18.5. Nổ Lan

Nổ Lan phải được quản lý bằng cấu hình riêng.

Mỗi loại Nổ Lan cần xác định:

Điều kiện kích hoạt.
Phạm vi ảnh hưởng.
Loại quân chịu tác động.
Có phân biệt Đỏ và Xanh hay không.
Có tác động đến quân úp hay không.
Có thể kích hoạt Lá Bí Mật dây chuyền hay không.
Giới hạn số lần phát sinh.
Điều kiện kết thúc.

Không tự ý suy diễn phạm vi hoặc sức mạnh của Nổ Lan khi chưa có luật gốc.

19. HỆ THỐNG KIỂM TRA CHIẾN THẮNG
19.1. Nguyên tắc

Chỉ kiểm tra chiến thắng sau khi:

Hành động hoàn tất.
Chiến đấu hoàn tất.
Lá Bí Mật hoàn tất.
Effect Queue hoàn tất.
Trạng thái bàn cờ được xác nhận.
19.2. Dữ liệu đội
js
const teamState = {
    red: {
        totalPieces: 8,
        alivePieces: 8,
        queuePieces: 3,
        boardPieces: 5
    },

    blue: {
        totalPieces: 8,
        alivePieces: 8,
        queuePieces: 3,
        boardPieces: 5
    }
};


Số liệu chỉ mang tính minh họa.

19.3. Trạng thái trận
js
const MATCH_STATUS = {
    WAITING: "waiting",
    SETUP: "setup",
    DEPLOYMENT: "deployment",
    PLAYING: "playing",
    RESOLVING: "resolving",
    FINISHED: "finished",
    CANCELLED: "cancelled"
};

19.4. Điều kiện thắng/thua tổng quát

Chưa chốt điều kiện thắng/thua tổng quát. Không sử dụng các điều kiện thắng/thua được ghi trong những phần tài liệu nguồn cũ như quyết định cuối cùng cho đến khi người dùng xác nhận.

19.5. Điều kiện hòa

Nếu cả hai đội không còn quân nào trên bàn cờ sau khi toàn bộ hiệu ứng hoàn tất:

Trận đấu kết thúc hòa.

Điều kiện này áp dụng theo quy tắc hòa đã được xác nhận, kể cả khi dữ liệu hàng chờ vẫn còn quân.

Hệ thống phải kiểm tra điều kiện hòa sau khi hoàn tất giao dịch và trước khi mở lượt mới.

19.6. Thứ tự kiểm tra kết thúc
- Kiểm tra trận đã được đánh dấu kết thúc hay chưa.
- Chờ Effect Queue xử lý xong toàn bộ sự kiện của hành động hiện tại.
- Nếu cả hai đội đều không còn quân sống trên bàn: kết thúc hòa.
- Các trường hợp thắng/thua khác chỉ được xử lý sau khi điều kiện thắng/thua tổng quát được người dùng chốt.
- Nếu chưa có điều kiện kết thúc đã được xác nhận: tiếp tục trận.
20. HỆ THỐNG ĐỒNG HỒ
20.1. Thời gian mỗi lượt

Mỗi lượt có 30 giây.

Áp dụng cho cả Đỏ và Xanh.

Không chia thành đồng hồ chọn hành động và đồng hồ thực hiện hành động.

20.2. Quy tắc
Đồng hồ bắt đầu khi lượt mới mở.
Đồng hồ dừng khi hành động được xác nhận và lượt kết thúc.
Chiến đấu đang xử lý không bị ngắt giữa giao dịch.
Chuyển lượt thì đồng hồ bắt đầu lại từ 30 giây.
Khi trận kết thúc, đồng hồ dừng.
Người chơi không thể tự đặt lại đồng hồ.
Tải lại trang phải khôi phục deadline từ máy chủ.
20.3. Hết giờ

Quy tắc mặc định:

Nếu hết 30 giây mà chưa thực hiện hành động hợp lệ, lượt được tính là bỏ qua.
Hệ thống chuyển lượt cho đối phương.
Ghi lịch sử TIMEOUT.
Không tự ý di chuyển quân.
Không tự ý triển khai quân.
Không tự ý loại quân.

Có thể cấu hình số lượt bỏ qua liên tiếp trước khi xử lý thua do không hoạt động.

20.4. Dữ liệu
js
const timerState = {
    durationMs: 30000,
    startedAt: null,
    deadlineAt: null,
    remainingMs: 30000,
    isRunning: false
};


Sử dụng deadline tuyệt đối trên máy chủ.

21. HỆ THỐNG RANDOM
21.1. Mục tiêu

Random phải:

Công bằng.
Có thể tái tạo.
Không trùng ID.
Không tạo quân ngoài cấu hình.
Không thay đổi kết quả chiến đấu.
Không làm lộ thông tin bí mật.
21.2. Những thứ được random
Số quân mỗi đội: 8–10.
Thành phần loài theo cấu hình.
Thứ tự quân.
Vị trí khởi tạo.
Trạng thái úp/ngửa theo cấu hình.
Quân nhận Lá Bí Mật.
Loại Lá Bí Mật.
Thứ tự triển khai.
21.3. Những thứ không được random tùy tiện
Kết quả chiến đấu.
Quyền sở hữu.
Thứ tự sức mạnh.
Kết quả hiệu ứng đã xác định.
Điều kiện thắng.
Trạng thái đã commit.
Kết quả lịch sử.
21.4. Random cân bằng

Trong chế độ tiêu chuẩn:

Hai đội có số quân bằng nhau.
Hai đội có cùng cơ cấu loài.
Hai đội có cùng thứ tự Rank.
Có thể hoán đổi vị trí xuất phát để cân bằng.
Không cho phép một đội nhận lợi thế sức mạnh chỉ vì random.
21.5. Kiểm chứng Random

Máy chủ lưu:

Seed.
Phiên bản thuật toán random.
Cấu hình trận.
Thành phần quân.
Vị trí khởi tạo.
Kết quả phân bổ lá.

Sau trận có thể cung cấp dữ liệu kiểm chứng tính tái tạo mà không tiết lộ dữ liệu riêng tư trong khi trận còn diễn ra.

22. HỆ THỐNG THÔNG TIN BÍ MẬT
22.1. Quân của mình

Người chơi được xem:

Loài.
Cấp bậc.
Trạng thái.
Lá Bí Mật thuộc quyền sở hữu.
Hiệu ứng riêng.
22.2. Quân úp đối phương

Chỉ hiển thị:

Mặt sau quân.
Vị trí.
Trạng thái còn sống.

Không hiển thị:

Loài.
Rank.
ID nội bộ.
Lá Bí Mật.
Hiệu ứng bí mật.
22.3. Bảo vệ dữ liệu

Không gửi toàn bộ thông tin quân úp xuống trình duyệt rồi chỉ ẩn bằng CSS.

Phải lọc dữ liệu tại máy chủ hoặc tầng quản lý quyền truy cập.

22.4. Lịch sử chiến đấu (Battle History)

Lịch sử chiến đấu là bản ghi do server tạo để người chơi có thể kiểm tra lại diễn biến trận đấu sau khi trận kết thúc, góp phần bảo đảm tính minh bạch.

**Thời điểm và cách truy cập**
- Khi trận đấu kết thúc, màn hình kết quả cung cấp hai lựa chọn: `XEM LỊCH SỬ` hoặc `KHÔNG XEM`.
- Đây là lựa chọn tự nguyện; người chơi không bị bắt buộc mở lịch sử.
- Cả hai người chơi trong trận đều có thể xem cùng một bản ghi lịch sử của trận đấu.
- Lựa chọn không xem chỉ bỏ qua màn hình lịch sử, không xóa hoặc ngăn việc lưu bản ghi.

**Nội dung cần ghi nhận**
- Thứ tự và số lượt của từng hành động.
- Người chơi thực hiện hành động và loại hành động (di chuyển, triển khai, tấn công, đầu hàng hoặc hành động hợp lệ khác).
- Quân tham gia hành động, vị trí trước/sau nếu có thể công khai theo luật.
- Kết quả hành động, bao gồm cả thành công, thất bại hoặc bị từ chối.
- Kết quả chiến đấu, quân bị loại và nguyên nhân bị loại.
- Lá Bí Mật/hiệu ứng được kích hoạt, bị vô hiệu hóa hoặc bị bỏ qua theo đúng quy tắc.
- Các hiệu ứng phát sinh và thứ tự xử lý của chúng.
- Thời điểm sự kiện nếu hệ thống có ghi nhận timestamp.

**Tính toàn vẹn và bảo mật**
- Server là nguồn dữ liệu chuẩn; client không được tự tạo, sửa hoặc xóa kết quả lịch sử.
- Lịch sử phải phản ánh đúng thứ tự sự kiện đã được server commit, kể cả các hiệu ứng phụ.
- Chỉ ghi/hiển thị thông tin bí mật khi luật cho phép công khai tại thời điểm tương ứng. Không tiết lộ danh tính quân úp hoặc Lá Bí Mật trước thời điểm được phép.
- Bản ghi được lưu cùng `matchId` để hai người chơi truy cập cùng một dữ liệu.
- Bản ghi lịch sử sau khi trận kết thúc là chỉ đọc.

23. GIAO DIỆN NGƯỜI CHƠI
23.1. Màn hình chính

Bao gồm:

Bàn cờ 6 × 7.
Khu vực Đỏ.
Khu vực Xanh.
Thông tin lượt.
Đồng hồ 30 giây.
Hàng chờ.
Khu vực Lá Bí Mật.
Bảng lịch sử.
Nút TRIỂN KHAI.
Nút DI CHUYỂN.
Nút ĐẦU HÀNG.
Thông báo hành động.
23.2. Chọn hành động

Ở các lượt cho phép hành động tự do:

Hiển thị TRIỂN KHAI.
Hiển thị DI CHUYỂN.
Người chơi chỉ chọn một hành động.
Sau khi hoàn thành, khóa lựa chọn còn lại.
23.3. Hiển thị di chuyển

Khi chọn quân:

Làm nổi bật quân.
Hiển thị ô hợp lệ.
Không hiển thị ô vượt quá một bước.
Cảnh báo ô đồng đội.
Hiển thị dấu hiệu tấn công đối phương.
23.4. Hiển thị chiến đấu

Hiển thị:

Quân tấn công.
Quân phòng thủ.
Kết quả.
Quân bị loại.
Quân giữ vị trí.
Quân chiếm ô.
Lá Bí Mật kích hoạt nếu được phép công khai.
23.5. Màn hình kết quả và lịch sử sau trận

Khi trận đấu kết thúc, hiển thị kết quả trận đấu và lựa chọn `XEM LỊCH SỬ` hoặc `KHÔNG XEM`. Nếu chọn xem, mở bảng Battle History theo thứ tự thời gian; nếu chọn không xem, bỏ qua màn hình này. Cả hai người chơi có quyền mở lại cùng một lịch sử trận đấu.

23.6. Hiển thị đồng hồ
Đếm ngược từ 30 giây.
Cảnh báo khi còn ít thời gian.
Đồng bộ máy chủ.
Không cho phép chỉnh sửa bằng giao diện.
24. KIẾN TRÚC DỮ LIỆU
24.1. Cấu trúc trận đấu
js
const gameState = {
    matchId: "MATCH_ID",

    version: "2.6.1",

    status: "playing",

    board: {
        columns: 6,
        rows: 7,
        cells: []
    },

    teams: {
        red: {},
        blue: {}
    },

    currentTurn: {
        player: "red",
        number: 1,
        actionCount: 0,
        maxActions: 1
    },

    timer: {
        durationMs: 30000,
        deadlineAt: null
    },

    combat: {
        active: false,
        snapshot: null
    },

    effects: {
        queue: [],
        processedEvents: []
    },

    history: [],

    randomSeed: null
};

24.2. Cấu trúc quân
js
const piece = {
    id: "PIECE_ID",

    owner: "red",

    species: "mouse",

    rank: 1,

    position: {
        row: 2,
        col: 3
    },

    isFaceDown: true,

    isAlive: true,

    locationType: "board",

    secretCard: {
        id: null,
        status: "available"
    },

    activeEffects: [],

    createdAt: null,
    updatedAt: null
};

24.3. Cấu trúc ô
js
const cell = {
    id: "C3",
    row: 3,
    col: 3,
    pieceId: null,
    territory: "red"
};

24.4. Cấu trúc đội
js
const team = {
    id: "red",

    pieces: [],

    queue: [],

    totalPieces: 8,

    alivePieces: 8,

    boardPieces: 5,

    queuePieces: 3,

    secretCards: [],

    enemyTerritoryFaceDownCount: 0
};

24.5. Cấu trúc hành động
js
const action = {
    id: "ACTION_ID",

    matchId: "MATCH_ID",

    turnNumber: 1,

    player: "red",

    type: "MOVE",

    pieceId: "A001",

    from: "C3",

    to: "C4",

    status: "pending",

    createdAt: null
};

25. QUẢN LÝ TRẠNG THÁI TRẬN ĐẤU
25.1. Nguyên tắc

Mọi trạng thái phải được quản lý từ một nguồn dữ liệu thống nhất.

Không cập nhật độc lập:

Bàn cờ.
Hàng chờ.
Trạng thái quân.
Đồng hồ.
Lá Bí Mật.
Lịch sử.
25.2. State Transition
text
IDLE
  ↓
VALIDATING
  ↓
RESOLVING
  ↓
COMMITTING
  ↓
COMPLETED


Nếu hành động sai:

text
VALIDATING
  ↓
REJECTED

25.3. Transaction

Mỗi hành động phải được xử lý nguyên tử.

Nếu lỗi trước commit:

Rollback.
Không xóa quân một phần.
Không cập nhật vị trí một phần.
Không mất Lá Bí Mật.
Không thay đổi lượt.

Nếu đã commit:

Không xử lý lại hành động.
Ghi nhận ID giao dịch.
Đồng bộ trạng thái mới.
26. HỆ THỐNG LƯU TRỮ
26.1. Dữ liệu cần lưu
ID trận.
Phiên bản luật.
Random Seed.
Thành phần hai đội.
Vị trí quân.
Trạng thái úp/ngửa.
Trạng thái sống/chết.
Hàng chờ.
Lá Bí Mật.
Hiệu ứng.
Lượt hiện tại.
Deadline đồng hồ.
Lịch sử chiến đấu.
Trạng thái trận.
Trạng thái kết nối người chơi.
26.2. LocalStorage

LocalStorage chỉ dùng cho:

Cấu hình giao diện.
Tùy chọn người chơi.
Bản lưu cục bộ.
Trạng thái tạm trong chế độ offline.

Không dùng LocalStorage làm nguồn xác thực duy nhất trong trận trực tuyến.

26.3. Phiên bản lưu
js
const saveData = {
    schemaVersion: "2.5",
    savedAt: null,
    matchState: {}
};


Phải có cơ chế kiểm tra tương thích phiên bản.

27. XỬ LÝ SỰ KIỆN VÀ ĐỒNG BỘ
27.1. Các loại sự kiện
js
const GAME_EVENTS = {
    MATCH_STARTED: "MATCH_STARTED",

    PIECE_GENERATED: "PIECE_GENERATED",

    PIECE_DEPLOYED: "PIECE_DEPLOYED",

    PIECE_MOVED: "PIECE_MOVED",

    ACTION_SELECTED: "ACTION_SELECTED",

    COMBAT_STARTED: "COMBAT_STARTED",

    COMBAT_RESOLVED: "COMBAT_RESOLVED",

    PIECE_REVEALED: "PIECE_REVEALED",

    PIECE_ELIMINATED: "PIECE_ELIMINATED",

    SECRET_TRIGGERED: "SECRET_TRIGGERED",

    SECRET_DISABLED: "SECRET_DISABLED",

    EFFECT_TRIGGERED: "EFFECT_TRIGGERED",

    TURN_CHANGED: "TURN_CHANGED",

    TURN_TIMEOUT: "TURN_TIMEOUT",

    PLAYER_SURRENDERED: "PLAYER_SURRENDERED",

    PLAYER_DISCONNECTED: "PLAYER_DISCONNECTED",

    PLAYER_RECONNECTED: "PLAYER_RECONNECTED",

    MATCH_DRAW: "MATCH_DRAW",

    MATCH_FINISHED: "MATCH_FINISHED"
};

27.2. Thứ tự xử lý chiến đấu
text
ACTION_RECEIVED
    ↓
ACTION_VALIDATED
    ↓
SNAPSHOT_CREATED
    ↓
SECRET_INTERACTION_CHECKED
    ↓
COMBAT_RESULT_CALCULATED
    ↓
ELIMINATION_TRIGGER_CHECKED
    ↓
SECRET_EFFECT_RESOLVED
    ↓
POSITION_UPDATED
    ↓
EFFECTS_RESOLVED
    ↓
GAME_STATE_VALIDATED
    ↓
COMBAT_COMMITTED
    ↓
WIN_CONDITION_CHECKED
    ↓
TURN_ENDED

27.3. Đồng bộ
Có phiên bản trạng thái.
Có ID hành động.
Có số thứ tự sự kiện.
Không chấp nhận hành động cũ.
Không ghi đè trạng thái mới bằng trạng thái cũ.
Đồng hồ sử dụng deadline tuyệt đối.
28. XỬ LÝ LỖI VÀ CHỐNG XUNG ĐỘT
28.1. Các lỗi cần ngăn chặn
Một quân triển khai hai lần.
Một quân di chuyển hai lần.
Hai quân chiếm cùng ô.
Quân bị loại nhưng vẫn chiến đấu.
Quân bị loại nhưng còn trong hàng chờ.
Lá Bí Mật kích hoạt sau khi vô hiệu hóa.
Quân úp bị lật sai.
Quân phòng thủ di chuyển sai.
Quân tấn công chiếm ô sai.
Bộ đếm sân sai.
Đồng hồ chạy song song.
Hai lượt hoạt động đồng thời.
Một hiệu ứng kích hoạt nhiều lần.
Hành động vượt một bước.
Hai hành động chính trong cùng lượt.
Hết giờ nhưng vẫn nhận hành động cũ.
Gửi lại hành động sau mất kết nối.
28.2. Mã lỗi
Mã	Ý nghĩa
E001	Ô không hợp lệ
E002	Ô đã có quân
E003	Không có quyền điều khiển
E004	Không phải lượt
E005	Quân đã bị loại
E006	Vượt giới hạn xâm nhập
E007	Quân không nằm trong hàng chờ
E008	Lá Bí Mật đã vô hiệu hóa
E009	Trận đang xử lý
E010	Sự kiện đã xử lý
E011	Không thể di chuyển
E012	Trạng thái không đồng bộ
E013	Di chuyển vượt một ô
E014	Đã sử dụng hành động
E015	Hết thời gian
E016	Quân không đủ điều kiện nhận lá
E017	Người chơi đã đầu hàng
E018	Trận đã kết thúc
E019	Yêu cầu kết nối lại không hợp lệ
28.3. Khôi phục lỗi

Khi xảy ra lỗi:

Dừng giao dịch.
Kiểm tra đã commit hay chưa.
Rollback nếu chưa commit.
Không chạy lại hành động đã commit.
Ghi lỗi.
Đồng bộ trạng thái.
Tiếp tục trận nếu trạng thái hợp lệ.
29. BẢO MẬT VÀ CHỐNG GIAN LẬN
29.1. Không tin dữ liệu từ giao diện

Mọi hành động phải được kiểm tra tại máy chủ.

29.2. Bảo vệ quân úp

Không gửi danh tính quân úp của đối phương đến client không có quyền xem.

29.3. Bảo vệ Lá Bí Mật

Chỉ đội sở hữu được biết:

Tên lá.
Hiệu ứng.
Quân sở hữu.
Trạng thái lá.
29.4. Xác thực hành động

Mỗi yêu cầu phải kiểm tra:

Người gửi.
Quyền sở hữu.
Lượt hiện tại.
Deadline.
Trạng thái trận.
ID quân.
Vị trí.
Điều kiện hành động.
Giới hạn di chuyển.
Trạng thái hiệu ứng.
29.5. Chống gửi trùng

Sử dụng Action ID duy nhất.

Một Action ID đã commit không được thực hiện lại.

29.6. Chống gian lận Random
Seed do máy chủ quản lý.
Client không được sửa cơ cấu quân.
Client không được sửa Rank.
Client không được sửa vị trí đã commit.
Client không được tự đặt lại đồng hồ.
Client không được thay đổi kết quả chiến đấu.
30. THUẬT TOÁN XỬ LÝ CHIẾN ĐẤU
30.1. Quy trình tổng thể
js
function resolveCombat(game, attackerId, defenderId) {
    validateGamePhase(game);

    const attacker = getPiece(game, attackerId);
    const defender = getPiece(game, defenderId);

    validateCombat(game, attacker, defender);

    const snapshot = createCombatSnapshot(
        attacker,
        defender
    );

    const secretResult = resolveSecretInteraction(
        game,
        snapshot
    );

    const result = determineVersion25CombatResult(
        snapshot,
        game.rules
    );

    const eliminationResult =
        resolveEliminationTriggers(
            game,
            snapshot,
            result
        );

    const positionResult = resolvePosition(
        game,
        snapshot,
        eliminationResult
    );

    applyCombatResult(game, positionResult);

    resolveEffectQueue(game);

    updateTerritoryCounts(game);

    validateGameInvariants(game);

    saveCombatHistory(
        game,
        snapshot,
        result
    );

    return result;
}

30.2. Yêu cầu
Không thay đổi dữ liệu trước snapshot.
Không sử dụng dữ liệu giao diện để tính sức mạnh.
Kiểm tra Chuột – Voi trước Rank.
Kiểm tra Lá Bí Mật.
Kiểm tra trạng thái úp/ngửa.
Xử lý hai quân cùng cấp.
Không cập nhật vị trí trước khi xác định kết quả.
Không cho phép di chuyển tiếp sau chiến đấu.
Xử lý hiệu ứng trước khi kết thúc giao dịch.
31. THUẬT TOÁN TRIỂN KHAI QUÂN
js
function deployPiece(game, teamId, pieceId, cellId) {
    validateCurrentTurn(game, teamId);

    validatePrimaryActionAvailable(game);

    const team = game.teams[teamId];

    const piece = team.pieces.find(
        item => item.id === pieceId
    );

    const cell = getCell(game, cellId);

    if (!piece || !piece.isAlive) {
        throw new Error("INVALID_PIECE");
    }

    if (piece.locationType !== "queue") {
        throw new Error("PIECE_NOT_IN_QUEUE");
    }

    if (!team.queue.includes(pieceId)) {
        throw new Error("PIECE_NOT_IN_QUEUE");
    }

    if (!cell || cell.pieceId !== null) {
        throw new Error("INVALID_CELL");
    }

    if (!isDeploymentLimitValid(
        game,
        piece,
        cell
    )) {
        throw new Error("DEPLOYMENT_LIMIT");
    }

    commitDeployment(
        game,
        team,
        piece,
        cell
    );

    consumePrimaryAction(game);

    validateGameInvariants(game);
}


Sau triển khai:

Quân rời hàng chờ.
Quân có vị trí hợp lệ.
Ô ghi nhận ID quân.
Bộ đếm cập nhật.
Lịch sử được ghi.
Lượt kết thúc.
32. LUỒNG HOẠT ĐỘNG CỦA TRẬN ĐẤU
32.1. Khởi tạo
text
START
  ↓
CREATE MATCH
  ↓
GENERATE RANDOM SEED
  ↓
RANDOM TEAM SIZE (8–10 EACH)
  ↓
GENERATE BALANCED COMPOSITION
  ↓
ENSURE MOUSE AND ELEPHANT
  ↓
CREATE RED TEAM
  ↓
CREATE BLUE TEAM
  ↓
GENERATE RANDOM POSITIONS
  ↓
PLACE INITIAL FACE-DOWN PIECES
  ↓
PUT REMAINING PIECES INTO QUEUES
  ↓
ASSIGN SECRET CARDS
  ↓
CREATE BOARD 6×7
  ↓
VALIDATE GAME STATE
  ↓
START DEPLOYMENT PHASE
  ↓
START FIRST TURN

32.2. Trong trận
text
START TURN
  ↓
START 30-SECOND TIMER
  ↓
SELECT ACTION
  ↓
  ├── DEPLOY
  │      ↓
  │   SELECT QUEUE PIECE
  │      ↓
  │   SELECT EMPTY CELL
  │      ↓
  │   VALIDATE DEPLOYMENT
  │      ↓
  │   DEPLOY ONE PIECE
  │
  └── MOVE
         ↓
      SELECT BOARD PIECE
         ↓
      SELECT ADJACENT CELL
         ↓
      VALIDATE ONE-STEP MOVE
         ↓
      MOVE OR COMBAT
              ↓
         RESOLVE COMBAT
              ↓
         RESOLVE SECRET CARDS

  ↓
RESOLVE EFFECT QUEUE
  ↓
UPDATE BOARD
  ↓
VALIDATE STATE
  ↓
CHECK WIN CONDITION
  ↓
END TURN
  ↓
NEXT PLAYER

32.3. Kết thúc
text
FINISH CONDITION
  ↓
STOP TIMER
  ↓
LOCK ACTIONS
  ↓
FINALIZE EFFECTS
  ↓
SAVE MATCH
  ↓
SHOW RESULT

33. CÁC TRƯỜNG HỢP NGOẠI LỆ
Tình huống	Kết quả
Đỏ úp bị Xanh mạnh tấn công	Đỏ bị loại
Đỏ úp bị Xanh yếu tấn công	Xanh bị loại
Đỏ ngửa tấn công Xanh mạnh	Đỏ bị loại
Đỏ ngửa tấn công Xanh yếu	Đỏ chiếm ô
Xanh úp bị Đỏ mạnh tấn công	Xanh bị loại
Xanh úp bị Đỏ yếu tấn công	Đỏ bị loại
Xanh ngửa tấn công Đỏ mạnh	Xanh bị loại
Xanh ngửa tấn công Đỏ yếu	Xanh chiếm ô
Hai quân cùng cấp	Cả hai bị loại
Hai quân úp	Cả hai lật để xử lý
Chuột gặp Voi	Chuột thắng
Chuột thắng Voi	Chuột giữ nguyên ô
Hai lá bí mật đối đầu	Hai lá vô hiệu hóa
Kéo Theo chọn quân có lá	Xử lý theo điều kiện lá
Hàng chờ còn một quân	Không khóa sai
Quân úp vượt giới hạn	Từ chối
Di chuyển hai ô	Từ chối
Di chuyển hai quân cùng lượt	Từ chối
Hết 30 giây	Bỏ lượt
Hai hành động đồng thời	Chỉ một hành động commit
Hai đội không còn quân trên bàn	Hòa
Một đội hết quân sống	Đội còn quân thắng
Đối phương đầu hàng	Người chơi còn lại thắng
Mất kết nối	Chờ khôi phục theo cấu hình
Gửi lại Action ID	Không thực hiện lại
34. TIÊU CHUẨN KIỂM THỬ
34.1. Kiểm thử khởi tạo
Tạo đội 8 quân.
Tạo đội 9 quân.
Tạo đội 10 quân.
Hai đội có số lượng bằng nhau.
Hai đội có cơ cấu giống nhau.
Có Chuột và Voi.
Không trùng ID.
Bàn cờ đúng 42 ô.
Không trùng vị trí.
Random có thể tái tạo.
Quân trên bàn và hàng chờ không trùng nhau.
34.2. Kiểm thử triển khai
Triển khai vào ô trống.
Triển khai vào ô đã chiếm.
Triển khai trong sân nhà.
Triển khai trong sân đối phương.
Triển khai vượt giới hạn.
Triển khai quân úp.
Triển khai quân ngửa nếu cấu hình cho phép.
Hàng chờ còn một quân.
Triển khai sai lượt.
Triển khai quân đã bị loại.
34.3. Kiểm thử lượt
Lượt đầu triển khai.
Lượt sau chọn DEPLOY.
Lượt sau chọn MOVE.
Chỉ có một hành động chính.
Không di chuyển hai lần.
Không triển khai hai lần.
Không chuyển lượt giữa giao dịch.
34.4. Kiểm thử di chuyển
Đi một ô hợp lệ.
Đi hai ô.
Đi chéo.
Đi ra ngoài bàn.
Đi vào ô đồng đội.
Đi vào ô đối phương.
Vượt giới hạn quân úp.
Di chuyển sau khi đã dùng hành động.
34.5. Kiểm thử chiến đấu
Đỏ úp bị Xanh mạnh hơn tấn công.
Đỏ úp bị Xanh yếu hơn tấn công.
Đỏ ngửa tấn công Xanh mạnh hơn.
Đỏ ngửa tấn công Xanh yếu hơn.
Xanh úp bị Đỏ tấn công.
Xanh ngửa tấn công Đỏ.
Hai quân úp.
Hai quân ngửa.
Hai quân cùng cấp.
Chuột đấu Voi.
Chuột và Voi úp.
Chuột và Voi ngửa.
Chuột thắng Voi khi là quân tấn công.
Chuột thắng Voi khi là quân phòng thủ.
Kiểm tra chiếm ô.
Kiểm tra giữ ô.
34.6. Kiểm thử Lá Bí Mật
Chuột không nhận lá.
Voi không nhận lá.
Các cấp trung gian có thể nhận lá.
Phân bổ đúng số lượng.
Lá kích hoạt khi quân bị loại.
Lá không kích hoạt khi quân sống.
Hai lá đối đầu.
Lá bị vô hiệu hóa.
Lá không kích hoạt lại.
Kéo Theo.
Nổ Lan.
Quyền xem thông tin bí mật.
34.7. Kiểm thử đồng hồ
Bắt đầu lượt có 30 giây.
Đồng hồ dừng sau hành động.
Chuyển lượt chính xác.
Hết giờ tự động bỏ lượt.
Tải lại trang khôi phục deadline.
Không thể tự đặt lại.
Không có hai đồng hồ chạy cùng lúc.
Không nhận hành động cũ sau timeout.
35. DANH SÁCH TEST CASE
ID	Tình huống	Kết quả mong đợi
TC001	Tạo đội 8 quân	Thành công
TC002	Tạo đội 9 quân	Thành công
TC003	Tạo đội 10 quân	Thành công
TC004	Hai đội random	Cùng số quân
TC005	Random cơ cấu	Cùng cấu hình
TC006	Có Chuột và Voi	Bắt buộc
TC007	Bàn cờ	42 ô
TC008	Random vị trí	Không trùng ô
TC009	Quân ban đầu	Úp
TC010	Quân còn lại	Trong hàng chờ
TC011	Triển khai ô trống	Thành công
TC012	Triển khai ô có quân	Từ chối
TC013	Triển khai sân đối phương	Theo giới hạn
TC014	Hàng chờ còn một quân	Không khóa sai
TC015	Lượt đầu	Giai đoạn triển khai
TC016	Lượt tiếp theo	DEPLOY hoặc MOVE
TC017	Di chuyển một ô	Thành công
TC018	Di chuyển hai ô	Từ chối
TC019	Di chuyển hai lần	Từ chối
TC020	Đỏ úp bị Xanh mạnh tấn công	Đỏ bị loại
TC021	Đỏ úp bị Xanh yếu tấn công	Xanh bị loại
TC022	Đỏ ngửa đánh Xanh mạnh	Đỏ bị loại
TC023	Đỏ ngửa đánh Xanh yếu	Đỏ chiếm ô
TC024	Xanh úp bị Đỏ mạnh tấn công	Xanh bị loại
TC025	Xanh úp bị Đỏ yếu tấn công	Đỏ bị loại
TC026	Xanh ngửa đánh Đỏ mạnh	Xanh bị loại
TC027	Xanh ngửa đánh Đỏ yếu	Xanh chiếm ô
TC028	Hai quân úp	Cả hai lật
TC029	Hai quân cùng cấp	Cả hai bị loại
TC030	Chuột đánh Voi	Chuột thắng
TC031	Voi đánh Chuột	Chuột thắng
TC032	Chuột úp đấu Voi ngửa	Chuột thắng
TC033	Chuột ngửa đấu Voi úp	Chuột thắng
TC034	Chuột thắng Voi	Chuột giữ ô
TC035	Cấp 1 nhận lá	Từ chối
TC036	Cấp 2 nhận lá	Cho phép
TC037	Cấp cao nhất nhận lá	Từ chối
TC038	Quân có lá bị loại	Kích hoạt lá
TC039	Quân có lá nhưng sống	Không kích hoạt
TC040	Hai lá đối đầu	Cả hai vô hiệu hóa
TC041	Lá vô hiệu hóa	Không kích hoạt
TC042	Kéo Theo	Xử lý đúng mục tiêu
TC043	Hiệu ứng trùng ID	Không xử lý lại
TC044	Quân bị loại	Xóa khỏi ô
TC045	Lưu trận	Khôi phục chính xác
TC046	Tải lại trang	Không mất dữ liệu
TC047	Gửi hành động sai lượt	Từ chối
TC048	Hai hành động đồng thời	Chỉ nhận một
TC049	Hai quân cùng ô	Không cho phép
TC050	Đồng hồ bắt đầu	30 giây
TC051	Hết giờ	Bỏ lượt
TC052	Đối phương hết quân	Người còn quân thắng
TC053	Hai đội không còn quân trên bàn	Hòa
TC054	Đối phương đầu hàng	Người còn lại thắng
TC055	Mất kết nối	Xử lý theo quy tắc
TC056	Kết thúc trận	Khóa hành động
35.1. Kiểm thử bất biến dữ liệu

Sau mọi hành động phải kiểm tra:

Mỗi quân chỉ ở bàn, hàng chờ hoặc trạng thái bị loại.
Không quân nào vừa ở bàn vừa trong hàng chờ.
Số quân không tự tăng.
Số quân sống chính xác.
Mỗi ô tối đa một quân.
Bộ đếm sân chính xác.
Lá đã vô hiệu hóa không thể kích hoạt.
Mỗi lượt chỉ có một hành động chính.
Không di chuyển quá một ô.
Trận đã kết thúc không thể quay lại PLAYING.
Lịch sử không ghi trùng giao dịch.
36. YÊU CẦU HIỆU NĂNG
36.1. Hiệu năng xử lý
Hành động thông thường phải phản hồi nhanh.
Không render lại toàn bộ ứng dụng khi một ô thay đổi.
Không tính lại toàn bộ lịch sử sau mỗi lượt.
Xử lý Effect Queue theo thứ tự.
Đồng bộ trạng thái hiệu quả.
Sử dụng cập nhật trạng thái có kiểm soát.
36.2. Độ ổn định

Không được mất dữ liệu khi:

Tải lại trang.
Mất kết nối tạm thời.
Người chơi thao tác liên tục.
Hiệu ứng kéo dài.
Nhận sự kiện trùng.
Đồng hồ chuyển lượt.
Máy chủ khởi động lại.
37. YÊU CẦU GIAO DIỆN VÀ TRẢI NGHIỆM
37.1. Nguyên tắc

Giao diện phải thể hiện rõ:

Đang đến lượt ai.
Còn bao nhiêu giây.
Đang ở giai đoạn nào.
Có thể triển khai hay di chuyển.
Quân nào đang được chọn.
Ô nào hợp lệ.
Quân nào bị loại.
Lá nào còn chức năng.
Lý do hành động bị từ chối.
37.2. Phản hồi hành động

Ví dụ:

Triển khai thành công.
Ô đã bị chiếm.
Không phải lượt của bạn.
Đã đạt giới hạn quân úp.
Lá Bí Mật đã kích hoạt.
Lá Bí Mật đã bị vô hiệu hóa.
Quân đã bị loại.
Không thể di chuyển quá một ô.
Bạn đã sử dụng hành động của lượt này.
Đã hết thời gian.
Đối phương đã đầu hàng.
Trận đấu kết thúc hòa.
37.3. Lịch sử

Lịch sử phải ghi:

Thời điểm.
Người thực hiện.
Hành động.
Kết quả.
Quân bị loại.
Vị trí trước và sau.
Lá Bí Mật được kích hoạt.
Thông tin công khai.
Thông tin riêng theo quyền.

Không làm lộ thông tin bí mật đối phương.

38. CẤU TRÚC THƯ MỤC ĐỀ XUẤT
text
dark-animal-chess/
│
├── README.md
├── package.json
├── .env.example
│
├── public/
│   ├── images/
│   ├── icons/
│   ├── sounds/
│   └── assets/
│
├── src/
│   │
│   ├── core/
│   │   ├── GameEngine.js
│   │   ├── GameState.js
│   │   ├── TurnManager.js
│   │   ├── ActionManager.js
│   │   ├── BoardManager.js
│   │   └── MatchManager.js
│   │
│   ├── pieces/
│   │   ├── Piece.js
│   │   ├── PieceFactory.js
│   │   ├── PieceRanking.js
│   │   └── PieceRules.js
│   │
│   ├── combat/
│   │   ├── CombatEngine.js
│   │   ├── CombatSnapshot.js
│   │   ├── CombatResolver.js
│   │   └── PositionResolver.js
│   │
│   ├── secrets/
│   │   ├── SecretCardManager.js
│   │   ├── SecretCardResolver.js
│   │   ├── SecretCardDistribution.js
│   │   └── SecretCardRules.js
│   │
│   ├── effects/
│   │   ├── EffectManager.js
│   │   ├── EffectQueue.js
│   │   ├── FollowEffect.js
│   │   └── ExplosionEffect.js
│   │
│   ├── deployment/
│   │   ├── DeploymentManager.js
│   │   ├── QueueManager.js
│   │   └── TerritoryLimit.js
│   │
│   ├── random/
│   │   ├── RandomGenerator.js
│   │   ├── SeedManager.js
│   │   └── PositionRandomizer.js
│   │
│   ├── timer/
│   │   └── TurnTimer.js
│   │
│   ├── storage/
│   │   ├── SaveManager.js
│   │   └── LoadManager.js
│   │
│   ├── security/
│   │   ├── ActionValidator.js
│   │   └── VisibilityManager.js
│   │
│   ├── network/
│   │   ├── ConnectionManager.js
│   │   ├── ReconnectManager.js
│   │   └── SyncManager.js
│   │
│   ├── ui/
│   │   ├── Board/
│   │   ├── Pieces/
│   │   ├── Queue/
│   │   ├── SecretCards/
│   │   ├── Combat/
│   │   ├── Timer/
│   │   ├── ActionSelector/
│   │   └── History/
│   │
│   └── tests/
│       ├── initialization.test.js
│       ├── deployment.test.js
│       ├── movement.test.js
│       ├── combat.test.js
│       ├── secretCards.test.js
│       ├── effects.test.js
│       ├── queue.test.js
│       ├── timer.test.js
│       ├── reconnect.test.js
│       └── gameState.test.js
│
└── docs/
    ├── GAME_RULES.md
    ├── TECHNICAL_DESIGN.md
    ├── COMBAT_RULES.md
    └── TEST_PLAN.md

39. ROADMAP PHÁT TRIỂN
Giai đoạn 1 – Core Engine
Khởi tạo trận.
Random 8–10 quân mỗi đội.
Tạo hai đội cân bằng.
Bảo đảm Chuột và Voi.
Random vị trí.
Tạo bàn cờ 42 ô.
Quản lý trạng thái quân.
Giai đoạn 2 – Deployment
Random quân ban đầu.
Hàng chờ.
Triển khai tự do.
Giới hạn quân úp.
Ngoại lệ quân cuối.
Cập nhật bộ đếm.
Giai đoạn 3 – Turn & Movement
Quản lý lượt.
Chọn DEPLOY hoặc MOVE.
Giới hạn một hành động chính.
Giới hạn di chuyển một ô.
Khóa hành động sau khi hoàn thành.
Giai đoạn 4 – Combat
Snapshot.
Chiến đấu úp/úp.
Chiến đấu úp/ngửa.
Chiến đấu ngửa/úp.
Chiến đấu ngửa/ngửa.
Quy tắc đối xứng Đỏ – Xanh.
Chuột khắc chế Voi.
Cùng cấp loại nhau.
Xử lý vị trí.
Giai đoạn 5 – Secret Cards
Random Lá Bí Mật.
Lọc cấp bậc nhận lá.
Kích hoạt khi quân bị loại.
Quyền xem.
Vô hiệu hóa.
Hai lá đối đầu.
Kéo Theo.
Giai đoạn 6 – Effects
Effect Queue.
Nổ Lan.
Xử lý chuỗi hiệu ứng.
Chống kích hoạt lặp.
Lịch sử hiệu ứng.
Giai đoạn 7 – Timer & Network
Đồng hồ 30 giây.
Đồng bộ deadline.
Xử lý hết giờ.
Khôi phục sau tải lại.
Mất kết nối.
Kết nối lại.
Giai đoạn 8 – UI/UX
Bàn cờ.
Quân cờ.
Hiển thị quân úp.
Hàng chờ.
Bộ chọn hành động.
Lá Bí Mật.
Hiệu ứng chiến đấu.
Đồng hồ.
Lịch sử.
Giai đoạn 9 – Testing
Unit Test.
Integration Test.
Regression Test.
State Validation.
Kiểm thử đồng bộ.
Kiểm thử khôi phục trận.
Kiểm thử bảo mật.
Giai đoạn 10 – Release
Kiểm tra luật 2.5.
Kiểm tra bảo mật.
Kiểm tra hiệu năng.
Kiểm tra lưu trữ.
Kiểm tra thiết bị.
Phát hành.
40. TIÊU CHÍ HOÀN THÀNH PHIÊN BẢN 2.5
40.1. Khởi tạo
Mỗi đội có 8–10 quân.
Hai đội bằng quân.
Cơ cấu cân bằng.
Có Chuột và Voi.
Có 9 loài hiện tại.
Random vị trí hợp lệ.
Bàn cờ 42 ô.
Không trùng ID.
Random có thể tái tạo.
40.2. Triển khai
Có quân úp ban đầu trên bàn.
Quân còn lại nằm trong hàng chờ.
Triển khai được vào ô hợp lệ.
Có thể triển khai vào sân đối phương.
Giới hạn quân úp hoạt động.
Không triển khai hai lần.
40.3. Lượt chơi
Lượt đầu theo giai đoạn triển khai.
Các lượt tiếp theo chọn MOVE hoặc DEPLOY.
Mỗi lượt một hành động chính.
Không thể hành động thứ hai.
40.4. Di chuyển
Chỉ di chuyển một ô.
Không đi xuyên quân.
Không ra ngoài bàn.
Không đi vào ô đồng đội.
Chiến đấu khi vào ô đối phương.
Không di chuyển tiếp sau chiến đấu.
40.5. Chiến đấu
Cả hai đội có quyền tấn công.
Có đủ 8 trường hợp úp/ngửa và Đỏ/Xanh.
Hai quân cùng cấp bị loại.
Chuột luôn thắng Voi.
Chuột giữ nguyên ô khi thắng Voi.
Chiếm ô chính xác.
Giữ ô chính xác.
40.6. Lá Bí Mật
Rank thấp nhất không nhận lá.
Rank cao nhất không nhận lá.
Các cấp trung gian có thể nhận lá.
Kích hoạt khi quân bị loại.
Không kích hoạt khi quân còn sống.
Hai lá đối đầu xử lý đúng.
Lá vô hiệu hóa không kích hoạt.
Không lộ thông tin đối phương.
40.7. Đồng hồ
Mỗi lượt 30 giây.
Không có hai đồng hồ chạy đồng thời.
Hết giờ xử lý đúng.
Tải lại trang không reset thời gian.
Đồng hồ dừng khi trận kết thúc.
40.8. Điều kiện kết thúc
Đối phương hết quân sống: thắng.
Đối phương đầu hàng: thắng.
Hai đội không còn quân trên bàn: hòa.
Không tiếp tục nhận hành động sau khi kết thúc.
40.9. Hệ thống
Không có quân trùng.
Không có hai quân cùng ô.
Không có hiệu ứng lặp.
Không sai hàng chờ.
Không sai bộ đếm.
Lịch sử chính xác.
Trạng thái lưu được khôi phục.
Không lộ dữ liệu bí mật.
41. CÁC ĐIỂM CẦN XÁC NHẬN TRƯỚC KHI PHÁT HÀNH
Nội dung	Trạng thái
Số quân mỗi đội 8–10	Đã chốt
Hai đội có số quân bằng nhau	Đã chốt
Bàn cờ 6 × 7	Đã chốt
9 loài động vật hiện tại	Đã chốt
Thứ tự Rank 1–9	Đã chốt
Chuột và Voi bắt buộc có trong mỗi đội	Đã chốt theo cơ cấu cân bằng
Chuột luôn thắng Voi	Đã chốt
Hai quân cùng cấp cùng bị loại	Đã chốt
Random vị trí ban đầu	Đã chốt
Quân ban đầu ở trạng thái úp	Đã chốt
Quân còn lại nằm trong hàng chờ	Đã chốt
Lượt sau chọn MOVE hoặc DEPLOY	Đã chốt
Một hành động chính mỗi lượt	Đã chốt
Di chuyển tối đa một ô	Đã chốt
Cả Đỏ và Xanh được tấn công	Đã chốt
Quy tắc chiến đấu đối xứng	Đã chuẩn hóa theo luật Đỏ
Hòa khi cả hai không còn quân trên bàn	Đã chốt
Thắng khi đối phương hết quân sống	Đã chốt
Đầu hàng	Đã chốt
Thời gian 30 giây	Đã chốt
Số quân random đặt trên bàn lúc đầu	Cần cấu hình
Giới hạn quân úp sân đối phương	Mặc định 4, cần xác nhận cuối
Luật hòa cùng cấp	Đã thay bằng cả hai bị loại
Danh mục chi tiết Lá Bí Mật	Cần đối chiếu luật gốc
Chi tiết Nổ Lan	Cần đối chiếu luật gốc
Số Lá Bí Mật mỗi đội	Đề xuất tối đa 2
Quy tắc timeout	Đề xuất bỏ lượt
Thời gian chờ kết nối lại	Cần cấu hình
Điều kiện xử thua khi mất kết nối	Cần cấu hình

Lưu ý về khởi tạo: Số quân được đặt ngẫu nhiên lên bàn ban đầu và số quân được giữ trong hàng chờ phải được xác định bằng cấu hình. Không được random toàn bộ quân lên bàn rồi đồng thời đưa chính các quân đó vào hàng chờ.

Lưu ý về sân: Giới hạn quân úp trong sân đối phương phải được kiểm tra thống nhất ở khâu khởi tạo, triển khai, di chuyển và khôi phục.

42. PHỤ LỤC A – NGUYÊN TẮC KHÔNG ĐƯỢC VI PHẠM
Mỗi đội có từ 8 đến 10 quân.
Hai đội phải cân bằng số lượng.
Không tạo bàn cờ khác kích thước 6 × 7.
Không để hai quân chiếm cùng ô.
Phải có Chuột và Voi trong cơ cấu quân trận đấu.
Chuột là Rank thấp nhất.
Voi là Rank cao nhất.
Chuột luôn thắng Voi.
Chuột và Voi vẫn có thể bị loại.
Hai quân cùng cấp bị loại đồng thời.
Không vượt giới hạn quân úp.
Không để quân di chuyển quá một ô.
Không cho phép hai hành động chính trong một lượt.
Cả hai đội đều có quyền tấn công.
Không tự ý lật quân úp trái luật.
Không làm lộ thông tin quân úp.
Không làm lộ Lá Bí Mật của đội khác.
Không để quân phòng thủ di chuyển sai.
Không để quân tấn công chiếm ô sai.
Không áp dụng quy tắc chiếm ô thông thường khi Chuột thắng Voi.
Không kích hoạt Lá Bí Mật đã vô hiệu hóa.
Lá Bí Mật chỉ kích hoạt khi quân sở hữu bị loại.
Không phân bổ lá cho Rank thấp nhất hoặc cao nhất.
Không xử lý hiệu ứng trùng nhiều lần.
Không bỏ qua snapshot.
Không để giao diện tự ý thay đổi luật.
Không để hàng chờ và bàn cờ chứa cùng một quân.
Không để hai giao dịch ghi đè trạng thái.
Đồng hồ mỗi lượt phải là 30 giây.
Hết giờ phải xử lý nhất quán.
Không được tiếp tục di chuyển sau khi hoàn tất hành động.
Không được tiếp tục trận sau khi đã kết thúc.
43. PHỤ LỤC B – THUẬT NGỮ
Thuật ngữ	Giải thích
Quân úp	Quân chưa công khai danh tính
Quân ngửa	Quân đã công khai danh tính
Quân tấn công	Quân chủ động chiến đấu
Quân phòng thủ	Quân đang bị tấn công
Hàng chờ	Danh sách quân chưa triển khai
Sân nhà	Khu vực của đội sở hữu
Sân đối phương	Khu vực thuộc đội còn lại
Xâm nhập	Quân đi vào sân đối phương
Lá Bí Mật	Lá hiệu ứng riêng
Kích hoạt	Bắt đầu thực hiện hiệu ứng lá
Vô hiệu hóa	Làm mất chức năng của lá
Kéo Theo	Hiệu ứng chọn mục tiêu
Nổ Lan	Hiệu ứng có thể tác động nhiều mục tiêu
Snapshot	Bản ghi trạng thái trước hành động
Transaction	Giao dịch cập nhật trạng thái
Random Seed	Giá trị tái tạo random
Effect Queue	Hàng đợi hiệu ứng
State Validation	Kiểm tra trạng thái
DEPLOY	Triển khai quân
MOVE	Di chuyển quân
TIMEOUT	Hết thời gian lượt
SURRENDER	Đầu hàng
DRAW	Hòa
RANK	Cấp bậc sức mạnh
44. PHỤ LỤC C – TUYÊN BỐ PHIÊN BẢN
DARK ANIMAL CHESS – ULTIMATE EDITION V2.5

Phiên bản 2.5 tập trung hoàn thiện hệ thống triển khai, di chuyển, chiến đấu, random và quản lý thông tin bí mật.

Các thay đổi trọng tâm:

Số quân được điều chỉnh thành 8–10 quân cho mỗi đội.
Hai đội có số lượng quân cân bằng.
Danh sách hiện tại có 9 loài động vật.
Thứ tự sức mạnh được cố định từ Chuột đến Voi.
Bắt buộc có Chuột và Voi trong thành phần quân mỗi đội.
Chuột luôn thắng Voi bất kể úp hay ngửa.
Hai quân cùng cấp bị loại đồng thời.
Random vị trí quân ban đầu.
Quân ban đầu được đặt trên bàn ở trạng thái úp.
Quân chưa được đặt nằm trong hàng chờ.
Các lượt tiếp theo cho phép chọn triển khai hoặc di chuyển.
Mỗi lượt chỉ có một hành động chính.
Mỗi lần di chuyển tối đa một ô.
Cả Đỏ và Xanh đều có quyền tấn công.
Chuẩn hóa chiến đấu theo đội sở hữu và trạng thái úp/ngửa.
Bổ sung quy tắc đối xứng cho quân Xanh.
Chuẩn hóa quy tắc chiếm ô sau chiến đấu.
Giữ ngoại lệ Chuột luôn thắng Voi và không chiếm ô.
Thay đổi cơ chế random Lá Bí Mật.
Lá Bí Mật được gắn cho quân từ cấp 2 đến cấp dưới cấp cao nhất.
Lá Bí Mật kích hoạt khi quân sở hữu bị loại.
Giữ cơ chế tương tác giữa hai Lá Bí Mật.
Bổ sung kiểm soát Effect Queue.
Thời gian mỗi lượt là 30 giây.
Bổ sung xử lý hết giờ.
Bổ sung đầu hàng.
Bổ sung điều kiện hòa khi hai đội không còn quân trên bàn.
Bổ sung xử lý mất kết nối và kết nối lại.
Tăng cường kiểm tra trạng thái và chống gian lận.
Bổ sung các Test Case cho luật mới.
NGUYÊN TẮC PHÁT TRIỂN CUỐI CÙNG

Mọi hành động trong Dark Animal Chess phải có:

Trạng thái trước hành động.
Điều kiện hợp lệ.
Quyền thực hiện.
Kết quả xác định.
Trạng thái sau hành động.
Lịch sử giao dịch.

Mọi thao tác triển khai, di chuyển, chiến đấu và kích hoạt hiệu ứng phải tuân thủ thống nhất luật phiên bản 2.5.

Không được để giao diện, hiệu ứng, dữ liệu random hoặc thao tác người chơi tự ý thay đổi luật chơi.

Logic chiến đấu, quản lý lượt, Lá Bí Mật, đồng hồ, hàng chờ và vị trí quân phải được xử lý nhất quán trong toàn bộ hệ thống.

Không được tự ý bổ sung loài, thay đổi Rank, thay đổi số lượng quân hoặc tạo ngoại lệ chiến đấu ngoài cấu hình đã xác nhận.

DARK ANIMAL CHESS – ULTIMATE EDITION V2.5

END OF DOCUMENT
---

# PHỤ LỤC B – TÀI LIỆU NGUỒN V2.5.1 (BẢN ĐẦY ĐỦ)

Nội dung dưới đây được giữ nguyên từ tài liệu V2.5.1 để truy vết các bổ sung về giới hạn 15 quân, quân ban đầu trên bàn, lật ngửa khi di chuyển, triển khai luôn ngửa, Kéo Theo, Effect Queue và điều kiện thắng thua theo quân trên bàn. Các quy tắc chuẩn khi triển khai phải theo phần hợp nhất V2.6.

README MASTER – GAME SPECIFICATION
PHIÊN BẢN V2.5.1 – FULL GAME RULES & TECHNICAL DOCUMENTATION

Trạng thái: Master Specification
Phiên bản: 2.5.1
Loại tài liệu: Game Design Document (GDD) + Technical Specification
Mục đích: Làm tài liệu chuẩn để thiết kế, phát triển, kiểm thử và bảo trì trò chơi.

MỤC LỤC
Tổng quan trò chơi
Cấu trúc bàn cờ
Hệ thống quân cờ
Số lượng quân và thiết lập trận đấu
Hệ thống Rank
Hệ thống quân úp và quân ngửa
Hệ thống di chuyển
Hệ thống chiến đấu
Hệ thống Lá Bí Mật
Hiệu ứng Kéo Theo
Hàng chờ và triển khai quân
Điều kiện thắng và thua
Hệ thống lượt chơi
Hệ thống hiệu ứng và xử lý sự kiện
Quy tắc ngẫu nhiên
Giao diện và trải nghiệm người chơi
Kiến trúc Game Engine
Cấu trúc dữ liệu đề xuất
Bảo mật và chống gian lận
Xử lý lỗi và tình huống đặc biệt
Bộ Test Case
Các nguyên tắc cân bằng trò chơi
Những quy tắc cần giữ nguyên
Các nội dung cần xác nhận trước khi phát hành
1. TỔNG QUAN TRÒ CHƠI
1.1. Giới thiệu

Đây là trò chơi chiến thuật đối kháng theo lượt giữa hai đội.

Hai đội sử dụng quân cờ có Rank khác nhau, kết hợp với khả năng di chuyển, chiến đấu, quân úp, quân ngửa và Lá Bí Mật để đánh bại đối phương.

Trò chơi tập trung vào:

Chiến thuật triển khai quân.
Quản lý số lượng quân.
Dự đoán quân úp của đối phương.
Sử dụng Rank để chiến đấu.
Tận dụng Lá Bí Mật.
Tính toán các chuỗi hiệu ứng.
Kiểm soát khu vực bàn cờ.
Bảo vệ số lượng quân còn lại trên bàn.
1.2. Số người chơi
Đội Đỏ.
Đội Xanh.

Mỗi đội điều khiển quân của mình và có một khu vực hàng chờ riêng.

1.3. Nguyên tắc cơ bản
Hai đội có giới hạn số lượng quân như nhau.
Hai đội bắt đầu với số quân trên bàn được random độc lập trong khoảng 8–10 quân.
Mỗi đội có tối đa 15 quân trong toàn trận.
Bàn cờ có kích thước 6 cột × 7 hàng.
Mỗi đội sở hữu 3 hàng sân nhà.
Có một hàng trung lập ở chính giữa.
Quân di chuyển sẽ tự động lật ngửa.
Quân triển khai từ hàng chờ luôn ở trạng thái ngửa.
Quân không còn tồn tại trên bàn không được tính là quân sống trên bàn.
Đội hết quân trên bàn sẽ thua, kể cả khi còn quân trong hàng chờ.
2. CẤU TRÚC BÀN CỜ
2.1. Kích thước

Bàn cờ gồm:

6 cột.
7 hàng.
Tổng cộng 42 ô.
2.2. Phân chia khu vực
Khu vực	Số hàng	Quyền sở hữu
Sân Đỏ	3	Đội Đỏ
Vùng trung lập	1	Không thuộc đội nào
Sân Xanh	3	Đội Xanh
2.3. Sơ đồ bàn cờ
text
             ĐỘI XANH

       A   B   C   D   E   F

  7    □   □   □   □   □   □
  6    □   □   □   □   □   □
  5    □   □   □   □   □   □

       VÙNG TRUNG LẬP

  4    □   □   □   □   □   □

             ĐỘI ĐỎ

  3    □   □   □   □   □   □
  2    □   □   □   □   □   □
  1    □   □   □   □   □   □


Quy ước:

Hàng 1–3: Sân Đỏ.
Hàng 4: Vùng trung lập.
Hàng 5–7: Sân Xanh.
2.4. Quy tắc vùng trung lập

Vùng trung lập:

Không thuộc quyền sở hữu của Đỏ.
Không thuộc quyền sở hữu của Xanh.
Cả hai đội đều có thể di chuyển quân vào nếu đáp ứng điều kiện di chuyển.
Không được xem là sân nhà của bất kỳ đội nào.
Không áp dụng các giới hạn riêng của sân nhà nếu những giới hạn đó được định nghĩa theo khu vực sân đối phương.
2.5. Quy tắc chiếm giữ ô

Mỗi ô chỉ được chứa tối đa một quân sống tại một thời điểm.

Không cho phép:

Hai quân cùng đứng trên một ô.
Di chuyển vào ô đã có quân nếu luật chiến đấu chưa cho phép.
Di chuyển ra ngoài bàn cờ.
Di chuyển vào ô không hợp lệ.

Mọi hành động di chuyển phải được Game Engine kiểm tra.

3. HỆ THỐNG QUÂN CỜ
3.1. Cấu trúc quân

Mỗi quân cần có các thuộc tính:

ID duy nhất.
Đội sở hữu.
Loại quân.
Rank.
Trạng thái úp/ngửa.
Trạng thái sống/bị loại.
Vị trí trên bàn.
Trạng thái hiệu ứng.
Lá Bí Mật được gắn (nếu có).
3.2. Các trạng thái quân

Một quân có các nhóm trạng thái độc lập:

Trạng thái hiển thị
FACE_DOWN: Quân úp.
FACE_UP: Quân ngửa.
Trạng thái tồn tại
ALIVE: Quân còn sống.
ELIMINATED: Quân đã bị loại.
Trạng thái vị trí
BOARD: Đang ở trên bàn.
QUEUE: Đang ở hàng chờ.
REMOVED: Đã bị loại khỏi trận.

Không gộp các trạng thái này vào cùng một biến.

3.3. Quy tắc nhận diện quân

Quân úp:

Không công khai thông tin nhận diện cho đối phương.
Không công khai Rank.
Không công khai loại quân.
Không công khai chức năng riêng nếu chức năng đó chưa được tiết lộ.

Quân ngửa:

Hiển thị loại quân.
Hiển thị Rank.
Hiển thị các thông tin được phép công khai.
Hiển thị trạng thái hiệu ứng phù hợp.
4. SỐ LƯỢNG QUÂN VÀ THIẾT LẬP TRẬN ĐẤU
4.1. Giới hạn quân

Mỗi đội có tối đa 15 quân.

Hai đội có tổng cộng tối đa 30 quân.

Giới hạn này tính toàn bộ:

Quân đang trên bàn.
Quân trong hàng chờ.

Không được tính quân đã bị loại.

4.2. Số quân ban đầu trên bàn

Mỗi đội bắt đầu với số quân được chọn ngẫu nhiên từ 8 đến 10.

js
const initialBoardCount = randomInteger(8, 10);


Random độc lập cho từng đội.

Ví dụ:

Đội	Quân trên bàn	Quân hàng chờ	Tổng
Đỏ	8	7	15
Xanh	10	5	15

Tổng số quân ban đầu trên bàn là từ 16 đến 20.

4.3. Quy tắc random quân ban đầu

Hệ thống phải:

Chọn số lượng quân ban đầu từ 8–10.
Tạo số quân còn lại trong hàng chờ.
Kiểm tra tổng số quân không vượt quá 15.
Bố trí quân theo quy tắc thiết lập sân.
Kiểm tra không có hai quân trùng vị trí.
Kiểm tra dữ liệu hợp lệ trước khi bắt đầu trận.
4.4. Công bằng giữa hai đội

Không được tạo lợi thế cố định cho một đội.

Nếu có random loại quân hoặc vị trí, cần bảo đảm quy tắc áp dụng công bằng.

Seed random cần được lưu để có thể kiểm tra và tái hiện trận đấu.

5. HỆ THỐNG RANK
5.1. Nguyên tắc

Rank là cấp độ sức mạnh dùng trong chiến đấu.

Quân có Rank cao hơn được ưu tiên thắng quân có Rank thấp hơn theo luật chiến đấu.

5.2. So sánh Rank
js
function compareRank(attacker, defender) {
    if (attacker.rank > defender.rank) {
        return "ATTACKER_WIN";
    }

    if (attacker.rank < defender.rank) {
        return "DEFENDER_WIN";
    }

    return "EQUAL_RANK";
}

5.3. Quy tắc
Rank phải được quản lý tập trung.
Không để client tự quyết định kết quả so sánh.
Không thay đổi Rank khi chưa có hiệu ứng hợp lệ.
Các trường hợp đặc biệt như Chuột – Voi phải được xử lý bằng luật riêng đã định nghĩa.
5.4. Trường hợp bằng Rank

Khi hai quân cùng Rank:

Áp dụng luật chiến đấu cùng cấp đã được xác định trong bộ luật chi tiết của trò chơi.

Không tự động suy diễn trường hợp bằng Rank thành thắng, thua hoặc hòa nếu chưa có quy tắc cụ thể.

6. HỆ THỐNG QUÂN ÚP VÀ QUÂN NGỬA
6.1. Quân úp ban đầu

Quân có thể được đặt trên bàn ở trạng thái úp nếu quy trình thiết lập trận cho phép.

6.2. Quy tắc quan trọng: Di chuyển là phải ngửa

Bất kỳ quân úp nào thực hiện di chuyển đều phải lật ngửa.

Không cần quan tâm quân đi đến khu vực nào.

Áp dụng cho:

Di chuyển thông thường.
Di chuyển cưỡng chế.
Di chuyển do hiệu ứng.
Di chuyển nhiều ô.
Di chuyển do Lá Bí Mật.
Di chuyển do các khả năng đặc biệt.
6.3. Thời điểm lật ngửa

Quân phải được lật ngửa khi hành động di chuyển bắt đầu được thực thi hợp lệ.

Không chờ đến khi quân đi vào sân đối phương.

Nếu hành động di chuyển không hợp lệ và bị từ chối trước khi thực thi thì không thay đổi trạng thái quân.

6.4. Quân hàng chờ

Tất cả quân được triển khai từ hàng chờ lên bàn đấu luôn ở trạng thái ngửa.

Không có ngoại lệ mặc định.

6.5. Không tự động úp lại

Quân đã ngửa không thể tự động trở thành quân úp.

Chỉ được phép úp lại nếu trong tương lai có một Lá Bí Mật hoặc hiệu ứng đặc biệt quy định rõ điều đó.

6.6. Giới hạn quân úp trong sân đối phương

Giữ giới hạn tối đa 4 quân úp trong sân đối phương nếu quy tắc này vẫn được bật trong cấu hình trận.

Tuy nhiên:

Quân úp di chuyển sẽ lập tức ngửa.
Vì vậy, không được tính một quân vừa di chuyển như quân úp sau hành động.
Quân được triển khai từ hàng chờ luôn ngửa.
Không được tạo ngoại lệ bằng hiệu ứng di chuyển.
7. HỆ THỐNG DI CHUYỂN
7.1. Nguyên tắc

Mọi hành động di chuyển phải được kiểm tra bởi Game Engine.

Các điều kiện cơ bản:

Quân phải còn sống.
Quân phải thuộc đội đang thực hiện lượt.
Quân phải nằm trên bàn.
Ô đích phải nằm trong giới hạn bàn cờ.
Hành động phải đáp ứng quy tắc di chuyển.
Không được vi phạm quy tắc chiếm giữ ô.
7.2. Quy trình di chuyển
text
MOVE REQUEST
     |
     v
CHECK OWNERSHIP
     |
     v
CHECK PIECE STATUS
     |
     v
CHECK DESTINATION
     |
     v
CHECK MOVEMENT RULES
     |
     v
VALID MOVE?
  /       \
 NO       YES
 |         |
REJECT   REVEAL PIECE
           |
           v
       APPLY MOVE
           |
           v
       UPDATE BOARD
           |
           v
       CHECK EFFECTS

7.3. Di chuyển quân úp

Nếu quân đang úp:

Kiểm tra hành động hợp lệ.
Chuyển trạng thái thành FACE_UP.
Công khai thông tin quân theo luật.
Thực hiện di chuyển.
Kiểm tra hiệu ứng phát sinh.
7.4. Di chuyển vào sân đối phương

Quân được phép di chuyển vào sân đối phương nếu đáp ứng luật di chuyển.

Không được giữ trạng thái úp sau khi di chuyển.

8. HỆ THỐNG CHIẾN ĐẤU
8.1. Nguyên tắc

Khi một quân tấn công một quân đối phương, Game Engine xác định kết quả dựa trên:

Rank.
Loại quân.
Luật đặc biệt.
Lá Bí Mật.
Các hiệu ứng đang hoạt động.
8.2. Quy trình chiến đấu
text
ATTACK REQUEST
      |
      v
VALIDATE ATTACK
      |
      v
IDENTIFY BOTH PIECES
      |
      v
COMPARE RANK
      |
      v
CHECK SPECIAL RULES
      |
      v
CHECK SECRET CARDS
      |
      v
RESOLVE EFFECTS
      |
      v
COMMIT RESULT
      |
      v
CHECK VICTORY

8.3. Nguyên tắc xử lý
Không để kết quả chiến đấu phụ thuộc vào giao diện.
Không xử lý một cuộc chiến hai lần.
Mỗi sự kiện chiến đấu có ID duy nhất.
Mọi thay đổi phải được lưu vào trạng thái trận.
Hiệu ứng phải được xử lý đúng thứ tự.
8.4. Các luật đặc biệt

Các luật riêng của từng loài, bao gồm Chuột – Voi và các ngoại lệ Rank, phải được lưu thành các quy tắc độc lập.

Không nên viết điều kiện riêng rải rác trong nhiều phần của mã nguồn.

9. HỆ THỐNG LÁ BÍ MẬT
9.1. Tổng quan

Lá Bí Mật là các khả năng đặc biệt gắn với quân cờ.

Lá có thể ảnh hưởng đến:

Chiến đấu.
Di chuyển.
Loại quân.
Phòng thủ.
Kéo Theo.
Các hiệu ứng đặc biệt khác.
9.2. Trạng thái lá

Đề xuất sử dụng:

ACTIVE: Đang hoạt động.
DISABLED: Đã bị vô hiệu hóa.
CONSUMED: Đã sử dụng hết hiệu lực.
PENDING: Đang chờ xử lý.
9.3. Nguyên tắc kích hoạt

Mỗi lá phải có:

ID.
Chủ sở hữu.
Điều kiện kích hoạt.
Thời điểm kích hoạt.
Mục tiêu hợp lệ.
Hiệu ứng.
Trạng thái hiện tại.
9.4. Vô hiệu hóa Lá Bí Mật

Khi bị hiệu ứng Kéo Theo tác động:

Toàn bộ chức năng của Lá Bí Mật bị vô hiệu hóa.
Không có ngoại lệ.
Không được kích hoạt hiệu ứng cứu quân.
Không được kích hoạt hiệu ứng phòng thủ.
Không được kích hoạt Kéo Theo lần nữa.
Không được tạo hiệu ứng dây chuyền.
9.5. Thứ tự xử lý

Việc vô hiệu hóa phải xảy ra trước khi quân bị loại chính thức.

Nhưng không được để lá có cơ hội kích hoạt thêm hiệu ứng trong khoảng thời gian chuyển tiếp đó.

10. HIỆU ỨNG KÉO THEO
10.1. Mô tả

Kéo Theo là hiệu ứng đặc biệt khiến quân sở hữu nó kéo thêm quân đối phương cùng bị loại khi bản thân bị đánh bại.

10.2. Điều kiện kích hoạt
Quân sở hữu Lá Bí Mật Kéo Theo bị quân đối phương đánh bại.
Lá Kéo Theo vẫn đang ACTIVE.
Hiệu ứng chưa được kích hoạt trong sự kiện hiện tại.
10.3. Kết quả

Khi kích hoạt:

Quân sở hữu Kéo Theo bị loại.
Quân tấn công bị loại theo.
Hệ thống chọn ngẫu nhiên thêm một quân khác của đội tấn công.
Quân được chọn cũng bị loại.

Như vậy, tổng số quân bị loại trong ví dụ cơ bản là 3 quân, gồm quân Kéo Theo và 2 quân của đối phương.

10.4. Quy tắc chọn quân ngẫu nhiên

Quân ngẫu nhiên phải:

Thuộc đội tấn công.
Còn sống.
Đang tồn tại trên bàn.
Không phải quân tấn công đã được chọn làm mục tiêu loại.
Chưa bị loại trong chuỗi sự kiện hiện tại.

Nếu không còn quân hợp lệ khác, bỏ qua bước chọn quân ngẫu nhiên.

Không được chọn quân trong hàng chờ.

### Quy tắc mục tiêu Kéo Theo đã xác nhận

- Chỉ được chọn quân còn sống và đang ở trên bàn (`ALIVE` + `BOARD`).
- Không được chọn quân đã bị loại hoặc quân còn trong hàng chờ (`QUEUE`).
- Quân được chọn ngẫu nhiên là quân thuộc đội của ATTACKER, theo điều kiện mục tiêu của Kéo Theo; không chọn chính ATTACKER.
- Nếu không còn quân hợp lệ để chọn, bỏ qua bước chọn thêm quân.
- Nếu quân mục tiêu có Lá Bí Mật, phải vô hiệu hóa lá trước khi loại quân. Không kích hoạt bất kỳ hiệu ứng nào khác từ lá đó; không cứu quân, không phòng thủ và không tạo hiệu ứng dây chuyền.
- Nếu quân mục tiêu cũng có Kéo Theo, lá bị vô hiệu hóa và không được kích hoạt lần nữa.
- Sau khi xử lý toàn bộ hiệu ứng, nếu cả hai đội đều không còn quân trên bàn thì kết quả là hòa.

10.5. Trường hợp quân ngẫu nhiên có Lá Bí Mật

Nếu quân được chọn sở hữu Lá Bí Mật:

Lật ngửa nếu đang úp.
Vô hiệu hóa toàn bộ chức năng Lá Bí Mật.
Không kích hoạt chức năng nào của lá.
Loại quân theo hiệu ứng Kéo Theo.

Không có ngoại lệ.

10.6. Không có Kéo Theo dây chuyền

Nếu quân được chọn cũng sở hữu Lá Kéo Theo:

Lá bị vô hiệu hóa.
Không kích hoạt hiệu ứng.
Không kéo thêm quân.
Không phát sinh chuỗi loại quân mới.
10.7. Ví dụ

Đội Đỏ:

Quân A sở hữu Kéo Theo.

Đội Xanh:

Quân B tấn công A.
Quân C là quân được chọn ngẫu nhiên.

Kết quả:

A bị loại.
B bị loại.
C bị loại.

Nếu C có bất kỳ Lá Bí Mật nào, toàn bộ chức năng của lá bị vô hiệu hóa trước khi loại.

10.8. Xử lý kỹ thuật

Mỗi lần Kéo Theo phải có một giao dịch riêng.

js
function resolveFollowEffect(game, source, attacker) {
    if (!isSecretActive(source, "FOLLOW")) {
        return;
    }

    const eligibleTargets = getAliveBoardPieces(
        game,
        attacker.team
    ).filter(piece =>
        piece.id !== attacker.id &&
        piece.id !== source.id
    );

    const randomTarget = seededRandomPick(
        eligibleTargets,
        game.random
    );

    const result = [
        createEliminationEvent(source, "FOLLOW_SOURCE"),
        createEliminationEvent(attacker, "FOLLOW_ATTACKER")
    ];

    if (randomTarget) {
        revealPiece(randomTarget);
        disableAllSecretCards(randomTarget);

        result.push(
            createEliminationEvent(
                randomTarget,
                "FOLLOW_RANDOM_TARGET"
            )
        );
    }

    return commitEliminationEvents(game, result);
}


Đây là logic tham chiếu; phải kết hợp với cơ chế giao dịch và kiểm tra trạng thái để chống xử lý trùng.

11. HÀNG CHỜ VÀ TRIỂN KHAI QUÂN
11.1. Hàng chờ

Mỗi đội có hàng chờ riêng.

Hàng chờ chứa các quân chưa được triển khai lên bàn.

11.2. Tổng quân

Mỗi đội không được vượt quá 15 quân sống trong toàn trận, tính cả bàn và hàng chờ.

11.3. Triển khai

Khi quân từ hàng chờ được đưa lên bàn:

Kiểm tra đội sở hữu.
Kiểm tra số quân tối đa.
Kiểm tra ô triển khai hợp lệ.
Kiểm tra điều kiện lượt.
Đưa quân lên bàn.
Đặt trạng thái FACE_UP.
11.4. Không triển khai quân úp

Quân hàng chờ luôn được triển khai ở trạng thái ngửa.

Không có ngoại lệ mặc định.

11.5. Hết quân trên bàn

Nếu một đội không còn quân sống trên bàn thì đội đó thua, dù hàng chờ vẫn còn quân.

12. ĐIỀU KIỆN THẮNG VÀ THUA
12.1. Điều kiện thua

Một đội thua nếu không còn quân sống trên bàn đấu.

Điều này áp dụng ngay cả khi đội đó còn quân trong hàng chờ.

12.2. Điều kiện thắng

Đội còn ít nhất một quân trên bàn trong khi đối phương không còn quân trên bàn sẽ thắng.

12.3. Không tính quân hàng chờ

Quân hàng chờ không được tính vào điều kiện tồn tại quân trên bàn.

12.4. Kiểm tra kết thúc trận

Chỉ kiểm tra kết thúc trận sau khi toàn bộ hiệu ứng đang chờ được xử lý hoàn tất.

12.5. Trường hợp hai đội cùng hết quân

Nếu cả hai đội đồng thời không còn quân trên bàn sau một chuỗi hiệu ứng thì kết quả là HÒA.

13. HỆ THỐNG LƯỢT CHƠI
13.1. Nguyên tắc

Trò chơi hoạt động theo lượt giữa hai đội.

13.2. Một lượt

Một lượt phải:

Xác định đội đang hành động.
Nhận yêu cầu hành động.
Kiểm tra tính hợp lệ.
Thực hiện hành động.
Xử lý hiệu ứng.
Cập nhật bàn cờ.
Kiểm tra thắng thua.
Chuyển lượt nếu trận chưa kết thúc.
13.3. Không chuyển lượt sớm

Không được chuyển lượt khi:

Hiệu ứng còn chờ xử lý.
Giao dịch chiến đấu chưa hoàn tất.
Dữ liệu bàn cờ chưa đồng bộ.
Điều kiện kết thúc trận chưa được kiểm tra.
14. HỆ THỐNG HIỆU ỨNG VÀ XỬ LÝ SỰ KIỆN
14.1. Effect Queue

Tất cả hiệu ứng cần được xử lý qua một hàng đợi sự kiện tập trung.

Ví dụ:

MOVE.
REVEAL.
COMBAT.
ELIMINATION.
FOLLOW.
SECRET_DISABLE.
DEPLOY.
VICTORY_CHECK.
14.2. Nguyên tắc
Xử lý theo thứ tự xác định.
Không kích hoạt lặp lại.
Không xử lý quân đã bị loại.
Không để sự kiện cũ ghi đè trạng thái mới.
Mỗi sự kiện có ID riêng.
14.3. Thứ tự xử lý Kéo Theo
text
COMBAT_RESULT
      |
      v
FOLLOW ACTIVATION CHECK
      |
      v
SELECT RANDOM TARGET
      |
      v
REVEAL RANDOM TARGET
      |
      v
DISABLE ALL SECRET FUNCTIONS
      |
      v
ELIMINATION COMMIT
      |
      v
UPDATE BOARD
      |
      v
CHECK GAME OVER

14.4. Chống vòng lặp

Mỗi sự kiện phải có:

Event ID.
Parent Event ID.
Source Piece ID.
Target Piece ID.
Event Type.
Processing Status.

Giới hạn số sự kiện trong một giao dịch để ngăn lỗi vòng lặp.

15. QUY TẮC NGẪU NHIÊN
15.1. Các hoạt động random

Random có thể được dùng cho:

Số lượng quân ban đầu trên bàn.
Chọn quân ngẫu nhiên của hiệu ứng Kéo Theo.
Các yếu tố random khác nếu luật cho phép.
15.2. Yêu cầu
Random phải được thực hiện phía máy chủ.
Không cho client quyết định kết quả.
Sử dụng Seed có thể kiểm tra.
Ghi lại lịch sử lựa chọn.
Không được random ngoài phạm vi mục tiêu hợp lệ.
15.3. Tái hiện trận đấu

Hệ thống nên lưu:

Seed.
Danh sách hành động.
Các sự kiện phát sinh.
Các kết quả random.
Trạng thái bàn cờ sau từng hành động.
16. GIAO DIỆN VÀ TRẢI NGHIỆM NGƯỜI CHƠI
16.1. Bàn cờ

Phải hiển thị:

Bàn 6×7.
Phân biệt sân Đỏ.
Phân biệt sân Xanh.
Phân biệt vùng trung lập.
Vị trí quân.
Trạng thái úp/ngửa.
16.2. Thông tin quân

Quân ngửa:

Hiển thị hình ảnh.
Hiển thị loại quân.
Hiển thị Rank.
Hiển thị trạng thái Lá Bí Mật phù hợp.

Quân úp:

Không tiết lộ danh tính.
Không tiết lộ Rank.
Không tiết lộ chức năng riêng.
16.3. Thông tin trận

Hiển thị:

Số quân sống trên bàn của Đỏ.
Số quân sống trên bàn của Xanh.
Số quân hàng chờ của mỗi đội.
Lượt hiện tại.
Lịch sử hành động.
Hiệu ứng đang diễn ra.
16.4. Thông báo

Các thông báo quan trọng:

Quân đã di chuyển.
Quân đã lật ngửa.
Chiến đấu đã xảy ra.
Quân bị loại.
Lá Bí Mật được kích hoạt.
Lá Bí Mật bị vô hiệu hóa.
Kéo Theo được kích hoạt.
Đội chiến thắng.
Trận hòa.
17. KIẾN TRÚC GAME ENGINE
17.1. Nguyên tắc kiến trúc

Tách riêng:

Game State.
Rule Engine.
Movement Engine.
Combat Engine.
Secret Card Engine.
Effect Queue.
Random Engine.
Victory Engine.
Multiplayer Synchronization.
17.2. Rule Engine

Rule Engine là nơi duy nhất quyết định tính hợp lệ của luật.

Không để giao diện tự xử lý luật.

17.3. Combat Engine

Chịu trách nhiệm:

Xác định quân tham chiến.
So sánh Rank.
Áp dụng ngoại lệ.
Tạo sự kiện chiến đấu.
Gọi Secret Card Engine.
17.4. Secret Card Engine

Chịu trách nhiệm:

Kiểm tra điều kiện kích hoạt.
Kích hoạt lá.
Vô hiệu hóa lá.
Ngăn kích hoạt trùng.
Quản lý trạng thái lá.
17.5. Victory Engine

Chịu trách nhiệm:

Đếm quân sống trên bàn.
Bỏ qua quân hàng chờ.
Xác định thắng.
Xác định thua.
Xác định hòa.
18. CẤU TRÚC DỮ LIỆU ĐỀ XUẤT
18.1. Game State
js
const gameState = {
    id: "GAME_ID",

    version: "2.5.1",

    status: "IN_PROGRESS",

    currentTurn: "RED",

    board: {
        columns: 6,
        rows: 7,
        cells: []
    },

    teams: {
        RED: {
            pieces: [],
            queue: []
        },

        BLUE: {
            pieces: [],
            queue: []
        }
    },

    random: {
        seed: null,
        history: []
    },

    eventQueue: [],

    history: [],

    winner: null
};

18.2. Piece
js
const piece = {
    id: "PIECE_ID",

    team: "RED",

    type: "PIECE_TYPE",

    rank: 5,

    visibility: "FACE_DOWN",

    lifeStatus: "ALIVE",

    locationType: "BOARD",

    position: {
        x: 0,
        y: 0
    },

    secretCards: []
};

18.3. Secret Card
js
const secretCard = {
    id: "SECRET_ID",

    type: "FOLLOW",

    status: "ACTIVE",

    ownerPieceId: "PIECE_ID",

    activationCount: 0
};

18.4. Event
js
const event = {
    id: "EVENT_ID",

    type: "ELIMINATION",

    sourcePieceId: "SOURCE_ID",

    targetPieceId: "TARGET_ID",

    parentEventId: null,

    reason: "FOLLOW_EFFECT",

    status: "PENDING"
};

18.5. Nguyên tắc lưu dữ liệu
Không lưu hai nguồn dữ liệu trái ngược cho cùng một trạng thái.
Không cho client sửa trực tiếp Game State.
Có cơ chế kiểm tra phiên bản trận.
Có lịch sử hành động.
Có khả năng khôi phục khi mất kết nối.
19. BẢO MẬT VÀ CHỐNG GIAN LẬN
19.1. Server Authoritative

Máy chủ phải là nguồn quyết định cuối cùng.

Client chỉ gửi yêu cầu hành động.

Server kiểm tra và trả về kết quả.

19.2. Không tin dữ liệu client

Không cho client tự quyết định:

Rank.
Kết quả chiến đấu.
Trạng thái quân.
Kết quả random.
Kết quả thắng thua.
Trạng thái Lá Bí Mật.
19.3. Chống gửi hành động trùng

Mỗi hành động cần ID riêng.

Nếu một hành động được gửi nhiều lần, hệ thống phải nhận diện và không thực thi lặp.

19.4. Đồng bộ

Hai người chơi phải nhận cùng một kết quả Game State sau mỗi hành động.

20. XỬ LÝ LỖI VÀ TÌNH HUỐNG ĐẶC BIỆT
20.1. Di chuyển không hợp lệ
Từ chối hành động.
Không thay đổi trạng thái.
Thông báo lý do.
20.2. Quân đã bị loại

Không được:

Di chuyển.
Tấn công.
Kích hoạt lá.
Triển khai lại nếu không có luật hồi sinh.
20.3. Quân không còn tồn tại trên bàn

Không được tính là quân sống trên bàn.

20.4. Không còn mục tiêu Kéo Theo hợp lệ

Nếu không có quân khác hợp lệ để chọn:

Bỏ qua bước chọn ngẫu nhiên.
Tiếp tục hoàn tất hiệu ứng.
Kiểm tra thắng thua.
20.5. Hiệu ứng lỗi

Nếu một giao dịch lỗi:

Không commit một phần kết quả.
Khôi phục trạng thái trước giao dịch.
Ghi lại lỗi.
Không chuyển lượt.
20.6. Mất kết nối

Không được làm mất trạng thái trận.

Khi kết nối lại, người chơi phải nhận được trạng thái mới nhất từ máy chủ.

21. BỘ TEST CASE
21.1. Số lượng quân
ID	Kiểm thử	Kết quả
TC001	Random 8 quân ban đầu	Hợp lệ
TC002	Random 9 quân ban đầu	Hợp lệ
TC003	Random 10 quân ban đầu	Hợp lệ
TC004	Tổng 15 quân mỗi đội	Hợp lệ
TC005	Thêm quân vượt 15	Từ chối
TC006	Tổng hai đội 30 quân	Hợp lệ
TC007	Quân bàn và hàng chờ được đếm đúng	Hợp lệ
21.2. Bàn cờ
ID	Kiểm thử	Kết quả
TC008	Bàn có 6 cột	Đúng
TC009	Bàn có 7 hàng	Đúng
TC010	Sân Đỏ có 3 hàng	Đúng
TC011	Sân Xanh có 3 hàng	Đúng
TC012	Trung lập có 1 hàng	Đúng
TC013	Tổng 42 ô	Đúng
TC014	Hai quân cùng ô	Từ chối
21.3. Quân úp
ID	Kiểm thử	Kết quả
TC015	Quân úp đứng yên	Giữ trạng thái úp
TC016	Quân úp di chuyển một ô	Ngửa
TC017	Quân úp di chuyển vào trung lập	Ngửa
TC018	Quân úp di chuyển vào sân đối phương	Ngửa
TC019	Quân úp bị hiệu ứng di chuyển	Ngửa
TC020	Quân hàng chờ được triển khai	Ngửa
TC021	Hành động di chuyển bị từ chối	Không đổi trạng thái
TC022	Quân ngửa tiếp tục di chuyển	Vẫn ngửa
21.4. Kéo Theo
ID	Kiểm thử	Kết quả
TC023	Kéo Theo bị kích hoạt hợp lệ	Kích hoạt
TC024	Quân tấn công bị kéo theo	Bị loại
TC025	Chọn thêm một quân ngẫu nhiên	Bị loại
TC026	Không có quân ngẫu nhiên hợp lệ	Bỏ qua lựa chọn
TC027	Mục tiêu có Lá Bí Mật	Vô hiệu hóa toàn bộ chức năng
TC028	Mục tiêu có Kéo Theo	Không kích hoạt dây chuyền
TC029	Mục tiêu đang úp	Lật ngửa trước khi loại
TC030	Lá đã vô hiệu hóa	Không kích hoạt
TC031	Quân đã bị loại bị chọn lần nữa	Không hợp lệ
TC032	Không loại trùng quân	Đúng
21.5. Chiến thắng
ID	Kiểm thử	Kết quả
TC033	Đỏ hết quân trên bàn, còn hàng chờ	Đỏ thua
TC034	Xanh hết quân trên bàn, còn hàng chờ	Xanh thua
TC035	Đỏ còn quân, Xanh hết quân	Đỏ thắng
TC036	Xanh còn quân, Đỏ hết quân	Xanh thắng
TC037	Hai đội cùng hết quân	Hòa
TC038	Hiệu ứng chưa hoàn tất	Chưa kiểm tra kết thúc
TC039	Hiệu ứng hoàn tất	Kiểm tra kết thúc
21.6. Hệ thống lượt và dữ liệu
ID	Kiểm thử	Kết quả
TC040	Hành động đúng lượt	Chấp nhận
TC041	Hành động sai lượt	Từ chối
TC042	Gửi hành động trùng	Không thực thi lần hai
TC043	Mất kết nối	Khôi phục được
TC044	Random cùng Seed và cùng đầu vào	Cùng kết quả
TC045	Đồng bộ hai client	Cùng Game State
TC046	Effect Queue bị lỗi	Rollback
TC047	Chuyển lượt khi còn hiệu ứng	Không cho phép
22. NGUYÊN TẮC CÂN BẰNG TRÒ CHƠI
22.1. Công bằng

Hai đội phải có cùng:

Giới hạn quân.
Quy tắc di chuyển.
Quy tắc chiến đấu.
Khả năng triển khai.
Điều kiện thắng thua.
22.2. Random

Random không được tạo lợi thế cố định cho đội nào.

22.3. Kéo Theo

Kéo Theo là hiệu ứng mạnh vì có thể loại đồng thời ba quân trong một tình huống.

Cần kiểm tra:

Tần suất xuất hiện.
Khả năng chống lại.
Tác động đến cân bằng trận.
Khả năng kết thúc trận quá nhanh.

Không tự ý giảm sức mạnh hoặc thay đổi hiệu ứng khi chưa có quyết định thiết kế.

22.4. Hiệu ứng đặc biệt

Mỗi Lá Bí Mật phải có mô tả chính xác:

Điều kiện.
Thời điểm.
Mục tiêu.
Hiệu ứng.
Ngoại lệ.
Trạng thái sau kích hoạt.
23. NHỮNG QUY TẮC PHẢI GIỮ NGUYÊN

Các quy tắc dưới đây là nền tảng của phiên bản V2.5.1.

Bàn cờ có kích thước 6×7.
Sân Đỏ có 3 hàng.
Sân Xanh có 3 hàng.
Vùng trung lập có 1 hàng.
Mỗi đội tối đa 15 quân.
Hai đội tối đa 30 quân.
Mỗi đội bắt đầu với 8–10 quân trên bàn.
Tổng quân ban đầu trên bàn là 16–20.
Quân úp di chuyển là phải ngửa.
Quân hàng chờ triển khai luôn ngửa.
Đội hết quân trên bàn sẽ thua dù còn hàng chờ.
Kéo Theo loại quân sở hữu hiệu ứng, quân tấn công và thêm một quân ngẫu nhiên của đội tấn công.
Quân bị Kéo Theo có Lá Bí Mật sẽ bị vô hiệu hóa toàn bộ chức năng của lá.
Không có Kéo Theo dây chuyền.
Quân đang úp bị chọn bởi Kéo Theo phải lật ngửa trước khi bị loại.
Tất cả hiệu ứng phải được xử lý hoàn tất trước khi kiểm tra kết thúc trận.
Máy chủ là nguồn quyết định kết quả trận đấu.
24. CÁC NỘI DUNG CẦN XÁC NHẬN TRƯỚC KHI PHÁT HÀNH

Để tránh tự ý thay đổi luật gốc, các nội dung sau cần được đối chiếu với tài liệu thiết kế ban đầu.

Nội dung	Trạng thái
Danh sách đầy đủ 9 loài quân	Cần đối chiếu
Rank cụ thể của từng loài	Cần đối chiếu
Luật Chuột – Voi đầy đủ	Cần đối chiếu
Luật quân cùng Rank	Cần đối chiếu
Cách di chuyển chính xác của từng loài	Cần đối chiếu
Toàn bộ danh sách Lá Bí Mật	Cần đối chiếu
Điều kiện triển khai quân hàng chờ	Cần xác định
Giới hạn triển khai mỗi lượt	Cần xác định
Điều kiện kích hoạt từng Lá Bí Mật	Cần đối chiếu
Quy tắc bắt đầu và chọn đội đi trước	Cần xác định
Giới hạn thời gian lượt	Cần xác định
Các hiệu ứng đặc biệt ngoài Kéo Theo	Cần đối chiếu

Không được tự điền các nội dung này bằng giả định.

KẾT LUẬN

V2.5.1 là bộ khung luật chơi và kiến trúc kỹ thuật thống nhất cho trò chơi.

Mục tiêu của phiên bản này là:

Luật chơi nhất quán.
Không có hiệu ứng tự kích hoạt vô hạn.
Không có tình trạng quân úp di chuyển nhưng vẫn giữ trạng thái úp.
Không có tình trạng quân hàng chờ được triển khai thành quân úp.
Không vượt quá giới hạn 15 quân mỗi đội.
Kéo Theo hoạt động theo một quy trình duy nhất.
Không cho phép Lá Bí Mật bị kéo theo kích hoạt chức năng.
Không tính quân hàng chờ vào điều kiện tồn tại quân trên bàn.
Không kiểm tra thắng thua trước khi hoàn tất hiệu ứng.
Có thể kiểm thử, tái hiện và bảo trì.

Đây là tài liệu chuẩn V2.5.1 để phát triển và đối chiếu. Mọi thay đổi luật tiếp theo phải được cập nhật đồng bộ vào README, Rule Engine, Game State, Effect Queue và Test Case.

---

## GHI CHÚ VỀ CÁC PHỤ LỤC NGUYÊN BẢN V2.5 / V2.5.1

Các phần phụ lục sao lưu nội dung V2.5 và V2.5.1 được giữ lại nhằm tra cứu nguồn gốc. Nếu nội dung trong phụ lục mâu thuẫn với quy tắc chuẩn V2.6.1 ở các phần đầu tài liệu hoặc với các xác nhận cập nhật tại nhật ký V2.6.1, **quy tắc chuẩn V2.6.1 được ưu tiên**. Không dùng các test case/điều kiện thắng thua cũ trong phụ lục để ghi đè quyết định mới.

## PHỤ LỤC – NHẬT KÝ CẬP NHẬT V2.6.1

Các nội dung đã được người dùng xác nhận và cập nhật trong bản này:

1. Mỗi đội có chính xác 15 quân khi bắt đầu trận.
2. Mỗi đội có 8–10 quân trên bàn; số lượng trên bàn của hai đội phải bằng nhau.
3. Số quân hàng chờ tự động tính bằng `15 - số quân trên bàn`, tương ứng 5–7 quân.
4. Mỗi đội bắt buộc có ít nhất một Chuột và một Voi; không có loài nào khác bắt buộc theo xác nhận hiện tại.
5. Kéo Theo chỉ chọn quân còn sống trên bàn thuộc đội của ATTACKER; không chọn quân đã bị loại hoặc trong hàng chờ. Nếu không có mục tiêu hợp lệ thì bỏ qua bước chọn thêm.
6. Nếu mục tiêu Kéo Theo có Lá Bí Mật, vô hiệu hóa lá trước khi loại quân và không kích hoạt bất kỳ hiệu ứng nào khác. Không tạo dây chuyền.
7. Nếu sau khi xử lý hiệu ứng, cả hai đội đều không còn quân trên bàn thì hòa. Các điều kiện thắng/thua tổng quát khác vẫn chờ xác nhận.
8. Bổ sung Battle History: server ghi lại diễn biến, kể cả hành động thất bại/bị từ chối và hiệu ứng; sau trận người chơi chọn xem hoặc không xem. Cả hai người chơi dùng chung bản ghi chỉ đọc; không tiết lộ thông tin ẩn trước thời điểm được phép.

**Những điểm chưa được chốt:** bảng đầy đủ cho các tổ hợp chiến đấu úp/ngửa, quy tắc chiếm ô ở từng trường hợp, điều kiện thắng/thua tổng quát, cùng một số cấu hình Lá Bí Mật và timeout.

# Onboarding Copilot — Trợ lý Hội nhập Nhân sự mới

> **Prototype Frontend hoàn chỉnh** dành cho demo nội bộ. Sử dụng dữ liệu giả lập (mock data) cục bộ, kịch bản trả lời thông minh không cần gọi backend/API ngoài, hỗ trợ responsive hoàn hảo trên cả máy tính (Desktop Sidebar) và điện thoại di động (Mobile Bottom Bar).

---

## 1. Khởi chạy dự án (Quick Start)

Dự án sử dụng **React 19 + Vite + TypeScript + Tailwind CSS v4**.

```bash
# 1. Cài đặt thư viện phụ thuộc (nếu chưa cài)
npm install

# 2. Khởi chạy môi trường phát triển cục bộ
npm run dev

# Ứng dụng sẽ chạy tại: http://localhost:5173
```

Để kiểm tra bản build đóng gói:
```bash
npm run build
npm run preview
```

---

## 2. Bối cảnh sản phẩm (Why this product exists)

Nhân sự mới gia nhập công ty thường không thể sử dụng chatbot IT nội bộ trong 1–3 ngày đầu tiên vì tài khoản công ty chưa được kích hoạt. Hậu quả là toàn bộ thắc mắc đổ dồn vào Mentor hoặc bị nghẽn thông tin.

**Onboarding Copilot** được thiết kế để truy cập ngay từ **Ngày 0** bằng **Email cá nhân + mã xác thực OTP**, tích hợp 6 chức năng thiết yếu:
1. **Hỏi đáp thông minh (AI Copilot):** Trả lời tức thì quy trình, có kèm thẻ nguồn tài liệu (Source Card), danh bạ đầu mối (Contact Card) và nút "Hỏi người thật".
2. **Kho tài liệu & Đăng ký quyền:** Danh mục hệ thống (Jira, Confluence, GitHub, VPN, Email) có drawer từng bước và nút đánh dấu trạng thái quyền.
3. **Lộ trình từng bước (Drip-feed Roadmap):** Chia theo Ngày 1, Tuần 1, Tuần 2, Ngày 30; khóa các giai đoạn tương lai để tránh quá tải thông tin cho tân binh.
4. **Từ điển thuật ngữ (Glossary):** Tự động phát hiện và gạch chân chấm (`...`) các thuật ngữ xuất hiện trong câu trả lời của bot; rê chuột (desktop) hoặc chạm (mobile) để xem tooltip giải nghĩa nhanh.
5. **Danh bạ giải quyết vấn đề (Contacts):** Tìm kiếm theo **vấn đề gặp phải** (Search by Problem, ví dụ: "máy tính", "lương", "thẻ xe") thay vì phải nhớ tên người phụ trách.
6. **Sơ đồ tổ chức (Org Tree):** Cây phòng ban trực quan, có nút **"Team của tôi"** giúp tân binh định vị ngay vị trí làm việc của mình.
7. **Góc nhìn Mentor (Mentor View):** Bảng theo dõi tiến độ các tân binh, gắn nhãn cảnh báo nghẽn (ví dụ: "Đang chậm", "Hỏi lặp lại về: phân quyền") và danh sách câu hỏi bot chưa giải đáp để bổ sung tài liệu.

---

## 3. Kịch bản Demo mẫu (Demo Script — End-to-End Flow)

| Bước | Màn hình | Thao tác demo | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **1** | `/login` | Nhập email cá nhân (`minh.product@gmail.com`) → Bấm **Gửi mã OTP** → Bấm **Dùng mã nhanh (888888)** hoặc nhập 6 số bất kỳ. | Hiển thị thông báo *"Không cần tài khoản công ty. Link do HR gửi..."* và chuyển thẳng vào Trang chủ. |
| **2** | `/` (Hôm nay) | Xem lời chào *"Chào Minh 👋"*, tiến độ onboarding (thanh tiến độ và %). Bấm tick vào ô tròn của một đầu việc trong danh sách *"Việc hôm nay"*. | Thanh tiến độ tăng ngay lập tức và toast thông báo thành công xuất hiện ở góc màn hình. |
| **3** | `/` (Hôm nay) | Bấm vào gợi ý câu hỏi: **"Xin quyền GitHub thế nào?"** ở khung chat dưới cùng. | Tự động chuyển sang màn hình `/chat`, hiển thị tin nhắn đang gõ (~800ms) rồi bot trả lời 4 bước chi tiết kèm **Source Card** (*Cẩm nang phân quyền hệ thống*). |
| **4** | `/chat` | Rê chuột vào thuật ngữ được gạch chân chấm (ví dụ: **RASCI**, **GitHub**, **Dispatching**...). | Tooltip hiển thị giải nghĩa thuật ngữ, thẻ dự án và liên kết tra cứu nhanh. |
| **5** | `/chat` | Gõ câu hỏi bất kỳ ngoài luồng, ví dụ: *"Công ty có xe buýt đưa đón nhân viên không?"* | Bot trả lời câu fallback: *"Mình chưa chắc về câu này..."* kèm nút **Hỏi người thật**. Bấm nút mở popup với đầu mối gợi ý và tin nhắn soạn sẵn → Bấm Gửi → Toast xác nhận gửi SLA 2 giờ. |
| **6** | `/docs` | Vào mục **Tài liệu & Quyền** qua menu → Tìm thẻ **GitHub Enterprise** (đang ở trạng thái *Chưa có*) → Bấm vào thẻ. | Drawer bên phải mở ra hiển thị 4 bước IT, người duyệt, thời gian xử lý. Bấm **"Đánh dấu đã có quyền"** → Huy hiệu đổi sang màu xanh *"Đã có"* và đầu việc tương ứng được tự động tick hoàn thành. |
| **7** | `/roadmap` | Vào mục **Lộ trình** qua menu. | Xem timeline dọc: Ngày 1 (đã xong), Tuần 1 (đang thực hiện), Tuần 2 và Ngày 30 (bị mờ kèm icon ổ khóa và nhãn *"Mở vào Tuần 2"*). |
| **8** | `/org` | Vào mục **Sơ đồ tổ chức** → Bấm nút **"Team của tôi"**. | Hệ thống tự động mở rộng nhánh *Khối Công nghệ & Vận hành → Phòng Vận hành & Sản phẩm* và viền sáng nổi bật **Team Điều phối**. |
| **9** | `/mentor` | Chuyển công tắc trên thanh tiêu đề: **"Nhân sự mới / Mentor"**. | Hiển thị bảng Mentee với các cảnh báo vàng/đỏ (*"Đang chậm: Chưa hoàn thành cấu hình môi trường"*, *"Hỏi lặp lại nhiều về: phân quyền"*) và thẻ danh sách câu hỏi bot chưa giải đáp được. |

---

## 4. Hướng dẫn chỉnh sửa Dữ liệu mẫu (Mock Data Guide)

Toàn bộ dữ liệu nằm trong thư mục `src/data/*.ts`, được viết bằng TypeScript rõ ràng, có type safety:

- **`src/data/user.ts`**: Thông tin người dùng hiện tại (Họ tên, role, team, mentor, avatar, email cá nhân & công ty).
- **`src/data/checklist.ts`**: Danh sách 12 đầu việc onboarding và 4 giai đoạn lộ trình (`mockRoadmapStages`).
- **`src/data/accessSystems.ts`**: 5 hệ thống cấp quyền (Jira, GitHub, Confluence, Email, VPN) kèm trạng thái (`not_started`, `pending`, `granted`), người duyệt và quy trình từng bước.
- **`src/data/documents.ts`**: 12 tài liệu nội bộ chia đều theo 4 nhóm (*Nhân sự*, *IT & phân quyền*, *Quy trình dự án*, *Hành chính*).
- **`src/data/glossary.ts`**: Danh sách từ điển thuật ngữ với các định nghĩa bắt buộc (RASCI, Dispatching, Matching, Pulling, WPS, CM, SOP, PR, Onboarding, Buddy, SLA, OKR).
- **`src/data/contacts.ts`**: Danh bạ đầu mối theo vấn đề (IT Helpdesk, HR C&B, Admin, Mentor, Tech Lead, PMO, SecOps, Văn hóa).
- **`src/data/org.ts`**: Cấu trúc cây tổ chức 1 Khối → 4 Phòng ban → 2-3 Team mỗi phòng ban, có cờ `isMyTeam: true` cho Team Điều phối.
- **`src/data/mentor.ts`**: Danh sách tân binh kèm nhãn cảnh báo tiến độ và các câu hỏi bot chưa giải đáp.

---

## 5. Cấu trúc thư mục mã nguồn

```
src/
├── assets/                  # Biểu tượng và logo tĩnh
├── components/
│   ├── Common/
│   │   ├── AskRealPersonModal.tsx   # Modal chuyển câu hỏi tới người phụ trách
│   │   ├── ContactCard.tsx          # Thẻ thông tin đầu mối hỗ trợ
│   │   ├── DocPreviewModal.tsx      # Modal đọc nhanh tài liệu
│   │   ├── GlossaryHighlightText.tsx# Parser gạch chân chấm & tooltip thuật ngữ
│   │   ├── SourceCard.tsx           # Thẻ trích dẫn tài liệu đính kèm câu trả lời
│   │   ├── SystemAccessDrawer.tsx   # Drawer các bước xin quyền hệ thống
│   │   └── ToastContainer.tsx       # Hệ thống thông báo góc màn hình
│   └── Layout/
│       ├── AppLayout.tsx            # Khung sườn chính
│       ├── MobileBottomNav.tsx      # Thanh điều hướng dưới cùng cho mobile
│       ├── Navbar.tsx               # Header với logo, tiến độ & role toggle
│       └── Sidebar.tsx              # Menu dọc cho laptop / desktop
├── context/
│   ├── AppContext.tsx               # Provider quản lý state phiên làm việc
│   ├── AppContextModel.ts           # Context definition & types
│   ├── index.ts                     # Barrel export
│   └── useApp.ts                    # Hook truy xuất state toàn cục
├── data/                            # File mock data
├── pages/
│   ├── ChatPage.tsx                 # Màn hình Chatbot
│   ├── ContactsPage.tsx             # Màn hình Danh bạ theo vấn đề
│   ├── DocsPage.tsx                 # Màn hình Kho tài liệu & Cấp quyền
│   ├── GlossaryPage.tsx             # Màn hình Từ điển thuật ngữ
│   ├── HomePage.tsx                 # Màn hình Hôm nay
│   ├── LoginPage.tsx                # Màn hình Đăng nhập email cá nhân + OTP
│   ├── MentorPage.tsx               # Màn hình Góc nhìn Mentor
│   ├── OrgPage.tsx                  # Màn hình Sơ đồ tổ chức
│   └── RoadmapPage.tsx              # Màn hình Lộ trình 30 ngày
├── types/
│   └── index.ts                     # Toàn bộ Interface & Type định nghĩa
├── utils/
│   ├── chatbotEngine.ts             # Bộ xử lý câu hỏi theo intent & từ khóa
│   └── textUtils.ts                 # Chuẩn hóa tiếng Việt không dấu & so khớp
├── App.tsx                          # Cấu hình Router & Route guards
├── index.css                        # Design token & Tailwind CSS v4 setup
└── main.tsx                         # Entry point
```

---

## 6. Tiêu chuẩn thiết kế & Trải nghiệm (UI/UX Standards)

- **Màu sắc thương hiệu:** Deep blue (`#1F3A5F`), Soft accent (`#E8EEF4`), màu bổ trợ hiện đại (Emerald, Sky, Amber).
- **Typography:** Bộ font Inter quốc tế, hiển thị tiếng Việt sắc nét và đầy đủ dấu thanh điệu.
- **Micro-interactions:** Hiệu ứng hover mượt mà, phản hồi 👍/👎 cho bot, badge trạng thái quyền cập nhật tức thì, drawer và modal đóng mở tự nhiên.
- **Hoàn toàn độc lập:** Không phụ thuộc bất kỳ API mạng ngoài nào; chạy mượt mà ngay cả khi ngắt kết nối internet.

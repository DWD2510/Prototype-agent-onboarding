import type { AccessSystem } from '../types';

export const initialAccessSystems: AccessSystem[] = [
  {
    id: 'jira',
    name: 'Jira Software',
    code: 'JIRA',
    category: 'Quản lý công việc & Sprint',
    iconName: 'Kanban',
    status: 'pending',
    approver: 'Tech Lead / Engineering Manager',
    typicalTime: '1 ngày làm việc',
    formUrl: 'https://forms.internal.company.vn/request-jira',
    description: 'Hệ thống quản lý task, theo dõi tiến độ sprint và backlog của team.',
    steps: [
      'Đăng nhập cổng Service Desk nội bộ bằng tài khoản tạm thời hoặc email nhân sự.',
      'Chọn mục "Yêu cầu cấp quyền phần mềm" → tìm kiếm "Jira".',
      'Điền thông tin dự án: chọn "Project GSM Điều phối" và nhóm quyền "Member / Contributor".',
      'Gắn thẻ Mentor/Tech Lead (Trần Minh Anh) vào mục Người phê duyệt.',
      'Bấm Gửi và theo dõi ticket ID được gửi qua email.'
    ]
  },
  {
    id: 'github',
    name: 'GitHub Enterprise',
    code: 'GITHUB',
    category: 'Mã nguồn & Tài liệu kỹ thuật',
    iconName: 'GitBranch',
    status: 'not_started',
    approver: 'Tech Lead / DevOps Team',
    typicalTime: '1 - 2 ngày làm việc',
    formUrl: 'https://forms.internal.company.vn/request-github',
    description: 'Kho lưu trữ mã nguồn, tài liệu API và các luồng pull request của dự án.',
    steps: [
      'Đăng ký tài khoản cá nhân trên github.com (nếu chưa có).',
      'Bật xác thực 2 lớp (2FA) bắt buộc bằng Google Authenticator hoặc SMS.',
      'Truy cập cổng IT Portal → chọn "Xin gia nhập Tổ chức GitHub Công ty".',
      'Nhập username GitHub cá nhân và chọn Team: "gsm-dispatching-team".',
      'Đợi email lời mời từ GitHub và nhấn "Accept Invitation".'
    ]
  },
  {
    id: 'confluence',
    name: 'Confluence Wiki',
    code: 'CONFLUENCE',
    category: 'Kho tri thức & Tài liệu quy trình',
    iconName: 'BookOpen',
    status: 'not_started',
    approver: 'PMO / Knowledge Manager',
    typicalTime: '1 ngày làm việc',
    formUrl: 'https://forms.internal.company.vn/request-confluence',
    description: 'Kho tài liệu đặc tả sản phẩm (PRD), hướng dẫn vận hành (SOP) và quy chuẩn làm việc.',
    steps: [
      'Truy cập đường dẫn wiki.internal.company.vn.',
      'Hệ thống tự động kích hoạt tài khoản SSO; nếu bị khóa hãy mở ticket yêu cầu quyền cấp Space.',
      'Gửi ticket xin cấp quyền vào Không gian làm việc: "GSM Operations & Product".',
      'Người phê duyệt: PMO Lead.'
    ]
  },
  {
    id: 'email',
    name: 'Email Công ty (Google Workspace)',
    code: 'EMAIL',
    category: 'Giao tiếp & Lịch làm việc',
    iconName: 'Mail',
    status: 'granted',
    approver: 'HR Operations',
    typicalTime: 'Ngay khi nhận việc',
    formUrl: 'https://mail.google.com',
    description: 'Hòm thư điện tử chính thức và công cụ Google Calendar để họp nội bộ.',
    steps: [
      'Nhận thông tin đăng nhập ban đầu từ HR qua email cá nhân vào Ngày 1.',
      'Đăng nhập Gmail, thiết lập mật khẩu mới phức tạp theo tiêu chuẩn an toàn.',
      'Cài đặt chữ ký email chuẩn của công ty theo mẫu hướng dẫn.',
      'Đồng bộ lịch Google Calendar với team Điều phối.'
    ]
  },
  {
    id: 'vpn',
    name: 'VPN Nội bộ (OpenVPN)',
    code: 'VPN',
    category: 'Bảo mật & Mạng nội bộ',
    iconName: 'ShieldCheck',
    status: 'not_started',
    approver: 'IT Security',
    typicalTime: '1 - 2 ngày làm việc',
    formUrl: 'https://forms.internal.company.vn/request-vpn',
    description: 'Kết nối mạng riêng ảo bảo mật để truy cập database staging, dashboard nội bộ từ xa.',
    steps: [
      'Tải phần mềm OpenVPN Connect về máy tính làm việc.',
      'Điền form yêu cầu cấp Profile VPN trên IT Portal với lý do: "Truy cập dashboard nội bộ phục vụ onboarding".',
      'Chờ IT Security kiểm tra cài đặt phần mềm diệt virus trên máy.',
      'Nhận file config .ovpn qua email bảo mật và import vào ứng dụng OpenVPN.'
    ]
  }
];

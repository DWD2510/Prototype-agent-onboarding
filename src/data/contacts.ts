import type { ContactItem } from '../types';

export const mockContacts: ContactItem[] = [
  {
    id: 'cnt-it',
    problem: 'Sự cố máy tính, mạng wifi, cài đặt phần mềm & cấp quyền hệ thống',
    department: 'Ban Công nghệ Thông tin',
    leadRole: 'IT Helpdesk Officer (Trực hỗ trợ)',
    teamEmail: 'it-helpdesk@company.vn',
    channel: 'Slack #it-helpdesk / Cổng Service Desk',
    responseTime: 'Trong vòng 30 phút - 2 giờ',
    iconName: 'Laptop',
    tags: ['máy tính', 'lỗi', 'hỏng', 'wifi', 'mạng', 'phần mềm', 'cấp quyền', 'jira', 'github', 'vpn', 'email']
  },
  {
    id: 'cnt-hr-cb',
    problem: 'Lương bổng, thuế TNCN, bảo hiểm xã hội (BHXH) & hợp đồng lao động',
    department: 'Phòng Nhân sự',
    leadRole: 'Chuyên viên Nhân sự & Phúc lợi (HR C&B)',
    teamEmail: 'hr-cb@company.vn',
    channel: 'Email nội bộ / Hotline HR tầng 6',
    responseTime: 'Trong vòng 4 - 8 giờ làm việc',
    iconName: 'CreditCard',
    tags: ['lương', 'thuế', 'bảo hiểm', 'bhxh', 'hợp đồng', 'thử việc', 'chấm công', 'ngày phép', 'nghỉ phép']
  },
  {
    id: 'cnt-admin',
    problem: 'Thẻ ra vào, vé gửi xe, văn phòng phẩm & phòng họp',
    department: 'Phòng Hành chính - Quản trị',
    leadRole: 'Điều phối viên Quản trị Văn phòng (Admin Desk)',
    teamEmail: 'admin-desk@company.vn',
    channel: 'Quầy Lễ tân Tầng 1 / Email văn phòng',
    responseTime: 'Trong ngày làm việc',
    iconName: 'Building',
    tags: ['thẻ', 'thẻ ra vào', 'gửi xe', 'vé xe', 'văn phòng phẩm', 'phòng họp', 'chuyển chỗ', 'bàn ghế']
  },
  {
    id: 'cnt-mentor',
    problem: 'Định hướng công việc, giải đáp nghiệp vụ & hướng dẫn thử việc',
    department: 'Team Điều phối',
    leadRole: 'Trần Minh Anh (Senior Product Lead - Mentor)',
    teamEmail: 'anh.tran@company.vn',
    channel: 'Slack DM @minhanh.tran / Bàn làm việc B12',
    responseTime: 'Ngay khi có thể (trong 1 - 2 giờ)',
    iconName: 'UserCheck',
    tags: ['mentor', 'nghiệp vụ', 'hướng dẫn', 'thử việc', 'matching', 'dispatching', '1-on-1', 'hỏi việc']
  },
  {
    id: 'cnt-techlead',
    problem: 'Kiến trúc kỹ thuật, review PR & phê duyệt quyền kho GitHub',
    department: 'Phòng Kỹ thuật GSM',
    leadRole: 'Nguyễn Hải Nam (Tech Lead)',
    teamEmail: 'techlead-gsm@company.vn',
    channel: 'Slack #gsm-eng-core / GitHub mentions',
    responseTime: 'Trong vòng 2 - 4 giờ làm việc',
    iconName: 'GitPullRequest',
    tags: ['tech lead', 'kỹ thuật', 'github', 'review pr', 'code', 'deploy', 'kiến trúc', 'database']
  },
  {
    id: 'cnt-pmo',
    problem: 'Quy trình dự án, ma trận phân vai RASCI & kế hoạch Sprint',
    department: 'Ban Quản trị Dự án (PMO)',
    leadRole: 'Chuyên viên Điều phối Dự án (PMO Lead)',
    teamEmail: 'pmo-team@company.vn',
    channel: 'Slack #pmo-support / Jira Board',
    responseTime: 'Trong vòng 4 giờ làm việc',
    iconName: 'Kanban',
    tags: ['pmo', 'rasci', 'sprint', 'quy trình', 'tiến độ', 'kế hoạch', 'scrum']
  },
  {
    id: 'cnt-security',
    problem: 'Cảnh báo an toàn thông tin, cấp chứng chỉ VPN & xử lý nghi vấn bảo mật',
    department: 'Ban An toàn Thông tin (IT Sec)',
    leadRole: 'Kỹ sư An toàn Thông tin (SecOps)',
    teamEmail: 'secops@company.vn',
    channel: 'Kênh khẩn cấp Slack #security-hotline',
    responseTime: 'Phản hồi khẩn cấp < 15 phút',
    iconName: 'ShieldAlert',
    tags: ['bảo mật', 'an toàn', 'virus', 'vpn', 'chứng chỉ', 'mật khẩu', 'lộ lọt', 'phishing']
  },
  {
    id: 'cnt-culture',
    problem: 'Văn hóa công ty, hoạt động câu lạc bộ, teambuilding & đóng góp ý kiến',
    department: 'Ban Văn hóa Doanh nghiệp',
    leadRole: 'Cán bộ Truyền thông Nội bộ & Văn hóa',
    teamEmail: 'culture@company.vn',
    channel: 'Workplace / Kênh Slack #all-hands',
    responseTime: 'Trong vòng 24 giờ',
    iconName: 'HeartHandshake',
    tags: ['văn hóa', 'teambuilding', 'sinh nhật', 'câu lạc bộ', 'happy hour', 'gắn kết']
  }
];

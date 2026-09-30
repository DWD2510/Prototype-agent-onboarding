import type { DocumentItem } from '../types';

export const mockDocuments: DocumentItem[] = [
  // Nhân sự (hr)
  {
    id: 'doc-hr-01',
    title: 'Sổ tay nhân sự & Thủ tục hoàn thiện hồ sơ thử việc',
    category: 'hr',
    categoryLabel: 'Nhân sự',
    updatedAt: '15/09/2026',
    owner: 'Phòng Nhân sự (HR C&B)',
    summary: 'Quy định về hợp đồng thử việc, bảo hiểm y tế, hồ sơ giấy tờ cần nộp trong 7 ngày đầu tiên.',
    readTime: '8 phút',
    content: 'Tất cả nhân sự mới cần hoàn tất các giấy tờ: Sơ yếu lý lịch, CCCD công chứng, bằng cấp liên quan và thông tin tài khoản ngân hàng nhận lương. Mọi thắc mắc liên hệ hr-cb@company.vn.'
  },
  {
    id: 'doc-hr-02',
    title: 'Chính sách đánh giá thử việc 30 & 60 ngày',
    category: 'hr',
    categoryLabel: 'Nhân sự',
    updatedAt: '10/09/2026',
    owner: 'Phòng Phát triển Nguồn nhân lực',
    summary: 'Tiêu chí đánh giá mức độ hòa nhập văn hóa, tiến độ công việc chuyên môn và quy trình xét ký hợp đồng chính thức.',
    readTime: '6 phút',
    content: 'Quy trình đánh giá gồm 3 bước: Nhân viên tự đánh giá qua form, Quản lý trực tiếp (Line Manager) phản hồi và HR tổng hợp kết quả trước ngày thứ 55 của kỳ thử việc.'
  },
  {
    id: 'doc-hr-03',
    title: 'Chính sách ngày phép, làm việc linh hoạt (WFH) & Chấm công',
    category: 'hr',
    categoryLabel: 'Nhân sự',
    updatedAt: '20/09/2026',
    owner: 'Phòng Nhân sự',
    summary: 'Quy định số ngày phép năm (12 ngày/năm), cách đăng ký nghỉ phép trên hệ thống HR Portal và quy chế chấm công vân tay/app.',
    readTime: '5 phút',
    content: 'Nhân viên trong thời gian thử việc được hưởng 1 ngày phép cho mỗi tháng làm việc đủ. Đăng ký nghỉ ốm hoặc việc riêng cần báo trước Line Manager tối thiểu 24 giờ qua HR Portal.'
  },

  // IT & phân quyền (it)
  {
    id: 'doc-it-01',
    title: 'Quy chuẩn an toàn thông tin & Cấu hình thiết bị làm việc',
    category: 'it',
    categoryLabel: 'IT & phân quyền',
    updatedAt: '18/09/2026',
    owner: 'Ban An toàn Thông tin (IT Sec)',
    summary: 'Hướng dẫn cài đặt mật khẩu phức tạp, kích hoạt BitLocker/FileVault và chính sách không sử dụng thiết bị ngoài cho mã nguồn.',
    readTime: '10 phút',
    content: 'Thiết bị công ty cấp bắt buộc cài đặt phần mềm Endpoint Protection, không cắm USB lạ và tuân thủ nguyên tắc màn hình khóa khi rời khỏi vị trí làm việc.'
  },
  {
    id: 'doc-it-02',
    title: 'Cẩm nang phân quyền hệ thống: Jira, Confluence, GitHub & VPN',
    category: 'it',
    categoryLabel: 'IT & phân quyền',
    updatedAt: '22/09/2026',
    owner: 'Đội IT Helpdesk',
    summary: 'Tổng hợp link đăng ký, mẫu form xin quyền, người phê duyệt tương ứng cho từng công cụ làm việc nội bộ.',
    readTime: '7 phút',
    content: 'Xem chi tiết các bước xin quyền tại mục "Xin quyền hệ thống" trên Onboarding Copilot để được cấp quyền nhanh nhất trong vòng 24 - 48 giờ làm việc.'
  },
  {
    id: 'doc-it-03',
    title: 'Hướng dẫn kết nối mạng VPN và xử lý lỗi mạng thường gặp',
    category: 'it',
    categoryLabel: 'IT & phân quyền',
    updatedAt: '12/09/2026',
    owner: 'Đội Hạ tầng Mạng (Network Ops)',
    summary: 'Từng bước cài đặt file OpenVPN profile và khắc phục khi bị mất kết nối tới máy chủ staging nội bộ.',
    readTime: '4 phút',
    content: 'Khi gặp lỗi kết nối VPN timeout, vui lòng kiểm tra kết nối internet gia đình, kiểm tra chứng chỉ cá nhân đã hết hạn chưa hoặc gửi ticket đến it-helpdesk@company.vn.'
  },

  // Quy trình dự án (process)
  {
    id: 'doc-proc-01',
    title: 'Ma trận phân vai RASCI & Quy chuẩn phối hợp liên phòng ban',
    category: 'process',
    categoryLabel: 'Quy trình dự án',
    updatedAt: '25/09/2026',
    owner: 'Ban Quản trị Dự án (PMO)',
    summary: 'Quy định vai trò R (Responsible), A (Accountable), S (Support), C (Consulted), I (Informed) trong các tính năng sản phẩm.',
    readTime: '12 phút',
    content: 'Mọi tính năng mới đều phải lập bảng RASCI trước khi kickoff Sprint. R là người thực thi trực tiếp, A là Product Owner có quyền duyệt cuối cùng.'
  },
  {
    id: 'doc-proc-02',
    title: 'Tổng quan kiến trúc điều phối xe: Matching & Dispatching',
    category: 'process',
    categoryLabel: 'Quy trình dự án',
    updatedAt: '19/09/2026',
    owner: 'Khối Công nghệ & Vận hành',
    summary: 'Giới thiệu luồng dữ liệu từ khi khách hàng đặt cuốc xe, thuật toán gợi ý tài xế tối ưu và giám sát thời gian thực.',
    readTime: '15 phút',
    content: 'Tài liệu dành cho Product Analyst và Developer hiểu cơ chế ghép chuyến, tính cước động và thời gian phản hồi SLA của hệ thống.'
  },
  {
    id: 'doc-proc-03',
    title: 'Quy trình Release, Quản lý Sprint Scrum & Tiêu chuẩn Pull Request',
    category: 'process',
    categoryLabel: 'Quy trình dự án',
    updatedAt: '14/09/2026',
    owner: 'Engineering Excellence Team',
    summary: 'Lịch trình sprint 2 tuần, cách đặt tên nhánh Git, tiêu chuẩn review code và quy định merge PR lên production.',
    readTime: '9 phút',
    content: 'Mỗi PR cần tối thiểu 2 approvals từ đồng nghiệp trong team, vượt qua kiểm tra tự động SonarQube và unit test coverage tối thiểu 80%.'
  },

  // Hành chính (admin)
  {
    id: 'doc-admin-01',
    title: 'Hướng dẫn sử dụng thẻ ra vào văn phòng, bãi đỗ xe & phòng họp',
    category: 'admin',
    categoryLabel: 'Hành chính',
    updatedAt: '05/09/2026',
    owner: 'Phòng Hành chính - Quản trị',
    summary: 'Cách đăng ký vé gửi xe tháng, quy định cấp thẻ từ nhân viên và hướng dẫn đặt phòng họp qua Google Calendar.',
    readTime: '5 phút',
    content: 'Nhân sự mới sử dụng thẻ tạm trong 3 ngày đầu. Thẻ cứng chính thức có in ảnh được nhận tại quầy Lễ tân vào thứ Hai tuần tiếp theo.'
  },
  {
    id: 'doc-admin-02',
    title: 'Quy định thanh toán công tác phí, mua sắm trang thiết bị văn phòng',
    category: 'admin',
    categoryLabel: 'Hành chính',
    updatedAt: '08/09/2026',
    owner: 'Phòng Tài chính - Kế toán',
    summary: 'Hạn mức chi tiêu tiếp khách, mẫu hóa đơn VAT hợp lệ và quy trình hoàn ứng trên hệ thống ERP.',
    readTime: '7 phút',
    content: 'Tất cả hóa đơn thanh toán cần lấy hóa đơn điện tử VAT xuất theo mã số thuế công ty trong tháng phát sinh chi phí.'
  },
  {
    id: 'doc-admin-03',
    title: 'Chính sách phúc lợi: Trà chiều, teambuilding & sinh nhật nhân viên',
    category: 'admin',
    categoryLabel: 'Hành chính',
    updatedAt: '16/09/2026',
    owner: 'Ban Văn hóa Doanh nghiệp',
    summary: 'Giới thiệu khu vực pantry, giờ happy hour thứ Sáu hàng tuần và ngân sách gắn kết nội bộ team.',
    readTime: '4 phút',
    content: 'Khu vực Pantry tại tầng 5 luôn sẵn sàng cà phê, trà và đồ ăn nhẹ. Happy Hour diễn ra vào lúc 16h30 mỗi chiều thứ Sáu.'
  }
];

import type { GlossaryTerm } from '../types';

export const mockGlossary: GlossaryTerm[] = [
  {
    id: 'term-rasci',
    term: 'RASCI',
    fullForm: 'Responsible, Accountable, Support, Consulted, Informed',
    shortDefinition: 'Ma trận phân vai: ai thực hiện, ai chịu trách nhiệm cuối, ai hỗ trợ, ai được hỏi ý kiến, ai cần được thông báo.',
    exampleSentence: 'Trước khi bắt đầu dự án mới, Product Lead cần chốt bảng RASCI với các bộ phận liên quan.',
    relatedTerms: ['SOP', 'OKR', 'SLA'],
    projectTag: 'Chung'
  },
  {
    id: 'term-dispatching',
    term: 'Dispatching',
    fullForm: 'Điều phối chuyến đi',
    shortDefinition: '[Định nghĩa mẫu — cần xác nhận] Điều phối, phân bổ chuyến cho tài xế.',
    exampleSentence: 'Module Dispatching tự động tính toán tài xế có thời gian đón khách ngắn nhất để gửi lời mời cuốc.',
    relatedTerms: ['Matching', 'Pulling', 'SLA'],
    projectTag: 'GSM'
  },
  {
    id: 'term-matching',
    term: 'Matching',
    fullForm: 'Ghép nối yêu cầu',
    shortDefinition: '[Định nghĩa mẫu — cần xác nhận] Ghép yêu cầu của khách với tài xế phù hợp.',
    exampleSentence: 'Thuật toán Matching ưu tiên các tài xế có xếp hạng sao cao và khoảng cách bán kính dưới 2km.',
    relatedTerms: ['Dispatching', 'Pulling', 'WPS'],
    projectTag: 'GSM'
  },
  {
    id: 'term-pulling',
    term: 'Pulling',
    fullForm: 'Cơ chế kéo chuyến',
    shortDefinition: '[Cần bổ sung định nghĩa]',
    exampleSentence: 'Cơ chế Pulling cho phép hệ thống dự phòng tiếp nhận yêu cầu khi kênh chính quá tải.',
    relatedTerms: ['Dispatching', 'Matching'],
    projectTag: 'GSM'
  },
  {
    id: 'term-wps',
    term: 'WPS',
    fullForm: 'Worker Positioning Service',
    shortDefinition: '[Cần bổ sung định nghĩa]',
    exampleSentence: 'WPS gửi tín hiệu tọa độ GPS định kỳ mỗi 3 giây từ ứng dụng của tài xế về máy chủ.',
    relatedTerms: ['Dispatching', 'CM'],
    projectTag: 'GSM'
  },
  {
    id: 'term-cm',
    term: 'CM',
    fullForm: 'Capacity Management',
    shortDefinition: '[Cần bổ sung định nghĩa]',
    exampleSentence: 'Hệ thống CM tính toán mật độ cung - cầu theo từng khu vực quận huyện để cân bằng tải.',
    relatedTerms: ['WPS', 'Matching'],
    projectTag: 'GSM'
  },
  {
    id: 'term-sop',
    term: 'SOP',
    fullForm: 'Standard Operating Procedure',
    shortDefinition: 'Quy trình thao tác chuẩn dạng văn bản nhằm hướng dẫn nhân viên thực hiện nhiệm vụ một cách nhất quán.',
    exampleSentence: 'Khi phát sinh sự cố khẩn cấp cấp độ 1, đội trực ca phải làm theo đúng tài liệu SOP 04.',
    relatedTerms: ['RASCI', 'SLA'],
    projectTag: 'Chung'
  },
  {
    id: 'term-pr',
    term: 'PR',
    fullForm: 'Pull Request',
    shortDefinition: 'Yêu cầu xem xét và tích hợp các thay đổi mã nguồn từ một nhánh (branch) vào nhánh chính của dự án.',
    exampleSentence: 'Mỗi PR phải được ít nhất 2 thành viên review và phê duyệt trước khi merge vào main.',
    relatedTerms: ['GitHub', 'SOP'],
    projectTag: 'Chung'
  },
  {
    id: 'term-onboarding',
    term: 'Onboarding',
    fullForm: 'Quá trình hội nhập nhân sự mới',
    shortDefinition: 'Chuỗi hoạt động đào tạo, định hướng và hỗ trợ trang thiết bị giúp nhân viên mới nhanh chóng làm quen công việc.',
    exampleSentence: 'Chương trình Onboarding Copilot hỗ trợ nhân sự nắm bắt quy trình ngay từ ngày đầu tiên.',
    relatedTerms: ['Buddy', 'OKR'],
    projectTag: 'Chung'
  },
  {
    id: 'term-buddy',
    term: 'Buddy',
    fullForm: 'Người đồng hành / Người bạn hỗ trợ',
    shortDefinition: 'Đồng nghiệp trong team được phân công hỗ trợ nhân sự mới giải đáp các thắc mắc về môi trường và sinh hoạt.',
    exampleSentence: 'Nếu chưa quen đường tới căng tin hoặc khu để xe, bạn có thể hỏi bạn Buddy của mình.',
    relatedTerms: ['Onboarding', 'Mentor'],
    projectTag: 'Chung'
  },
  {
    id: 'term-sla',
    term: 'SLA',
    fullForm: 'Service Level Agreement',
    shortDefinition: 'Cam kết mức độ dịch vụ về thời gian xử lý và chất lượng phản hồi giữa các bên hoặc với khách hàng.',
    exampleSentence: 'IT Helpdesk cam kết SLA xử lý yêu cầu cấp quyền hệ thống trong vòng 24 giờ làm việc.',
    relatedTerms: ['SOP', 'RASCI'],
    projectTag: 'Chung'
  },
  {
    id: 'term-okr',
    term: 'OKR',
    fullForm: 'Objectives and Key Results',
    shortDefinition: 'Phương pháp quản trị thiết lập mục tiêu then chốt và kết quả đo lường cụ thể theo từng quý.',
    exampleSentence: 'Mục tiêu thử việc của bạn sẽ được gắn liền với OKR quý của Team Điều phối.',
    relatedTerms: ['RASCI', 'SLA'],
    projectTag: 'Chung'
  }
];

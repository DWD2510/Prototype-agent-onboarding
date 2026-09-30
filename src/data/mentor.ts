import type { Mentee, UnansweredQuestion } from '../types';

export const mockMentees: Mentee[] = [
  {
    id: 'mentee-01',
    name: 'Nguyễn Minh (Bạn)',
    role: 'Product Analyst',
    team: 'Team Điều phối',
    startDate: '27/09/2026',
    onboardingDay: 3,
    progressPercent: 42,
    lastActive: 'Vừa xong',
    warningTag: 'access_repeat',
    warningLabel: 'Hỏi lặp lại nhiều về: phân quyền (GitHub, Jira)'
  },
  {
    id: 'mentee-02',
    name: 'Hoàng Bảo Ngọc',
    role: 'Backend Engineer (Fresher)',
    team: 'Team Backend Core',
    startDate: '22/09/2026',
    onboardingDay: 8,
    progressPercent: 25,
    lastActive: '2 giờ trước',
    warningTag: 'slow',
    warningLabel: 'Đang chậm: Chưa hoàn thành cấu hình môi trường Tuần 1'
  },
  {
    id: 'mentee-03',
    name: 'Lê Tuấn Hưng',
    role: 'Data Scientist',
    team: 'Team Khoa học Dữ liệu',
    startDate: '15/09/2026',
    onboardingDay: 15,
    progressPercent: 78,
    lastActive: 'Hôm qua',
    warningTag: 'normal',
    warningLabel: 'Tiến độ tốt: Đúng lộ trình'
  },
  {
    id: 'mentee-04',
    name: 'Đặng Mai Phương',
    role: 'Product Operations',
    team: 'Team Điều phối',
    startDate: '20/09/2026',
    onboardingDay: 10,
    progressPercent: 50,
    lastActive: '30 phút trước',
    warningTag: 'slow',
    warningLabel: 'Đang chậm: Chưa nộp hồ sơ nhân sự C&B'
  }
];

export const mockUnansweredQuestions: UnansweredQuestion[] = [
  {
    id: 'uq-01',
    question: 'Tài khoản sandbox để test luồng giả lập cuốc xe lấy ở đâu và ai cấp?',
    askedBy: 'Nguyễn Minh (Product Analyst)',
    timestamp: '10:15 - Hôm nay',
    frequency: 4,
    topic: 'Môi trường Test & Sandbox'
  },
  {
    id: 'uq-02',
    question: 'Quy trình xin cấp thẻ taxi đi lại khi làm việc ngoài giờ sau 21h thế nào?',
    askedBy: 'Hoàng Bảo Ngọc (Backend Engineer)',
    timestamp: '16:40 - Hôm qua',
    frequency: 3,
    topic: 'Phúc lợi & Công tác ngoài giờ'
  },
  {
    id: 'uq-03',
    question: 'Chính sách đăng ký khóa học chứng chỉ AWS có được công ty tài trợ 100% không?',
    askedBy: 'Lê Tuấn Hưng (Data Scientist)',
    timestamp: '09:20 - 28/09/2026',
    frequency: 2,
    topic: 'Đào tạo & Phát triển cá nhân'
  },
  {
    id: 'uq-04',
    question: 'Thời gian chốt bảng chấm công tháng này là ngày nào do có đợt nghỉ lễ?',
    askedBy: 'Đặng Mai Phương (Product Operations)',
    timestamp: '14:05 - 27/09/2026',
    frequency: 5,
    topic: 'Chấm công & Ngày lễ'
  }
];

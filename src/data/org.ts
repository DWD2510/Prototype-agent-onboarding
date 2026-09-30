import type { OrgNode } from '../types';

export const mockOrgTree: OrgNode = {
  id: 'div-tech-ops',
  name: 'Khối Công nghệ & Vận hành (Tech & Ops Division)',
  level: 'division',
  leader: 'Nguyễn Văn Vũ',
  leaderTitle: 'Giám đốc Khối Công nghệ & Vận hành (CTO)',
  responsibilities: [
    'Xây dựng nền tảng công nghệ lõi cho toàn bộ hệ sinh thái dịch vụ.',
    'Quản lý hạ tầng đám mây, an ninh mạng và độ ổn định hệ thống 99.99%.',
    'Thúc đẩy chuyển đổi số và tự động hóa quy trình vận hành liên tục.'
  ],
  currentProjects: [
    'Hệ thống điều phối xe thế hệ mới (NextGen Dispatching)',
    'Nâng cấp hạ tầng Microservices & Data Lake',
    'Chương trình số hóa trải nghiệm nhân viên nội bộ'
  ],
  contactRole: 'Thư ký Văn phòng Khối',
  contactEmail: 'cto-office@company.vn',
  children: [
    {
      id: 'dept-product-ops',
      name: 'Phòng Vận hành & Sản phẩm (Product & Operations)',
      level: 'department',
      leader: 'Lê Hoàng Nam',
      leaderTitle: 'Trưởng phòng Sản phẩm & Vận hành',
      responsibilities: [
        'Nghiên cứu thị trường và thiết kế tính năng sản phẩm đáp ứng nhu cầu khách hàng.',
        'Tối ưu hóa các chỉ số vận hành thời gian thực (realtime ops) và tỷ lệ hủy chuyến.',
        'Định nghĩa quy trình phối hợp liên phòng ban và các chuẩn SLA.'
      ],
      currentProjects: [
        'Tối ưu thuật toán ghép chuyến thông minh Matching v3',
        'Bảng điều khiển giám sát điều phối Realtime Cockpit'
      ],
      contactRole: 'Product Operations Coordinator',
      contactEmail: 'prod-ops@company.vn',
      children: [
        {
          id: 'team-dispatch',
          name: 'Team Điều phối (Dispatching Team)',
          level: 'team',
          leader: 'Trần Minh Anh',
          leaderTitle: 'Senior Product Lead (Mentor)',
          isMyTeam: true,
          responsibilities: [
            'Nghiên cứu nghiệp vụ phân bổ cuốc xe tự động cho tài xế.',
            'Phân tích dữ liệu thời gian đón và khoảng cách trung bình của chuyến đi.',
            'Lập ma trận phân vai RASCI và phối hợp cùng đội Kỹ sư thực thi tính năng.'
          ],
          currentProjects: [
            'Giải pháp Dynamic Dispatching theo mật độ giao thông',
            'Dashboard cảnh báo nghẽn cuốc khu vực trọng điểm'
          ],
          contactRole: 'Lead Product Analyst',
          contactEmail: 'dispatch-team@company.vn'
        },
        {
          id: 'team-pricing',
          name: 'Team Giá cước & Khuyến mãi (Pricing & Growth)',
          level: 'team',
          leader: 'Vũ Thu Trang',
          leaderTitle: 'Lead Product Manager',
          responsibilities: [
            'Xây dựng công thức tính cước động theo cung cầu thời gian thực.',
            'Quản trị các chiến dịch voucher khuyến mãi và điểm thưởng khách hàng.'
          ],
          currentProjects: [
            'Surge Pricing Engine v2',
            'Hệ thống phân hạng khách hàng thân thiết'
          ],
          contactRole: 'Pricing Analyst',
          contactEmail: 'pricing-team@company.vn'
        },
        {
          id: 'team-cust-exp',
          name: 'Team Trải nghiệm Khách hàng & Tài xế (Experience Team)',
          level: 'team',
          leader: 'Đặng Quốc Huy',
          leaderTitle: 'Product Experience Lead',
          responsibilities: [
            'Thiết kế giao diện ứng dụng phía hành khách và tài xế.',
            'Xử lý phản hồi khiếu nại chất lượng dịch vụ và tính năng chấm điểm sao.'
          ],
          currentProjects: [
            'Redesign luồng đặt xe một chạm',
            'Hệ thống tổng đài ảo hỗ trợ khẩn cấp trên app'
          ],
          contactRole: 'UX Research Specialist',
          contactEmail: 'ux-exp@company.vn'
        }
      ]
    },
    {
      id: 'dept-software-eng',
      name: 'Phòng Phát triển Phần mềm (Software Engineering)',
      level: 'department',
      leader: 'Phạm Minh Tuấn',
      leaderTitle: 'Head of Engineering',
      responsibilities: [
        'Phát triển ứng dụng di động iOS/Android và hệ thống Backend Microservices.',
        'Thiết kế cơ sở dữ liệu phân tán chịu tải cao và hệ thống hàng đợi.',
        'Đảm bảo quy chuẩn viết code, test coverage và CI/CD release pipeline.'
      ],
      currentProjects: [
        'Chuyển dịch kiến trúc sang Kubernetes Cluster',
        'Tối ưu hóa độ trễ API dưới 50ms cho các tác vụ quan trọng'
      ],
      contactRole: 'Engineering Operations Manager',
      contactEmail: 'eng-lead@company.vn',
      children: [
        {
          id: 'team-backend-core',
          name: 'Team Backend Core & Microservices',
          level: 'team',
          leader: 'Nguyễn Hải Nam',
          leaderTitle: 'Principal Backend Engineer',
          responsibilities: [
            'Phát triển các service lõi: Dispatching, Payment, Booking Engine.',
            'Tối ưu hóa truy vấn cơ sở dữ liệu PostgreSQL và Redis caching.'
          ],
          currentProjects: [
            'Hệ thống đồng bộ vị trí thời gian thực (WPS)',
            'Payment Gateway tích hợp đa ngân hàng'
          ],
          contactRole: 'Tech Lead Backend',
          contactEmail: 'backend-core@company.vn'
        },
        {
          id: 'team-mobile',
          name: 'Team Kỹ thuật Mobile (iOS & Android)',
          level: 'team',
          leader: 'Hoàng Kim Long',
          leaderTitle: 'Mobile Team Lead',
          responsibilities: [
            'Phát triển ứng dụng Passenger App và Driver App trên nền tảng React Native và Native.',
            'Tối ưu hóa trải nghiệm định vị bản đồ và mức tiêu hao pin thiết bị.'
          ],
          currentProjects: [
            'Bản đồ dẫn đường thông minh tích hợp giọng nói',
            'SDK thông báo đẩy siêu tốc'
          ],
          contactRole: 'Lead Mobile Engineer',
          contactEmail: 'mobile-eng@company.vn'
        },
        {
          id: 'team-qa-qc',
          name: 'Team Đảm bảo Chất lượng (QA & Test Automation)',
          level: 'team',
          leader: 'Ngô Thùy Chi',
          leaderTitle: 'QA Lead',
          responsibilities: [
            'Kiểm thử tự động End-to-End, kiểm thử hiệu năng và bảo mật trước khi release.',
            'Xây dựng kịch bản mô phỏng hàng triệu cuốc xe ảo để test tải hệ thống.'
          ],
          currentProjects: [
            'Automation Test Framework cho luồng ghép xe',
            'Kiểm thử chịu tải cao điểm ngày lễ'
          ],
          contactRole: 'Automation Specialist',
          contactEmail: 'qa-team@company.vn'
        }
      ]
    },
    {
      id: 'dept-data-ai',
      name: 'Phòng Dữ liệu & Trí tuệ Nhân tạo (Data & AI Analytics)',
      level: 'department',
      leader: 'Đỗ Quang Vinh',
      leaderTitle: 'Chief Data Scientist',
      responsibilities: [
        'Xây dựng các mô hình Machine Learning dự báo nhu cầu di chuyển theo giờ.',
        'Thiết kế và duy trì kho dữ liệu tập trung Data Warehouse & Data Lakehouse.',
        'Cung cấp báo cáo phân tích kinh doanh BI cho Ban Lãnh đạo.'
      ],
      currentProjects: [
        'Mô hình dự báo điểm nóng nhu cầu xe bằng AI',
        'Nền tảng phân tích dữ liệu tự phục vụ (Self-service BI)'
      ],
      contactRole: 'Data Governance Lead',
      contactEmail: 'data-ai@company.vn',
      children: [
        {
          id: 'team-data-eng',
          name: 'Team Kỹ thuật Dữ liệu (Data Engineering)',
          level: 'team',
          leader: 'Bùi Gia Bảo',
          leaderTitle: 'Lead Data Engineer',
          responsibilities: [
            'Xây dựng pipeline ETL/ELT truyền dữ liệu luồng và lô.',
            'Duy trì hạ tầng Apache Kafka và Spark Streaming.'
          ],
          currentProjects: ['Realtime Data Stream cho phòng Vận hành'],
          contactRole: 'Data Platform Engineer',
          contactEmail: 'data-eng@company.vn'
        },
        {
          id: 'team-data-sci',
          name: 'Team Khoa học Dữ liệu (Data Science & ML)',
          level: 'team',
          leader: 'Phan Thùy Linh',
          leaderTitle: 'Senior Data Scientist',
          responsibilities: [
            'Huấn luyện mô hình tối ưu hóa tuyến đường và thuật toán gợi ý tài xế.',
            'Thử nghiệm A/B testing cho các thuật toán định giá cước.'
          ],
          currentProjects: ['Thuật toán ETA chính xác cao dựa trên lịch sử giao thông'],
          contactRole: 'MLOps Engineer',
          contactEmail: 'ml-team@company.vn'
        }
      ]
    },
    {
      id: 'dept-it-infra',
      name: 'Phòng Hạ tầng & An toàn Thông tin (IT & Cloud Infrastructure)',
      level: 'department',
      leader: 'Trần Đình Khang',
      leaderTitle: 'Director of Infrastructure & Sec',
      responsibilities: [
        'Vận hành hệ thống đám mây AWS/GCP, mạng văn phòng và bảo mật thông tin.',
        'Hỗ trợ thiết bị máy tính, phần mềm và quản lý tài khoản định danh nhân sự.'
      ],
      currentProjects: ['Triển khai mô hình Zero Trust Security cho nhân viên làm việc từ xa'],
      contactRole: 'IT Operations Lead',
      contactEmail: 'it-admin@company.vn',
      children: [
        {
          id: 'team-it-helpdesk',
          name: 'Team IT Helpdesk & Hỗ trợ Kỹ thuật Nội bộ',
          level: 'team',
          leader: 'Nguyễn Văn Thắng',
          leaderTitle: 'Helpdesk Supervisor',
          responsibilities: [
            'Cấp phát, cài đặt laptop và hỗ trợ kỹ thuật trực tiếp cho nhân sự.',
            'Quản trị phân quyền tài khoản Jira, Confluence, GitHub và email.'
          ],
          currentProjects: ['Cổng thông tin tự phục vụ tài khoản nhân viên mới'],
          contactRole: 'IT Support Shift Lead',
          contactEmail: 'it-helpdesk@company.vn'
        },
        {
          id: 'team-devops-sec',
          name: 'Team DevOps & An ninh Mạng (SecOps)',
          level: 'team',
          leader: 'Lưu Đức Mạnh',
          leaderTitle: 'DevSecOps Lead',
          responsibilities: [
            'Giám sát an ninh mạng 24/7, rà soát lỗ hổng bảo mật định kỳ.',
            'Cấu hình tường lửa, VPN nội bộ và hệ thống sao lưu dự phòng thảm họa.'
          ],
          currentProjects: ['Nâng cấp hệ thống chứng chỉ số và bảo mật VPN v2'],
          contactRole: 'Security Response Officer',
          contactEmail: 'secops@company.vn'
        }
      ]
    }
  ]
};

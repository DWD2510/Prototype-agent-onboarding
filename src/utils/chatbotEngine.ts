import type { ContactItem, SourceCardData } from '../types';
import { mockContacts } from '../data/contacts';
import { mockGlossary } from '../data/glossary';
import { matchesKeywords, normalizeVietnamese } from './textUtils';

export interface BotResponseResult {
  text: string;
  sourceCard?: SourceCardData;
  contactCard?: ContactItem;
  isFallback?: boolean;
}

export function generateBotResponse(userQuestion: string): BotResponseResult {
  const norm = normalizeVietnamese(userQuestion);

  // Intent 1: "jira" / "github" / "confluence" / "vpn" / "quyền"
  if (matchesKeywords(norm, ['jira', 'github', 'confluence', 'vpn', 'quyen', 'phan quyen', 'access', 'cap quyen'])) {
    if (matchesKeywords(norm, ['github'])) {
      return {
        text: `Để xin quyền truy cập GitHub Enterprise của công ty, bạn làm theo 4 bước sau:
1. Bật xác thực 2 lớp (2FA) bắt buộc trên tài khoản GitHub cá nhân bằng Google Authenticator hoặc SMS.
2. Truy cập cổng IT Portal → chọn "Xin gia nhập Tổ chức GitHub Công ty".
3. Nhập username GitHub và chọn Team: "gsm-dispatching-team".
4. Tech Lead sẽ duyệt yêu cầu trong 1-2 ngày làm việc; sau đó bạn kiểm tra email và bấm "Accept Invitation".

Bạn cũng có thể vào mục "Tài liệu" → bấm vào thẻ GitHub để theo dõi trạng thái và đánh dấu đã có quyền.`,
        sourceCard: {
          title: 'Cẩm nang phân quyền hệ thống: Jira, Confluence, GitHub & VPN',
          updatedAt: '22/09/2026',
          owner: 'Đội IT Helpdesk',
          docId: 'doc-it-02'
        }
      };
    }

    if (matchesKeywords(norm, ['jira'])) {
      return {
        text: `Hướng dẫn xin quyền Jira Software:
1. Đăng nhập cổng Service Desk nội bộ bằng email nhân viên hoặc email cá nhân.
2. Chọn "Yêu cầu cấp quyền phần mềm" → gõ tìm kiếm "Jira".
3. Điền thông tin dự án: chọn "Project GSM Điều phối" với nhóm quyền "Member / Contributor".
4. Gắn thẻ Mentor Trần Minh Anh vào mục Người phê duyệt.
5. SLA duyệt thông thường là 1 ngày làm việc.`,
        sourceCard: {
          title: 'Cẩm nang phân quyền hệ thống: Jira, Confluence, GitHub & VPN',
          updatedAt: '22/09/2026',
          owner: 'Đội IT Helpdesk',
          docId: 'doc-it-02'
        }
      };
    }

    if (matchesKeywords(norm, ['confluence'])) {
      return {
        text: `Hướng dẫn xin quyền Confluence Wiki:
1. Truy cập wiki.internal.company.vn qua trình duyệt.
2. Hệ thống sử dụng tài khoản Google SSO công ty. Nếu chưa có quyền vào Space "GSM Operations & Product", hãy mở ticket Service Desk.
3. Người duyệt: PMO Lead. Thời gian cấp: trong 1 ngày làm việc.`,
        sourceCard: {
          title: 'Cẩm nang phân quyền hệ thống: Jira, Confluence, GitHub & VPN',
          updatedAt: '22/09/2026',
          owner: 'Đội IT Helpdesk',
          docId: 'doc-it-02'
        }
      };
    }

    // Generic access
    return {
      text: `Để yêu cầu cấp quyền các hệ thống làm việc (Jira, Confluence, GitHub, VPN), công ty áp dụng quy trình tự phục vụ trên cổng IT Portal.
Thông thường quyền Jira và Confluence mất 1 ngày làm việc; quyền GitHub và VPN mất 1-2 ngày làm việc sau khi Mentor hoặc Tech Lead phê duyệt.
Bạn có thể xem chi tiết từng bước và đánh dấu trạng thái quyền tại mục "Tài liệu" trên thanh menu.`,
      sourceCard: {
        title: 'Cẩm nang phân quyền hệ thống: Jira, Confluence, GitHub & VPN',
        updatedAt: '22/09/2026',
        owner: 'Đội IT Helpdesk',
        docId: 'doc-it-02'
      }
    };
  }

  // Intent 2: Glossary terms: "rasci" / "matching" / "dispatching" / "pulling" / "wps" / "cm" / "sop" / "sla" / "okr"
  if (matchesKeywords(norm, ['rasci', 'ma tran rasci'])) {
    return {
      text: `RASCI là viết tắt của ma trận phân vai trong quản trị dự án:
• R (Responsible): Người trực tiếp thực hiện nhiệm vụ.
• A (Accountable): Người chịu trách nhiệm cuối cùng và có quyền phê duyệt kết quả.
• S (Support): Người hỗ trợ cung cấp nguồn lực hoặc kỹ thuật.
• C (Consulted): Chuyên gia hoặc bên liên quan được hỏi ý kiến chuyên môn.
• I (Informed): Các bên cần được cập nhật tiến độ và thông báo kết quả.

Trong dự án GSM, mọi tính năng mới đều phải lập bảng RASCI trước khi kickoff Sprint.`,
      sourceCard: {
        title: 'Ma trận phân vai RASCI & Quy chuẩn phối hợp liên phòng ban',
        updatedAt: '25/09/2026',
        owner: 'Ban Quản trị Dự án (PMO)',
        docId: 'doc-proc-01'
      }
    };
  }

  if (matchesKeywords(norm, ['dispatching', 'dieu phoi'])) {
    const term = mockGlossary.find(g => g.term.toLowerCase() === 'dispatching');
    return {
      text: `Dispatching trong hệ sinh thái GSM:
${term?.shortDefinition || '[Định nghĩa mẫu — cần xác nhận] Điều phối, phân bổ chuyến cho tài xế.'}

Hệ thống Dispatching tự động tính toán tài xế phù hợp nhất dựa trên vị trí GPS (qua dịch vụ WPS), tình trạng xe và lưu lượng giao thông để gửi lời mời cuốc.`,
      sourceCard: {
        title: 'Tổng quan kiến trúc điều phối xe: Matching & Dispatching',
        updatedAt: '19/09/2026',
        owner: 'Khối Công nghệ & Vận hành',
        docId: 'doc-proc-02'
      }
    };
  }

  if (matchesKeywords(norm, ['matching', 'ghep chuyen'])) {
    const term = mockGlossary.find(g => g.term.toLowerCase() === 'matching');
    return {
      text: `Matching trong hệ thống GSM:
${term?.shortDefinition || '[Định nghĩa mẫu — cần xác nhận] Ghép yêu cầu của khách với tài xế phù hợp.'}

Thuật toán Matching ưu tiên các tài xế có xếp hạng sao cao, thời gian tiếp cận khách ngắn nhất và đảm bảo cân bằng tải cuốc cho toàn đội xe.`,
      sourceCard: {
        title: 'Tổng quan kiến trúc điều phối xe: Matching & Dispatching',
        updatedAt: '19/09/2026',
        owner: 'Khối Công nghệ & Vận hành',
        docId: 'doc-proc-02'
      }
    };
  }

  // Check other glossary terms dynamically
  for (const item of mockGlossary) {
    if (matchesKeywords(norm, [item.term.toLowerCase()])) {
      return {
        text: `Thuật ngữ ${item.term} (${item.fullForm || ''}):
${item.shortDefinition}
${item.exampleSentence ? `\nVí dụ trong thực tế: "${item.exampleSentence}"` : ''}`,
        sourceCard: {
          title: 'Từ điển thuật ngữ nghiệp vụ nội bộ GSM',
          updatedAt: '20/09/2026',
          owner: 'Ban Quản trị Dự án & Vận hành'
        }
      };
    }
  }

  // Intent 3: "hỏi ai" / "lỗi" / "hỏng" / "liên hệ" / "may tinh"
  if (matchesKeywords(norm, ['hoi ai', 'loi', 'hong', 'lien he', 'su co', 'may tinh', 'laptop', 'wifi', 'man hinh'])) {
    const itContact = mockContacts.find(c => c.id === 'cnt-it') || mockContacts[0];
    return {
      text: `Khi gặp lỗi máy tính, mạng wifi, hỏng hóc thiết bị hoặc cần hỗ trợ kỹ thuật gấp, bạn vui lòng liên hệ ngay với Đội IT Helpdesk để được xử lý:`,
      contactCard: itContact,
      sourceCard: {
        title: 'Quy chuẩn an toàn thông tin & Cấu hình thiết bị làm việc',
        updatedAt: '18/09/2026',
        owner: 'Ban An toàn Thông tin (IT Sec)',
        docId: 'doc-it-01'
      }
    };
  }

  // Intent 4: "hôm nay" / "tuần này" / "cần làm gì"
  if (
    matchesKeywords(norm, ['can lam gi', 'checklist', 'cong viec hom nay', 'viec hom nay', 'viec tuan nay', 'lam gi hom nay', 'lam gi tuan nay']) ||
    (matchesKeywords(norm, ['hom nay', 'tuan nay']) && matchesKeywords(norm, ['lam', 'viec', 'task', 'muc tieu']))
  ) {
    return {
      text: `Hôm nay (Ngày 3 / 30 của lộ trình Onboarding Tuần 1), bạn có 4 nhiệm vụ trọng tâm:
1. 📋 Gửi yêu cầu cấp quyền truy cập Jira Software (đã hoàn thành)
2. ⏳ Gửi yêu cầu tham gia tổ chức GitHub nội bộ (chưa xong)
3. 📖 Đọc tài liệu ma trận phân vai RASCI của dự án GSM
4. 📑 Hoàn tất thủ tục nộp hồ sơ nhân sự (C&B)

Mẹo: Bạn có thể đánh dấu trực tiếp các đầu việc này trên trang chủ "Hôm nay" để thanh tiến độ cập nhật nhé!`,
      sourceCard: {
        title: 'Sổ tay nhân sự & Thủ tục hoàn thiện hồ sơ thử việc',
        updatedAt: '15/09/2026',
        owner: 'Phòng Nhân sự (HR C&B)',
        docId: 'doc-hr-01'
      }
    };
  }

  // Intent 5: "nghỉ phép" / "phép" / "chấm công" / "wfh" / "lam tu xa"
  if (matchesKeywords(norm, ['nghi phep', 'phep', 'cham cong', 'wfh', 'lam viec tai nha', 'nghi om'])) {
    return {
      text: `Chính sách Nghỉ phép & Chấm công dành cho nhân sự mới:
• Trong thời gian thử việc: Bạn được tích lũy 1 ngày phép có lương cho mỗi tháng làm việc đủ.
• Quy trình xin nghỉ / WFH: Báo trước Line Manager (Trần Minh Anh) tối thiểu 24 giờ và tạo đơn trên cổng HR Portal.
• Chấm công hàng ngày: Thực hiện quét vân tay tại cửa văn phòng hoặc check-in trên ứng dụng nội bộ trước 9h00 sáng. Giờ làm việc tiêu chuẩn: 8h30 - 17h30 (nghỉ trưa 12h00 - 13h00).`,
      sourceCard: {
        title: 'Chính sách ngày phép, làm việc linh hoạt (WFH) & Chấm công',
        updatedAt: '20/09/2026',
        owner: 'Phòng Nhân sự',
        docId: 'doc-hr-03'
      }
    };
  }

  // Intent 6: Fallback (unrecognized)
  return {
    text: 'Mình chưa chắc về câu này. Bạn có muốn mình chuyển câu hỏi tới đúng người phụ trách không?',
    isFallback: true
  };
}

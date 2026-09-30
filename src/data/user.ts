import type { User } from '../types';

// Start date: 2 days before today (Day 3 of onboarding)
const today = new Date();
const start = new Date(today);
start.setDate(today.getDate() - 2);

const formatDate = (date: Date) => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const mockUser: User = {
  id: 'usr-001',
  name: 'Minh',
  role: 'Product Analyst',
  team: 'Team Điều phối',
  department: 'Phòng Vận hành & Sản phẩm',
  division: 'Khối Công nghệ & Vận hành',
  startDate: formatDate(start),
  email: 'minh.nguyen@company.vn',
  personalEmail: 'minh.product@gmail.com',
  mentorName: 'Trần Minh Anh',
  mentorRole: 'Senior Product Lead',
  mentorEmail: 'anh.tran@company.vn',
  mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

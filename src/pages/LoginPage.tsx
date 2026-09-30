import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import {
  Compass,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('minh.product@gmail.com');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep('otp');
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto move to next input
    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto submit if all 6 digits entered
    if (val && index === 5 && newOtp.every((digit) => digit !== '')) {
      handleCompleteLogin(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleCompleteLogin = (otpCode: string = otp.join('')) => {
    login(email, otpCode || '123456');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-[#E8EEF4]/60 to-slate-200 flex flex-col justify-center items-center p-4">
      {/* Container Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 sm:p-10 animate-fade-in relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F3A5F]/5 rounded-bl-full pointer-events-none" />

        {/* Branding & Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1F3A5F] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1F3A5F] tracking-tight">
            Onboarding Copilot
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium leading-relaxed">
            Trợ lý cho nhân sự mới — dùng được ngay từ ngày đầu tiên
          </p>
        </div>

        {/* Step 1: Input Personal Email */}
        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label
                htmlFor="personalEmail"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Email cá nhân
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="personalEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhanvienmoi@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 group"
            >
              <span>Gửi mã OTP xác thực</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        ) : (
          /* Step 2: 6 OTP digit boxes */
          <div className="space-y-5 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Nhập mã OTP (6 chữ số)
                </label>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-xs text-sky-700 hover:underline"
                >
                  Đổi email
                </button>
              </div>

              <p className="text-[11px] text-slate-500 mb-3">
                Mã mẫu đã gửi tới: <strong>{email}</strong> (Nhập bất kỳ 6 số)
              </p>

              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputsRef.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-full h-12 text-center text-lg font-bold text-[#1F3A5F] bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#1F3A5F] focus:ring-2 focus:ring-[#1F3A5F]/20 focus:outline-none transition"
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCompleteLogin()}
              className="w-full py-3 px-4 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Xác nhận & Vào ứng dụng</span>
            </button>

            <button
              type="button"
              onClick={() => handleCompleteLogin('888888')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
            >
              Dùng mã nhanh (888888)
            </button>
          </div>
        )}

        {/* Small mandatory note */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Không cần tài khoản công ty.</strong> Link đăng nhập do HR gửi trước ngày đi làm để bạn chuẩn bị và hỏi đáp sớm.
          </span>
        </div>
      </div>
    </div>
  );
};

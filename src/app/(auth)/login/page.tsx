import type React from "react"
import Link from "next/link"
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">FPT</div>
              <span className="font-bold text-xl text-gray-800">Shop</span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Đăng nhập tài khoản</h2>
            <p className="mt-2 text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link href="/account/register" className="text-red-600 hover:text-red-500">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          <LoginForm />

          {/* Terms */}
          <p className="text-center text-xs text-gray-600">
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <Link href="/terms" className="text-red-600 hover:text-red-500">
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="text-red-600 hover:text-red-500">
              Chính sách bảo mật
            </Link>{" "}
            của chúng tôi.
          </p>
        </div>
      </div>
    </Suspense>
  )
}

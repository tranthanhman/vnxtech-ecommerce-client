import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Heart, LogOut, Package, Settings, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LayoutAccountPage({ children }: { children: React.ReactNode }) {
    return (
        <div className="container max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                    <User className="h-8 w-8 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">man teran</h3>
                                    <p className="text-sm text-gray-600">abc@mail,com</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <nav className="space-y-2">
                                <Link href="/account" className="flex items-center space-x-3 p-2 rounded-lg bg-red-50 text-red-600">
                                    <User className="h-4 w-4" />
                                    <span>Thông tin tài khoản</span>
                                </Link>
                                <Link href="/account/orders" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                    <Package className="h-4 w-4" />
                                    <span>Đơn hàng của tôi</span>
                                </Link>
                                <Link href="/account/wishlist" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                    <Heart className="h-4 w-4" />
                                    <span>Sản phẩm yêu thích</span>
                                </Link>
                                <Link href="/account/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                    <Settings className="h-4 w-4" />
                                    <span>Cài đặt</span>
                                </Link>
                                <Separator />
                                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 text-red-600 w-full text-left">
                                    <LogOut className="h-4 w-4" />
                                    <span>Đăng xuất</span>
                                </button>
                            </nav>
                        </CardContent>
                    </Card>
                </div>

                {/* Main content */}
                <div className="lg:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    )
}

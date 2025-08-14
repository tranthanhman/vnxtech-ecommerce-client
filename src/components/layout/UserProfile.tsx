"use client";
import React, { memo } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

const UserProfile = memo(() => {
    const { logout } = useAuth();
    const user = useAuthStore((s) => s.user)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center p-2"
                >
                    <User className="h-5 w-5 text-gray-600" />
                    {!user ? (
                        <span className="text-xs text-gray-600">Tài khoản</span>
                    ) : (
                        <span className="text-xs text-gray-600">{user.name}</span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {!user ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/login">Đăng nhập</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/register">Đăng ký</Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/account">Tài khoản của tôi</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            Đăng xuất
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

UserProfile.displayName = 'UserProfile';

export default UserProfile;

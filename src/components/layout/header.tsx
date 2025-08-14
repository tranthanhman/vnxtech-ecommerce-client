import type React from "react";

import Link from "next/link";
import {
  Menu,
  Bell,
  MapPin,
  Truck,
} from "lucide-react";
import { Button } from "../ui/button";
import MobileCategorySheet from "./mobile-category-sheet";
import MegaMenu from "./mega-menu";
import UserProfile from "./UserProfile";
import SearchForm from "./SearchForm";
// import CartInfo from "./CartInfo";

export default async function Header() {
  return (
    <>
      {/* Top notification bar */}
      <div className="bg-red-600 text-white py-1 text-xs">
        <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Hà Nội</span>
            </span>
            <span className="flex items-center space-x-1">
              <Truck className="h-3 w-3" />
              <span className="hidden sm:inline">
                Miễn phí vận chuyển từ 500k
              </span>
              <span className="sm:hidden">Free ship 500k+</span>
            </span>
          </div>
          <div>
            <span>Hotline: 1900 6868</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 bg-white border-b shadow-sm z-50">
        <div className="relative container max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">
                FPT
              </div>
              <span className="font-bold text-xl text-gray-800 hidden sm:inline">
                Shop
              </span>
            </Link>

            {/* Categories button - Desktop only */}
            <div className="relative hidden md:block">
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 px-4 py-2 h-10"
              // onMouseEnter={() => setShowMegaMenu(true)}
              >
                <Menu className="h-4 w-4" />
                <span className="font-medium">Danh mục sản phẩm</span>
              </Button>
            </div>

            {/* Search bar */}
            <SearchForm />

            {/* Right actions - Desktop only */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center p-2"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="text-xs text-gray-600">Thông báo</span>
              </Button>

              {/* Cart */}
              {/* <CartInfo initState={cartItems?.data} /> */}

              {/* User account */}
              <UserProfile />
            </div>
          </div>
          {/* Mega Menu - Desktop only */}
          <MegaMenu />
        </div>
      </header>

      {/* Mobile Category Sheet */}
      <MobileCategorySheet />
    </>
  );
};

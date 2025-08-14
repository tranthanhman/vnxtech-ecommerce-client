"use client";
import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function SearchForm() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = useMemo(() => (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    }, [searchQuery]);

    return (
        <div className="flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
                <Input
                    type="text"
                    placeholder="Nhập từ khóa cần tìm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-2 h-10 border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 h-8"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}

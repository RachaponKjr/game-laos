"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TableUser from "./table-user";

const UserPage = () => {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground text-sm">
          จัดการข้อมูลผู้ใช้และตรวจสอบประวัติการทำรายการ
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="ค้นหาชื่อ หรือ อีเมล..." />
        </div>
      </div>
      <TableUser />
    </div>
  );
};

export default UserPage;

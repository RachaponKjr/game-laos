/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import {
  Search,
  History,
  UserCircle,
  MoreHorizontal,
  Mail,
  Calendar,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user.type";
import dayjs from "dayjs";

const USERS_DATA = [
  {
    id: "U001",
    name: "Anuwat S.",
    email: "anuwat@example.com",
    role: "Member",
    balance: "฿1,250",
    joinDate: "12 ม.ค. 2026",
    history: [
      {
        id: "TX-101",
        item: "Valorant 625 Points",
        amount: "฿300",
        date: "2 ชั่วโมงที่แล้ว",
        status: "สำเร็จ",
      },
      {
        id: "TX-98",
        item: "RoV 20 คูปอง",
        amount: "฿20",
        date: "1 วันที่แล้ว",
        status: "สำเร็จ",
      },
    ],
  },
  {
    id: "U002",
    name: "Somchai ใจดี",
    email: "somchai@test.com",
    role: "Member",
    balance: "฿0",
    joinDate: "15 ม.ค. 2026",
    history: [],
  },
];

const TableUser = () => {
  const [user, setUser] = useState<User[]>([]);

  const getUser = async () => {
    const res = await fetch("http://localhost:3000/auth/alluser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[250px]">Customer</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Total Order</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="font-medium text-green-600">
                {/* {user.balance} */}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {dayjs(user.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <UserHistorySheet user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// --- ส่วนดึงข้อมูล History ออกมาแสดงทางด้านข้าง ---
const UserHistorySheet = ({ user }: { user: User }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/5">
          <History className="h-4 w-4" />
          ประวัติ
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] p-4 sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            ข้อมูลของ {user.name}
          </SheetTitle>
          <SheetDescription>
            ID: {user.id} | เข้าร่วมเมื่อ{" "}
            {dayjs(user.createdAt).format("DD/MM/YYYY")}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* รายการประวัติ */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 underline underline-offset-4 decoration-primary/30">
              ประวัติการทำรายการล่าสุด
            </h3>

            {user?.history?.length > 0 ? (
              <div className="space-y-3">
                {user?.history?.map((h: any) => (
                  <div
                    key={h.id}
                    className="p-3 border rounded-lg hover:border-primary/20 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {h.item}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {h.date}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-muted-foreground">
                        {h.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{h.amount}</span>
                        <Badge className="h-5 px-1.5 text-[10px] bg-green-500/10 text-green-600 border-green-500/20">
                          {h.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground italic">
                  ไม่มีประวัติการทำรายการ
                </p>
              </div>
            )}
          </div>

          <Button variant="outline" className="w-full mt-4" size="sm">
            ดูรายการทั้งหมด <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TableUser;

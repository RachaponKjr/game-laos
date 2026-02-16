"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect } from "react";
import {
  CircleDollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OrderWait from "./order-wait";
import { Order } from "@/types/order.type";
import { formatPrice } from "@/lib/format";

type SaleToday = {
  date: string;
  totalSales: number;
  totalProfit: number;
  orderCount: number;
};

const MonitorPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [saleToday, setSaleToday] = useState<SaleToday | null>(null);
  const [saleThisMonth, setSaleThisMonth] = useState<SaleToday | null>(null);

  const date = new Date();
  const time = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // --- Data จำลอง ---
  const stats = [
    {
      title: "ยอดขายวันนี้",
      value: formatPrice(saleToday?.totalSales || 0),
      icon: CircleDollarSign,
      color: "text-green-500",
      trend: `+${saleToday?.orderCount || 0} รายการ`,
    },
    {
      title: "ผู้ใช้งานทั้งหมด",
      value: userCount,
      icon: Users,
      color: "text-purple-500",
      // trend: "+5 คนใหม่",
    },
    {
      title: "กำไรสุทธิ (เดือนนี้)",
      value: formatPrice(saleThisMonth?.totalProfit || 0),
      icon: TrendingUp,
      color: "text-blue-500",
      trend: `+${saleThisMonth?.orderCount || 0} รายการ`,
    },
    {
      title: "ค้างดำเนินการ",
      value: orderCount,
      icon: AlertCircle,
      color: "text-red-500",
      trend: "ด่วนที่สุด",
    },
  ];

  const recentHistory = [
    {
      id: "ORD-998",
      user: "Kitti",
      game: "Free Fire",
      amount: "฿150",
      status: "สำเร็จ",
    },
    {
      id: "ORD-997",
      user: "Somsri",
      game: "Genshin",
      amount: "฿2,500",
      status: "สำเร็จ",
    },
  ];

  const fetchUserCount = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/alluser`,
    );
    const data = await response.json();
    setUserCount(data.length);
  };

  const fetchOrderCount = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/waiting?limit=10`,
    );
    const data = await response.json();
    setOrders(data.data);
    setOrderCount(data.meta.total);
  };

  const fetchSaleToday = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/magin-money-today`,
    );
    const data = await response.json();
    setSaleToday(data);
  };

  const fetchSaleThisMonth = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/magin-money-month`,
    );
    const data = await response.json();
    setSaleThisMonth(data);
  };

  const handleCompleteOrder = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}/complete`, {
      method: "PATCH",
    })
      .then(() => {
        void fetchOrderCount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    new Promise((resolve) => {
      void fetchUserCount();
      void fetchOrderCount();
      void fetchSaleToday();
      void fetchSaleThisMonth();
      resolve(true);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Executive Overview
          </h1>
          <p className="text-muted-foreground text-sm">
            ข้อมูลอัปเดตล่าสุด ณ วันนี้ {time} น.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Activity className="mr-2 h-4 w-4" /> ดู System Logs
        </Button>
      </div>

      {/* --- Section 1: Stats Overview --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <OrderWait orders={orders} onComplete={handleCompleteOrder} />

      {/* --- Section 4: History & System Health --- */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent History */}
        <Card>
          <CardHeader>
            <CardTitle>รายการล่าสุดที่สำเร็จ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex gap-3 items-center">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.game} - {item.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-bold">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Connection Health */}
        <Card>
          <CardHeader>
            <CardTitle>สถานะระบบเชื่อมต่อ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">
                  Gateway Payment (TrueMoney)
                </span>
              </div>
              <Badge className="bg-green-500">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Game API Provider</span>
              </div>
              <Badge className="bg-green-500">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonitorPage;

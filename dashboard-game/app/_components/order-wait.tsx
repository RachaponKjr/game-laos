/* eslint-disable react-hooks/set-state-in-effect */
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import OrderDetailsDialog from "./order-detail";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Order } from "@/types/order.type";
import { formatNumber, formatPrice } from "@/lib/format";

interface PopularOrder {
  name: string;
  orderCount: number;
}

const OrderWait = ({
  orders,
  onComplete,
}: {
  orders: Order[];
  onComplete: (id: string) => void;
}) => {
  const [popularOrders, setPopularOrders] = useState<PopularOrder[]>([]);
  console.log(popularOrders);
  const getPopularOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/popular`,
      );
      const data = await res.json();
      setPopularOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularOrders();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-7">
      {/* --- Section 2: Pending Orders (ด่วน) --- */}
      <Card className="md:col-span-4 border-red-200 bg-red-50/5 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-600">
            <Clock className="h-5 w-5 animate-pulse" />
            <CardTitle>รายการรอดำเนินการ</CardTitle>
          </div>
          <CardDescription>
            ต้องเติมเครดิตให้ลูกค้าทันทีหลังตรวจสอบยอด
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ลูกค้า</TableHead>
                <TableHead>สินค้า</TableHead>
                <TableHead>ยอดโอน</TableHead>
                <TableHead>เพชร</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* ข้อมูลจำลองรายการค้าง */}
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {order.user.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.game.name}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {formatPrice(order.totalPrice)}
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {formatNumber(order.package.amount + order.package.bonus)}
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    <Badge variant="destructive">
                      {order.status === "PROCESSING" && "รอดำเนินการ"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 items-center justify-end">
                    <OrderDetailsDialog onComplete={onComplete} order={order} />
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => onComplete(order.id)}
                    >
                      ทำรายการสำเร็จ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* --- Section 3: Top Selling Games --- */}
      <Card className="md:col-span-3 shadow-sm">
        <CardHeader>
          <CardTitle>เกมยอดนิยม</CardTitle>
          <CardDescription>อันดับยอดขายแยกตามหมวดหมู่</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {popularOrders.map((game) => (
            <div key={game.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {game.name}
                </div>
                <span>{game.orderCount} ออเดอร์</span>
              </div>
              <Progress value={game.orderCount} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderWait;

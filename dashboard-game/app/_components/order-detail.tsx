/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatNumber, formatPrice } from "@/lib/format";
import { Order } from "@/types/order.type";
import { Copy, Eye } from "lucide-react";

const OrderDetailsDialog = ({
  order,
  onComplete,
}: {
  order: Order;
  onComplete: (id: string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          ดูข้อมูล
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>รายละเอียดคำสั่งซื้อ</DialogTitle>
          <DialogDescription>
            ตรวจสอบข้อมูลที่ลูกค้าส่งมาให้ถูกต้องก่อนทำการเติมเงิน
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* ข้อมูลที่ลูกค้าส่งมา */}
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg space-y-2">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                Game ID / UUID
              </p>
              <div className="flex items-center justify-between bg-background p-2 rounded border font-mono text-sm">
                <span>{order.gameAccount}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    navigator.clipboard.writeText(order.gameAccount)
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">เพชรที่ต้องเติม</p>
                <p className="font-semibold">
                  {formatNumber(order.package.amount || 0)} +{" "}
                  <span className="text-green-600">
                    {formatNumber(order.package.bonus || 0)}
                  </span>{" "}
                  ={" "}
                  <span className="text-green-600">
                    {formatNumber(
                      order.package.amount + order.package.bonus || 0,
                    )}
                  </span>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">ราคา</p>
                <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Server</p>
                <p className="font-semibold">{order.meta.server || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">ชื่อในเกม</p>
                <p className="font-semibold">{order.meta.inGameName || "-"}</p>
              </div>
            </div>

            <div className="space-y-1 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
              <p className="text-xs text-yellow-700 dark:text-yellow-500 font-bold uppercase">
                หมายเหตุจากลูกค้า
              </p>
              <p className="text-sm">{order.meta.note || "ไม่มีหมายเหตุ"}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="w-full sm:w-auto">
            ยกเลิก
          </Button>
          <Button
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            onClick={() => onComplete(order.id)}
          >
            ยืนยันการเติมเงิน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;

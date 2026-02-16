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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // อย่าลืมลงเพิ่ม: npx shadcn@latest add switch
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CreatePackage = ({
  gameId,
  fetchGames,
}: {
  gameId: string;
  fetchGames: () => Promise<void>;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    price: 0,
    discount: 0,
    cost: 0,
    icon_base64: "",
    bonus: 0,
    gameId: gameId,
    recommend: true,
    isActive: true,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันแปลงไฟล์ภาพเป็น Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, icon_base64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/package`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        void fetchGames();
        setOpen(false);
        setFormData({
          name: "",
          amount: 0,
          price: 0,
          discount: 0,
          cost: 0,
          icon_base64: "",
          bonus: 0,
          gameId: gameId,
          recommend: true,
          isActive: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-11 mt-4 shadow-sm" variant="default">
          <Plus className="mr-2 h-4 w-4" /> เพิ่มแพ็กเกจใหม่
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>สร้างแพ็กเกจใหม่</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลรายละเอียดแพ็กเกจที่ต้องการเพิ่มเข้าสู่ระบบ
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* ชื่อแพ็กเกจ & Game ID */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">ชื่อแพ็กเกจ</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="เช่น Starter Pack"
              />
            </div>
          </div>

          {/* จำนวน & โบนัส */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">จำนวน (Amount)</Label>
              <Input
                id="amount"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonus">โบนัส (Bonus)</Label>
              <Input
                id="bonus"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, bonus: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* ราคา & ส่วนลด & ต้นทุน */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">ราคาขาย</Label>
              <Input
                id="price"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">ส่วนลด</Label>
              <Input
                id="discount"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, discount: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">ต้นทุน (Cost)</Label>
              <Input
                id="cost"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, cost: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* เลือกไอคอน (Base64) */}
          <div className="space-y-2">
            <Label htmlFor="icon">ไอคอนแพ็กเกจ</Label>
            <div className="flex items-center gap-4">
              <Input
                id="icon"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.icon_base64 && (
                <Image
                  src={formData.icon_base64}
                  width={100}
                  height={100}
                  className="w-10 h-10 object-contain rounded border"
                  alt="preview"
                />
              )}
            </div>
          </div>

          {/* สถานะ Recommend & Active */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="recommend"
                  checked={formData.recommend}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, recommend: checked })
                  }
                />
                <Label htmlFor="recommend">แนะนำ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="active">เปิดใช้งาน</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="w-full">
            {loading ? "กำลังเพิ่มแพ็กเกจ..." : "ยืนยันการเพิ่มแพ็กเกจ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePackage;

/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  Plus,
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  Layout,
  X,
  Upload,
  Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Switch } from "@/components/ui/switch";
import { uploadFile } from "@/lib/uploadfile";
import { toast } from "sonner";
import { BannerType } from "@/types/banner.type";

const ManagementPage = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [delModal, setDelModal] = useState(false);

  const getBanners = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner`);
    const data = await res.json();
    setBanners(data);
  };

  const deleteBanner = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data) {
      toast.success("Banner deleted successfully");
      getBanners();
    }
  };

  useEffect(() => {
    getBanners();
  }, []);
  return (
    <div className="p-4 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Website Management
        </h1>
        <p className="text-muted-foreground text-sm">
          จัดการองค์ประกอบหน้าเว็บและโปรโมชั่น
        </p>
      </div>

      {/* --- Section 1: Banner Management --- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Banner Management</h2>
          </div>
          <BannerFormDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {banners.map((banner) => (
            <Card
              key={banner.id}
              className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-3/1 bg-muted">
                <Image
                  fill
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge
                    className={banner.isActive ? "bg-green-500" : "bg-gray-500"}
                  >
                    {banner.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{banner.title}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {banner.linkUrl}
                  </p>
                </div>
                <div className="flex gap-1">
                  {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button> */}
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this banner?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => deleteBanner(banner.id)}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- Section 2: Promotion Management --- */}
      {/* <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TicketPercent className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Promotion & Coupons</h2>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> สร้างคูปอง
          </Button>
        </div>

        <Card className="border-none shadow-sm ring-1 ring-border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Promotion Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Enable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROMOTIONS.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell className="font-medium">{promo.name}</TableCell>
                  <TableCell>
                    <code className="bg-muted px-2 py-1 rounded text-xs font-bold">
                      {promo.code}
                    </code>
                  </TableCell>
                  <TableCell>{promo.discount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        promo.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch checked={promo.status === "Active"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section> */}
    </div>
  );
};

// --- Dialog สำหรับเพิ่ม Banner ---
const BannerFormDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. State สำหรับข้อมูลฟอร์ม
  const [bannerData, setBannerData] = useState({
    title: "",
    description: "",
    linkUrl: "",
    imageUrl: "",
    isActive: true,
  });
  // 2. State สำหรับไฟล์รูปภาพ
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setBannerData((prev) => ({ ...prev, [field]: value }));
  };

  // 3. ระบบ Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".webp"] },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bannerData.title || !imageFile) {
      alert("กรุณากรอกชื่อและเลือกรูปภาพแบนเนอร์");
      return;
    }
    setIsLoading(true);
    try {
      // ขั้นตอนที่ 1: อัปโหลดรูปภาพก่อน (ใช้ฟังก์ชัน uploadFile ที่เราทำไว้)
      const imageUrl = await uploadFile(imageFile, "banners");

      const payload = {
        ...bannerData,
        imageUrl: imageUrl,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create banner");
      }

      const data = await res.json();
      console.log("บันทึกข้อมูล Banner:", data);
      toast.success("บันทึกข้อมูล Banner เรียบร้อยแล้ว!");
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setBannerData({
      title: "",
      description: "",
      linkUrl: "",
      isActive: true,
      imageUrl: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> เพิ่ม Banner
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>จัดการ Banner ใหม่</DialogTitle>
          <DialogDescription>
            แบนเนอร์จะไปแสดงที่หน้าแรกของเว็บไซต์
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* ช่องชื่อ Title */}
          <div className="grid gap-2">
            <Label className="font-bold">หัวข้อแบนเนอร์ (Title) *</Label>
            <Input
              placeholder="เช่น โปรโมชั่นต้อนรับปีใหม่"
              value={bannerData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* ช่อง Description */}
          <div className="grid gap-2">
            <Label className="font-bold">รายละเอียด (Description)</Label>
            <Textarea
              placeholder="รายละเอียดสั้นๆ ที่จะแสดงบนแบนเนอร์"
              value={bannerData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="resize-none"
            />
          </div>

          {/* โซนอัปโหลดรูปภาพ */}
          <div className="grid gap-2">
            <Label className="font-bold">รูปภาพแบนเนอร์ (1200x400px)</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20 hover:bg-muted/50"
              }`}
            >
              <input {...getInputProps()} />
              {imagePreview ? (
                <div className="relative h-full w-full p-2">
                  <Image
                    fill
                    src={imagePreview}
                    className="h-full w-full object-cover rounded-lg"
                    alt="Preview"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-3 right-3 h-6 w-6 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground font-medium">
                    ลากไฟล์มาวาง หรือคลิกเพื่อเลือก
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Link URL */}
          <div className="grid gap-2">
            <Label className="font-bold flex items-center gap-2">
              <ExternalLink className="h-3.3 w-3.5" /> ลิงก์ปลายทาง (Link URL)
            </Label>
            <Input
              placeholder="เช่น /games/rov"
              value={bannerData.linkUrl}
              onChange={(e) => handleChange("linkUrl", e.target.value)}
            />
          </div>

          {/* สถานะการเปิดใช้งาน */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
            <div className="space-y-0.5">
              <Label className="text-sm font-bold">เปิดใช้งานทันที</Label>
              <p className="text-[11px] text-muted-foreground">
                หากปิดไว้ แบนเนอร์จะไม่แสดงผลหน้าเว็บ
              </p>
            </div>
            <Switch
              checked={bannerData.isActive}
              onCheckedChange={(v) => handleChange("isActive", v)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              บันทึกและเปิดใช้งาน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManagementPage;

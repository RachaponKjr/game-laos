"use client";

import React, { useState, useCallback } from "react";
import {
  Plus,
  Loader2,
  Gamepad2,
  Layers,
  Image as ImageIcon,
  Video as VideoIcon,
  Trash2,
  X,
  Server,
  Upload,
  Edit3,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { uploadFile } from "@/lib/uploadfile";
import { toast } from "sonner";
import Image from "next/image";
import { Game } from "@/types/game.type";
import { Response } from "@/types/status.type";

const AddGame = ({
  editMode,
  game,
  refetch,
}: {
  editMode?: boolean;
  game?: Game;
  refetch: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. State สำหรับข้อมูลทั่วไป
  const [formData, setFormData] = useState({
    name: game?.name || "",
    category: game?.category || "",
    imageUrl: game?.imageUrl || "",
    imageBannerUrl: game?.imageBannerUrl || "",
    videoUrl: game?.videoUrl || "",
    isActive: game?.isActive || true,
    requireServerSelection: game?.config?.requireServerSelection || false,
    servers: game?.config?.servers || [],
  });

  // 2. State สำหรับไฟล์ (เก็บเป็น File Object)
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [serverInput, setServerInput] = useState("");
  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- ระบบจัดการ Server Tags ---
  const addServerTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = serverInput.trim();
      if (value && !formData.servers.includes(value)) {
        handleChange("servers", [...formData.servers, value]);
        setServerInput("");
      }
    }
  };

  // --- ระบบอัปโหลด (Dropzone Logic) ---
  const onDropLogo = useCallback((files: File[]) => setLogoFile(files[0]), []);
  const onDropBanner = useCallback(
    (files: File[]) => setBannerFile(files[0]),
    [],
  );
  const onDropVideo = useCallback(
    (files: File[]) => setVideoFile(files[0]),
    [],
  );

  const logoDrop = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      onDropLogo(files);
      onUpload({ file: files[0], folder: "games", field: "imageUrl" });
    },
    multiple: false,
  });
  const bannerDrop = useDropzone({
    onDrop: (files) => {
      onDropBanner(files);
      onUpload({
        file: files[0],
        folder: "bannerGames",
        field: "imageBannerUrl",
      });
    },
    accept: { "image/*": [] },
    multiple: false,
  });
  const videoDrop = useDropzone({
    onDrop: (files) => {
      onDropVideo(files);
      onUpload({ file: files[0], folder: "videoGames", field: "videoUrl" });
    },
    accept: { "video/*": [] },
    multiple: false,
  });

  const onUpload = async ({
    file,
    folder,
    field,
  }: {
    file: File;
    folder: string;
    field: string;
  }) => {
    try {
      const url = await uploadFile(file, folder);
      setFormData((prev) => ({ ...prev, [field]: url }));
      return url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      alert(
        "กรุณากรอกข้อมูลให้ครบถ้วน (อย่างน้อยต้องมีชื่อ หมวดหมู่ และโลโก้)",
      );
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        isActive: formData.isActive,
        config: {
          servers: formData.servers,
          requireServerSelection: formData.requireServerSelection,
        },
        imageUrl: formData.imageUrl,
        imageBannerUrl: formData.imageBannerUrl,
        videoUrl: formData.videoUrl,
      };

      const url = editMode
        ? `${process.env.NEXT_PUBLIC_API_URL}/games/${game?.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/games`;
      const res = await fetch(url, {
        method: editMode ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data: Response<Game> = await res.json();

      if (data.success !== true) {
        toast.error("Failed to create game");
        return;
      }
      toast.success("บันทึกและอัปโหลดไฟล์เรียบร้อยแล้ว!");
      handleClose(false);
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create game");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setFormData({
        name: "",
        imageBannerUrl: "",
        imageUrl: "",
        videoUrl: "",
        category: "",
        isActive: true,
        requireServerSelection: false,
        servers: [],
      });
      setLogoFile(null);
      setBannerFile(null);
      setVideoFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {editMode ? (
          <Button variant="ghost" size="icon" title="แก้ไขข้อมูลเกม">
            <Edit3 className="h-4 w-4 text-blue-500" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> เพิ่มเกมใหม่
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-bold text-xl">
            <Gamepad2 className="text-primary" /> Game Management
          </DialogTitle>
          <DialogDescription>
            อัปโหลดรูปภาพและวิดีโอเพื่อใช้ในการแสดงผล
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-semibold">ชื่อเกม *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="เช่น Valorant"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">หมวดหมู่ *</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => handleChange("category", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกหมวดหมู่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MOBILE">Mobile Game</SelectItem>
                  <SelectItem value="PC">PC Game</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* อัปโหลด 3 ส่วน */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-xs font-bold flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> 1. โลโก้ (Logo) *
              </Label>
              <div
                {...logoDrop.getRootProps()}
                className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 overflow-hidden relative"
              >
                <input {...logoDrop.getInputProps()} />
                {logoFile ? (
                  <Image
                    src={URL.createObjectURL(logoFile)}
                    alt="Logo"
                    fill
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-[10px]">เลือกรูปภาพ</p>
                  </div>
                )}
              </div>
            </div>

            {/* Banner Upload */}
            <div className="space-y-2">
              <Label className="text-xs font-bold flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> 2. แบนเนอร์ (Banner)
              </Label>
              <div
                {...bannerDrop.getRootProps()}
                className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 overflow-hidden relative"
              >
                <input {...bannerDrop.getInputProps()} />
                {bannerFile ? (
                  <Image
                    src={URL.createObjectURL(bannerFile)}
                    alt="Banner"
                    fill
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-[10px]">เลือกรูปภาพ</p>
                  </div>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <Label className="text-xs font-bold flex items-center gap-1">
                <VideoIcon className="h-3 w-3 text-red-500" /> 3. วิดีโอ (Video)
              </Label>
              <div
                {...videoDrop.getRootProps()}
                className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 p-2 relative"
              >
                <input {...videoDrop.getInputProps()} />
                {videoFile ? (
                  <div className="text-center italic text-[10px] text-primary truncate w-full">
                    <VideoIcon className="h-6 w-6 mx-auto mb-1" />
                    {videoFile.name}
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-[10px]">เลือกไฟล์วิดีโอ</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Server Tags */}
          <div className="p-4 border rounded-lg bg-muted/20 space-y-3">
            <Label className="font-semibold flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-500" /> รายชื่อ Server
            </Label>
            <div className="flex flex-wrap gap-1">
              {formData.servers.map((tag) => (
                <Badge
                  key={tag}
                  className="gap-1 bg-blue-50 text-blue-700 border-blue-200"
                >
                  {tag}{" "}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      handleChange(
                        "servers",
                        formData.servers.filter((s) => s !== tag),
                      )
                    }
                  />
                </Badge>
              ))}
            </div>
            <Input
              value={serverInput}
              onChange={(e) => setServerInput(e.target.value)}
              onKeyDown={addServerTag}
              placeholder="พิมพ์ชื่อ Server แล้วกด Enter"
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between border rounded-lg p-3">
              <Label className="text-sm font-bold">เปิดใช้งาน</Label>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(v) => handleChange("isActive", v)}
              />
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <Label className="text-sm font-bold">บังคับเลือก Server</Label>
              <Switch
                checked={formData.requireServerSelection}
                onCheckedChange={(v) =>
                  handleChange("requireServerSelection", v)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleClose(false)}
            >
              ยกเลิก
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}{" "}
              บันทึกและอัปโหลด
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGame;

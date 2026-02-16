/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  CircleDashed,
  Image as ImageIcon,
  Loader2,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PostStatus = "PUBLISHED" | "DRAFT";

interface Post {
  id?: string;
  title: string;
  tag?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: PostStatus;
  viewCount?: number;
  content: string;
  imageUrl?: string;
  createdAt?: string;
}

const BlogsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบบทความนี้?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
        method: "DELETE",
      });
      getBlogs(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <div className="p-6 mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post Management</h1>
          <p className="text-muted-foreground text-sm">
            จัดการบทความและ SEO ของคุณ
          </p>
        </div>
        <BlogFormDialog mode="add" onSuccess={getBlogs} />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="ค้นหาบทความ..." />
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>บทความ</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>แท็ก</TableHead>
              <TableHead>ยอดชม</TableHead>
              <TableHead className="text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-40 text-center text-muted-foreground"
                >
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  กำลังโหลดข้อมูล...
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-40 text-center text-muted-foreground"
                >
                  ไม่พบข้อมูลบทความ
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-slate-50/50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className="h-12 w-12 relative rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            fill
                            className="object-cover"
                            alt={post.title}
                          />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div className="flex flex-col max-w-[300px]">
                        <span className="font-semibold truncate">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.createdAt!).toLocaleDateString(
                            "th-TH",
                          )}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        post.status === "PUBLISHED"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "bg-slate-50 text-slate-600"
                      }
                    >
                      {post.status === "PUBLISHED" ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <CircleDashed className="mr-1 h-3 w-3" />
                      )}
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{post.tag || "-"}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {post.viewCount?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(
                              `http://localhost:3002/blogs/${post.id}`,
                              "_blank",
                            )
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" /> ดูตัวอย่าง
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <BlogFormDialog
                          mode="edit"
                          initialData={post}
                          onSuccess={getBlogs}
                        />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(post.id!)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> ลบบทความ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// --- Dialog สำหรับเพิ่ม/แก้ไขบทความ ---
const BlogFormDialog = ({
  mode = "add",
  initialData,
  onSuccess,
}: {
  mode: "add" | "edit";
  initialData?: Post;
  onSuccess: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [post, setPost] = useState<Partial<Post>>(
    initialData || {
      title: "",
      tag: "",
      metaTitle: "",
      metaDescription: "",
      status: "DRAFT",
      content: "",
      imageUrl: "",
    },
  );

  // Sync data when initialData changes (for Edit mode)
  useEffect(() => {
    if (initialData) setPost(initialData);
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      setPost((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (err) {
      console.error(err);
      alert("อัปโหลดรูปภาพไม่สำเร็จ");
    }
  };

  const handleSave = async () => {
    if (!post.title || !post.content) return alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    setIsSaving(true);
    const { id, createdAt, viewCount, ...payload } = post;

    try {
      const url =
        mode === "add"
          ? `${process.env.NEXT_PUBLIC_API_URL}/blogs`
          : `${process.env.NEXT_PUBLIC_API_URL}/blogs/${post.id}`;
      const res = await fetch(url, {
        method: mode === "add" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOpen(false);
        onSuccess();
        if (mode === "add")
          setPost({ title: "", tag: "", status: "DRAFT", content: "" });
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> เขียนบทความใหม่
          </Button>
        ) : (
          <div className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 rounded-sm w-full">
            <Edit3 className="mr-2 h-4 w-4 text-blue-600" /> แก้ไขเนื้อหา
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            {mode === "add" ? "Create New Post" : "Edit Post"}
          </DialogTitle>
          <DialogDescription>
            ตั้งค่าเนื้อหาและ SEO เพื่อประสิทธิภาพสูงสุด
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="px-6 bg-slate-50/50 w-full justify-start rounded-none border-b h-12 gap-6">
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0"
            >
              รายละเอียด
            </TabsTrigger>
            <TabsTrigger
              value="seo"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0"
            >
              SEO Settings
            </TabsTrigger>
          </TabsList>

          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            <TabsContent value="content" className="m-0 space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-semibold">หัวข้อบทความ</label>
                <Input
                  name="title"
                  value={post.title}
                  onChange={handleInputChange}
                  placeholder="ชื่อบทความ..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">หมวดหมู่</label>
                  <Input
                    name="tag"
                    value={post.tag}
                    onChange={handleInputChange}
                    placeholder="เช่น News, Promotion"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">สถานะ</label>
                  <select
                    name="status"
                    value={post.status}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-white"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold">เนื้อหา</label>
                <Textarea
                  name="content"
                  value={post.content}
                  onChange={handleInputChange}
                  className="min-h-[200px]"
                  placeholder="รายละเอียด..."
                />
              </div>
              <div className="grid gap-2 text-left">
                <label className="text-sm font-semibold">รูปภาพหน้าปก</label>
                <div className="flex items-center gap-4">
                  {post.imageUrl && (
                    <div className="h-16 w-16 relative rounded border overflow-hidden shrink-0">
                      <Image
                        src={post.imageUrl}
                        fill
                        className="object-cover"
                        alt="preview"
                      />
                    </div>
                  )}
                  <Input type="file" accept="image/*" onChange={uploadImage} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="m-0 space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-semibold">Meta Title</label>
                <Input
                  name="metaTitle"
                  value={post.metaTitle}
                  onChange={handleInputChange}
                  placeholder="SEO Title..."
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold">
                  Meta Description
                </label>
                <Textarea
                  name="metaDescription"
                  value={post.metaDescription}
                  onChange={handleInputChange}
                  placeholder="คำอธิบายสั้นๆ สำหรับ Google..."
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="p-6 bg-slate-50 border-t gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600"
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "add" ? "สร้างบทความ" : "บันทึกการแก้ไข"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlogsPage;

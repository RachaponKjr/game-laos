/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Gamepad2,
  Search,
  Package,
  Edit3,
  Trash2,
  Boxes,
  CircleCheck,
  CircleDashed,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddGame from "./add-game";
import { Game, Package as PackageType } from "@/types/game.type";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import CreatePackage from "./create-package";
import EditGame from "./edit-game";
import dayjs from "dayjs";

interface PackageListDialogProps extends Game {
  packages: PackageType[];
}

const GamesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState<PackageListDialogProps[]>([]);
  const [delOpen, setDelOpen] = useState(false);
  const [delPackageOpen, setDelPackageOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  // Logic ค้นหาเกม
  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, games]);

  const fetchGames = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/game`,
      {
        cache: "no-store",
        headers: {
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
      },
    );
    const data = await response.json();
    setGames(data.data);
  };

  const deleteGame = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/${id}`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    if (data) {
      setSelectedGameId(null);
      setDelOpen(false);
      void (await fetchGames());
    }
  };

  const updateGameStatus = async (id: string, status: boolean) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: status }),
      },
    );
    const data = await response.json();
    if (data) {
      void (await fetchGames());
    }
  };

  useEffect(() => {
    void fetchGames();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Game Management</h1>
          <p className="text-muted-foreground">
            ดูแลระบบหลังบ้าน รายชื่อเกม ประเภท และแพ็กเกจราคา
          </p>
        </div>
        <AddGame refetch={fetchGames} />
      </div>

      {/* Main Content Card */}
      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        {/* Search Bar Area */}
        <div className="p-4 border-b bg-muted/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 bg-background"
              placeholder="ค้นหาชื่อเกมที่ต้องการ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">Game & Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Packages</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <TableRow
                    key={game.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg relative bg-primary/5 border flex items-center justify-center text-primary shrink-0 overflow-hidden">
                          {game.imageUrl ? (
                            <Image
                              src={game.imageUrl}
                              alt={game.name}
                              fill
                              className="object-cover h-full w-full"
                            />
                          ) : (
                            <Gamepad2 className="h-6 w-6" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-base">
                            {game.name}
                          </span>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {game.category?.replace("_", " ") || "No Category"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {game.isActive ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200 gap-1">
                          <CircleCheck className="h-3 w-3" /> Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground gap-1"
                        >
                          <CircleDashed className="h-3 w-3" /> Disabled
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <PackageListDialog
                        game={game}
                        delPackageOpen={delPackageOpen}
                        setDelPackageOpen={setDelPackageOpen}
                        fetchGames={fetchGames}
                      />
                    </TableCell>
                    <TableCell>
                      {dayjs(game.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Switch
                          checked={game.isActive}
                          onCheckedChange={(checked) => {
                            updateGameStatus(game.id, checked);
                          }}
                        />
                        <AddGame
                          editMode={true}
                          game={game}
                          refetch={fetchGames}
                        />
                        <Dialog
                          open={selectedGameId === game.id}
                          onOpenChange={(open) => {
                            setSelectedGameId(open ? game.id : null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" title="ลบเกม">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>ลบเกม</DialogTitle>
                              <DialogDescription>
                                คุณต้องการลบเกม{" "}
                                <span className="font-bold text-red-500">
                                  {game.name}
                                </span>{" "}
                                ใช่หรือไม่
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">ยกเลิก</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  onClick={() => deleteGame(game.id)}
                                  className="bg-destructive text-white cursor-pointer"
                                >
                                  ลบ
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-muted-foreground font-medium"
                  >
                    ไม่พบข้อมูลเกมที่ค้นหา
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

// --- Package List Dialog ---
const PackageListDialog = ({
  game,
  delPackageOpen,
  setDelPackageOpen,
  fetchGames,
}: {
  game: PackageListDialogProps;
  delPackageOpen: boolean;
  setDelPackageOpen: (open: boolean) => void;
  fetchGames: () => Promise<void>;
}) => {
  const delPackage = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/package/${id}`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    if (data) {
      setDelPackageOpen(false);
      void (await fetchGames());
    }
  };
  return (
    <Dialog open={delPackageOpen} onOpenChange={setDelPackageOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 font-medium">
          <Boxes className="h-4 w-4 text-primary" />
          {game?.packages?.length || 0} แพ็กเกจ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader className="space-y-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <DialogTitle className="text-xl font-bold">
              Manage Packages
            </DialogTitle>
            <DialogDescription className="text-base">
              แก้ไขราคาและรายการเติมเงินของเกม{" "}
              <span className="font-bold text-foreground underline decoration-primary/30">
                {game.name}
              </span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 border rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="py-3">ชื่อรายการ</TableHead>
                <TableHead className="text-right">ราคา (บาท)</TableHead>
                <TableHead className="text-right">จำนวน (เพชร)</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {game.packages?.map((pkg: PackageType) => (
                <TableRow key={pkg.id} className="group">
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    ฿{pkg.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary  gap-2 ">
                    <div className="flex items-center gap-2 justify-end">
                      {pkg.amount.toLocaleString()}
                      <Image
                        src={pkg.icon_base64}
                        alt={pkg.name}
                        width={20}
                        height={20}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>ลบแพ็กเกจ</DialogTitle>
                          <DialogDescription>
                            คุณต้องการลบแพ็กเกจ{" "}
                            <span className="font-bold text-red-500">
                              {pkg.name}
                            </span>{" "}
                            ใช่หรือไม่
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">ยกเลิก</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              onClick={() => delPackage(pkg.id)}
                              className="bg-destructive text-white cursor-pointer"
                            >
                              ลบ
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <CreatePackage fetchGames={fetchGames} gameId={game.id} />
      </DialogContent>
    </Dialog>
  );
};

export default GamesPage;

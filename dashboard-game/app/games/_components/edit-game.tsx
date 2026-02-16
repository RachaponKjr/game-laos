import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3 } from "lucide-react";
import React from "react";

const EditGame = () => {
  return (
    <Dialog>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขเกม</DialogTitle>
          <DialogDescription>แก้ไขข้อมูลเกมของคุณที่นี่</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditGame;

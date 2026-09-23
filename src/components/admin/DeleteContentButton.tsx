"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteContentButtonProps {
  id: string;
  title: string;
  onDeleted: () => void;
}

export function DeleteContentButton({ id, title, onDeleted }: DeleteContentButtonProps) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setOpen(false);
    try {
      const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menghapus konten.");
      }

      toast.success("Konten berhasil dihapus.");
      onDeleted();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus konten.");
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline ml-1.5">Hapus</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus &quot;{title}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Konten akan langsung hilang dari homepage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

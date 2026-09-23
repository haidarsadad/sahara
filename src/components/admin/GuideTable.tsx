"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { DeleteButton } from "./DeleteButton";
import type { GuideRow } from "@/lib/types";

export function GuideTable({ initialItems }: { initialItems: GuideRow[] }) {
  const [items, setItems] = useState<GuideRow[]>(initialItems);

  function handleDeleted(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <p className="text-muted-foreground">
          Belum ada panduan. Klik &quot;Tambah Panduan&quot; untuk membuat yang pertama.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Gambar</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead className="hidden sm:table-cell">Kategori</TableHead>
            <TableHead className="hidden md:table-cell">Kesulitan</TableHead>
            <TableHead className="hidden md:table-cell">Langkah</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted border border-border">
                  {item.image_url && (
                    <ImageWithFallback
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium text-foreground max-w-[240px] truncate">
                {item.title}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {item.category}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{item.difficulty}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {item.steps?.length ?? 0} langkah
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/guides/${item.id}`}>
                    <Button size="sm" variant="outline">
                      <Pencil className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline ml-1.5">Edit</span>
                    </Button>
                  </Link>
                  <DeleteButton
                    apiPath={`/api/guides/${item.id}`}
                    itemLabel={item.title}
                    onDeleted={() => handleDeleted(item.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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
import { formatPrice } from "@/lib/format";
import type { ProductRow } from "@/lib/types";

export function ProductTable({ initialItems }: { initialItems: ProductRow[] }) {
  const [items, setItems] = useState<ProductRow[]>(initialItems);

  function handleDeleted(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <p className="text-muted-foreground">
          Belum ada produk. Klik &quot;Tambah Produk&quot; untuk membuat yang pertama.
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
            <TableHead>Nama</TableHead>
            <TableHead className="hidden sm:table-cell">Kategori</TableHead>
            <TableHead className="hidden md:table-cell">Harga</TableHead>
            <TableHead className="hidden sm:table-cell">Unggulan</TableHead>
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
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium text-foreground max-w-[220px] truncate">
                {item.name}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {item.category}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {formatPrice(item.price)}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {item.featured && <Badge variant="secondary">Unggulan</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/products/${item.id}`}>
                    <Button size="sm" variant="outline">
                      <Pencil className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline ml-1.5">Edit</span>
                    </Button>
                  </Link>
                  <DeleteButton
                    apiPath={`/api/products/${item.id}`}
                    itemLabel={item.name}
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

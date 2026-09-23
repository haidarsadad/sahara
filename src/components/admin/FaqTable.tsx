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
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./DeleteButton";
import type { FaqRow } from "@/lib/types";

export function FaqTable({ initialItems }: { initialItems: FaqRow[] }) {
  const [items, setItems] = useState<FaqRow[]>(initialItems);

  function handleDeleted(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <p className="text-muted-foreground">
          Belum ada FAQ. Klik &quot;Tambah FAQ&quot; untuk membuat yang pertama.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Urutan</TableHead>
            <TableHead>Pertanyaan</TableHead>
            <TableHead className="hidden md:table-cell">Jawaban</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-muted-foreground">{item.sort_order}</TableCell>
              <TableCell className="font-medium text-foreground max-w-[240px] truncate">
                {item.question}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground max-w-[320px] truncate">
                {item.answer}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/faqs/${item.id}`}>
                    <Button size="sm" variant="outline">
                      <Pencil className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline ml-1.5">Edit</span>
                    </Button>
                  </Link>
                  <DeleteButton
                    apiPath={`/api/faqs/${item.id}`}
                    itemLabel={item.question}
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

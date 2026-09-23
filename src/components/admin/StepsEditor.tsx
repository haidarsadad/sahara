"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TagListEditor } from "./TagListEditor";
import type { GuideStep } from "@/lib/types";

interface StepsEditorProps {
  steps: GuideStep[];
  onChange: (steps: GuideStep[]) => void;
}

export function StepsEditor({ steps, onChange }: StepsEditorProps) {
  function updateStep(index: number, patch: Partial<GuideStep>) {
    onChange(steps.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function addStep() {
    onChange([...steps, { title: "", description: "", tips: [] }]);
  }

  function removeStep(index: number) {
    onChange(steps.filter((_, i) => i !== index));
  }

  function moveStep(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= steps.length) return;
    const copy = [...steps];
    [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
    onChange(copy);
  }

  return (
    <div className="space-y-4">
      <Label>Langkah-Langkah</Label>

      {steps.length === 0 && (
        <p className="text-sm text-muted-foreground">Belum ada langkah. Tambahkan minimal satu.</p>
      )}

      {steps.map((step, index) => (
        <div key={index} className="bg-muted/40 rounded-xl p-4 space-y-3 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Langkah {index + 1}</span>
            <div className="flex gap-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => moveStep(index, -1)}
                disabled={index === 0}
                aria-label="Pindah ke atas"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => moveStep(index, 1)}
                disabled={index === steps.length - 1}
                aria-label="Pindah ke bawah"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => removeStep(index)}
                aria-label="Hapus langkah"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`step-title-${index}`} className="text-xs">
              Judul Langkah
            </Label>
            <Input
              id={`step-title-${index}`}
              value={step.title}
              onChange={(e) => updateStep(index, { title: e.target.value })}
              placeholder="mis. Siapkan Bahan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`step-desc-${index}`} className="text-xs">
              Deskripsi
            </Label>
            <Textarea
              id={`step-desc-${index}`}
              value={step.description}
              onChange={(e) => updateStep(index, { description: e.target.value })}
              rows={2}
            />
          </div>

          <TagListEditor
            label="Tips (opsional)"
            items={step.tips ?? []}
            onChange={(tips) => updateStep(index, { tips })}
            placeholder="Tambah tips lalu Enter"
          />
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addStep}>
        <Plus className="w-4 h-4 mr-2" />
        Tambah Langkah
      </Button>
    </div>
  );
}

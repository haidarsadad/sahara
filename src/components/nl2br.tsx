import { Fragment } from "react";

/** Render teks dengan `\n` sebagai baris baru - dipakai untuk field dari Supabase yang multi-baris. */
export function Nl2Br({ text }: { text: string | null | undefined }) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

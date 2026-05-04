"use client";

import { useState, useRef } from "react";
import { Upload, CheckCircle2, AlertCircle, ImageIcon } from "lucide-react";
import { uploadPaymentProofAction } from "@/app/actions/payment";

export default function PaymentForm({ enrollmentId }: { enrollmentId: string }) {
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileRef.current?.files?.[0]) {
      setErrorMsg("Pilih file gambar terlebih dahulu.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("bukti_bayar", fileRef.current.files[0]);
    formData.append("enrollmentId", enrollmentId);

    const result = await uploadPaymentProofAction(formData);

    if (result?.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("success");
      // Reload halaman untuk menampilkan state PENDING_VERIFICATION
      window.location.reload();
    }
  };

  return (
    <div
      className="p-8 rounded-3xl border"
      style={{
        background: "rgba(28,36,68,0.7)",
        borderColor: "rgba(168,178,192,0.2)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(168,178,192,0.15)" }}
        >
          <Upload className="w-5 h-5 text-silver-300" />
        </div>
        <h2 className="text-xl font-bold text-white">Upload Bukti Transfer</h2>
      </div>

      {status === "error" && (
        <div
          className="mb-5 p-4 rounded-2xl flex items-start gap-3 border"
          style={{ background: "rgba(200,50,50,0.1)", borderColor: "rgba(200,50,50,0.3)" }}
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300 font-medium">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Drop Zone */}
        <div
          className="relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-gold-400/50 transition-colors"
          style={{ borderColor: "rgba(168,178,192,0.25)" }}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            name="bukti_bayar"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          {preview ? (
            <div className="space-y-3">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-xl object-contain"
              />
              <p className="text-sm text-silver-400 font-medium">{fileName}</p>
              <p className="text-xs text-gold-400 font-semibold">Klik untuk ganti gambar</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{ background: "rgba(168,178,192,0.1)" }}
              >
                <ImageIcon className="w-8 h-8 text-silver-400" />
              </div>
              <p className="text-silver-300 font-semibold">
                Klik atau seret gambar ke sini
              </p>
              <p className="text-silver-500 text-sm">JPG, PNG, WebP — Maks 5MB</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "uploading" || !preview}
          className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl text-sm font-bold text-navy-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gold-gradient"
          style={{ boxShadow: "0 8px 24px rgba(201,168,76,0.3)" }}
        >
          {status === "uploading" ? (
            <>
              <span className="w-5 h-5 border-2 border-navy-700/30 border-t-navy-700 rounded-full animate-spin" />
              Mengupload...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Kirim Bukti Transfer
            </>
          )}
        </button>
      </form>
    </div>
  );
}

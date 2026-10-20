// components/shared/AvatarUpload.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, Trash2 } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentUrl?: string | null;
  userName: string;
  onUploadComplete: (url: string) => void;
  onRemove: () => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

export function AvatarUpload({
  currentUrl,
  userName,
  onUploadComplete,
  onRemove,
  size = "lg",
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);

    try {
      // 1. Get presigned URL
      const presignedRes = await fetch("/api/upload/presigned", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          folder: "profiles",
        }),
      });

      const { signedUrl, url } = await presignedRes.json();

      // 2. Upload directly to S3
      await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // 3. Call success callback
      onUploadComplete(url);
      toast.success("Profile picture updated!");
    } catch (error) {
      toast.error("Failed to upload image");
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={preview || currentUrl || ""} alt={userName} />
          <AvatarFallback className="text-2xl bg-primary/10">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={isUploading} asChild>
          <label className="cursor-pointer">
            <Camera className="mr-2 h-4 w-4" />
            {currentUrl ? "Change" : "Upload"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
        </Button>

        {currentUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
            disabled={isUploading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        JPEG, PNG or WebP. Max 10MB.
      </p>
    </div>
  );
}
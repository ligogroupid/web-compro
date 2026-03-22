"use client";

import { useEffect } from "react";

import { trackContentView } from "@/lib/analytics";

type Props = {
  contentType: string;
  contentId: string;
  contentTitle: string;
};

export default function TrackContentView({
  contentType,
  contentId,
  contentTitle,
}: Props) {
  useEffect(() => {
    trackContentView(contentType, contentId, contentTitle);
  }, [contentType, contentId, contentTitle]);

  return null;
}

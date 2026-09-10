"use client";

import { useSyncExternalStore } from "react";
import { isAuthenticated, subscribeToAuthChanges } from "@/lib/auth";

export function useAuthState() {
  return useSyncExternalStore(
    subscribeToAuthChanges,
    isAuthenticated,
    () => false,
  );
}

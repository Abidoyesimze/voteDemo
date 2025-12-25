'use client';

import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface KeyboardShortcutsProps {
  shortcuts: Array<{
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
    handler: () => void;
    description?: string;
  }>;
}

export default function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  useKeyboardShortcuts(shortcuts);
  return null;
}


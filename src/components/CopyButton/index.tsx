'use client';

import { Copy } from '@/assets';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
  size?: number;
  color?: string;
  className?: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="ml-2 scale-125 cursor-pointer" onClick={handleCopy}>
        <Copy />
      </div>
      {/* Tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-center text-xs rounded px-2 py-1 shadow-lg z-50"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyButton;

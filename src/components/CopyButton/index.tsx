'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import cn from 'classnames';

import { Copy } from '@/assets';

interface CopyButtonProps {
  text: string;
  size?: number;
  color?: string;
  className?: string;
  content?: string;
}

const CopyButton = ({ text, content, className }: CopyButtonProps) => {
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
    <div className="relative inline-flex items-center z-50">
      <div
        className={cn('ml-2 scale-125 cursor-pointer', className)}
        onClick={handleCopy}
      >
        {content}
        <Copy />
      </div>
      {/* Tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, x: -5, y: -5 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -5, y: -5 }}
            className={cn(
              'absolute  bg-black  text-white text-xs rounded px-2 py-1 shadow-lg z-50',
              content ? '-top-9 -left-0' : '-top-7 -left-8',
            )}
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyButton;

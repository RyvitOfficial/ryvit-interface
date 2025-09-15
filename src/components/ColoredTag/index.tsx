import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { IEventStraucture } from '@/types';
import { Tick } from '@/assets';

type TagColor =
  | 'blue'
  | 'green'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'teal'
  | 'pink'
  | 'brown';

const colors: TagColor[] = [
  'blue',
  'green',
  'purple',
  'red',
  'yellow',
  'orange',
  'teal',
  'pink',
  'brown',
];

const colorMap: Record<
  TagColor,
  { bg: string; text: string; selectedBg: string }
> = {
  blue: {
    bg: '#1e2a53',
    text: '#60a5fa',
    selectedBg: '#2563eb',
  },
  green: {
    bg: '#0e2d23',
    text: '#34d399',
    selectedBg: '#10b981',
  },
  purple: {
    bg: '#2b184b',
    text: '#c084fc',
    selectedBg: '#7c3aed',
  },
  red: {
    bg: '#3b0d0c',
    text: '#f87171',
    selectedBg: '#dc2626',
  },

  yellow: {
    bg: '#3b2f0a',
    text: '#facc15',
    selectedBg: '#eab308',
  },
  orange: {
    bg: '#4a1e04',
    text: '#fb923c',
    selectedBg: '#ea580c',
  },
  teal: {
    bg: '#0d2d2b',
    text: '#2dd4bf',
    selectedBg: '#14b8a6',
  },
  pink: {
    bg: '#3a0d28',
    text: '#f472b6',
    selectedBg: '#db2777',
  },
  brown: {
    bg: '#2e1a0f',
    text: '#d6a16e',
    selectedBg: '#b45309',
  },
};

interface ColoredTagListProps {
  events: IEventStraucture[];
  selectedEvents: string[];
  onToggle: (label: string) => void;
}

const ColoredTagList = ({
  events,
  selectedEvents,
  onToggle,
}: ColoredTagListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {events.map((e, index) => {
        const color = colors[index % colors.length];
        const isSelected = selectedEvents.includes(e._id);
        const { bg, text, selectedBg } = colorMap[color];

        return (
          <button
            key={e._id}
            type="button"
            onClick={() => onToggle(e._id)}
            style={{
              backgroundColor: bg,
              color: text,
              border: isSelected
                ? `2px solid ${selectedBg}`
                : '2px solid transparent',
            }}
            className="relative flex items-center flex-wrap h-8 px-6 justify-center rounded-lg shadow-sm text-xs
             font-medium font-jetbrains desktopMax:text-[13px] transition-colors"
          >
            {e.name}
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="text-xs absolute right-2"
                >
                  <Tick fill={text} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
};

export default ColoredTagList;

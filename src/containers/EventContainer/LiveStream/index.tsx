'use client';

import React, { useState, useEffect, useRef } from 'react';

import Card from '@/components/Card';

interface EventItem {
  time: string;
  text: string;
}

interface ColoredEvent {
  event: EventItem;
  color: string;
}

const allEvents: EventItem[] = [
  { time: '14:32:18', text: 'created-lockup id: 26, receiver: G2MK...2DFR' },
  { time: '14:31:55', text: 'withdraw-lockup id: 25, amount: 20 XLM' },
  { time: '14:31:42', text: 'cancel-lockup id: 25' },
  { time: '14:31:20', text: 'created-lockup id: 25, receiver: GBNL...WE4R' },
];

const colors = [
  'text-red-400',
  'text-green-400',
  'text-blue-400',
  'text-yellow-400',
  'text-pink-400',
  'text-purple-400',
  'text-cyan-400',
  'text-orange-400',
];

const LiveStream = () => {
  const [events, setEvents] = useState<ColoredEvent[]>([]);
  const [isLive, setIsLive] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLive) {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < allEvents.length) {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          setEvents((prev) => [
            { event: allEvents[indexRef.current], color: randomColor },
            ...prev,
          ]);
          indexRef.current += 1;
        } else {
          stopLive();
        }
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive]);

  const stopLive = () => {
    setIsLive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const toggleLive = () => {
    if (isLive) {
      stopLive();
    } else {
      setIsLive(true);
    }
  };

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="py-5 px-6 !h-full min-h-0 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-lg font-medium font-jetbrains text-white mb-2 desktopMax:text-base">
          Live Event Stream
        </h2>
        <button
          onClick={toggleLive}
          className={`px-3 py-1 rounded-md text-sm font-jetbrains transition bg-[#22C55E]/20 text-[#4ADE80] hover:bg-[#22C55E]/30`}
        >
          {isLive ? '■ Stop' : '▶ Live'}
        </button>
      </div>

      <div className="bg-codebg w-full flex-1 min-h-0 h-full p-4 overflow-y-auto font-jetbrains text-sm rounded-lg">
        {events.map((item, i) => {
          if (!item || !item.event) return null;
          return (
            <div key={i}>
              <span className="text-gray-400">{item.event.time}</span>{' '}
              <span className={item.color}>{item.event.text}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LiveStream;

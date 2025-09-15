'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/hooks/useRedux';
import cn from 'classnames';

import Card from '@/components/Card';
import Toast from '@/components/Toasts';

import getHslFromString from '@/utils/getRandomColor';
import DateFormat from '@/utils/DateFormat';

import liveStreamApi from '@/api/liveStramApi';

import { IGetContractResponse } from '@/types';
import { Start, Stop } from '@/assets';

interface LiveStreamProps {
  currentContract: IGetContractResponse;
}

const LiveStream = ({ currentContract }: LiveStreamProps) => {
  const [isLive, setIsLive] = useState(
    currentContract.event.eventConfig.active,
  );
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const token = useAppSelector((state) => state.user.token);

  const contractEvents = currentContract.event.contractEvents
    .slice()
    .sort((a, b) => b.ledger - a.ledger)
    .slice(0, 50)
    .map((e) => ({
      time: DateFormat(e.createdAt),
      name: e.name,
      topics: e.params,
      value: e.value,
      ledger: e.ledger,
      status: e.isSend,
      id: e._id,
    }));

  const toggleLive = async () => {
    const isLived = await liveStreamApi(currentContract._id, token as string);
    const status = !isLived.result ? false : true;

    if (!status) {
      Toast({
        text: isLived.message,
        type: 'error',
      });
    }

    setIsLive((prev) => (!status ? false : !prev));
  };

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="py-5 px-6 !h-full min-h-0 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div className="flex-col">
          <h2 className="text-xl font-medium text-white flex items-center gap-2">
            Live Event Stream
            {isLive && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </h2>

          {currentContract.event.eventConfig.statusText && (
            <div
              className={cn(
                'flex items-center text-xs h-4 rounded-md  text-gray-300 gap-1',
                currentContract.event.eventConfig.statusText.includes('not')
                  ? ' text-red-400'
                  : ' text-green-400',
              )}
            >
              <p className="text-white/70 ">Server Status:</p>
              <p className="font-grotesk">
                {currentContract.event.eventConfig.statusText}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLive}
            className={cn(
              'flex items-center gap-2 px-3 h-9 rounded-lg w-24 text-sm font-medium font-jetbrains transition-all shadow-sm',
              isLive
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30',
            )}
          >
            {isLive ? (
              <div className="flex items-center justify-center w-full gap-2">
                <Stop fill="#f87171" />
                <p>Stop</p>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full gap-2">
                <Start fill="#34d399" /> <p>Live</p>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 h-full overflow-y-auto font-jetbrains text-sm rounded-lg space-y-2 pr-1">
        {contractEvents.length === 0 && (
          <div className="text-gray-500 text-center py-12 text-base">
            No events received yet
          </div>
        )}

        {contractEvents.map((item) => {
          const isOpen = openIndex === item.id;
          const accent = getHslFromString(item.name);

          return (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden border border-white/5 bg-bgblack1/50"
            >
              {/* Row */}
              <div
                onClick={() => setOpenIndex(isOpen ? null : item.id)}
                className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-border3/10 transition relative"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ background: accent }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold truncate"
                      style={{ color: accent }}
                    >
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      • {item.time}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 truncate">
                    Ledger: {item.ledger}
                  </div>
                </div>

                {/* Status */}
                <div className="text-xs flex items-center gap-1 ml-4 shrink-0">
                  {item.status ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      sent
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                      failed
                    </span>
                  )}
                </div>
              </div>

              {/* Expand */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="px-6 py-3 bg-bgblack2/50 text-white text-xs space-y-3"
                  >
                    {item.topics?.length > 0 && (
                      <div>
                        <div className="text-gray-400 mb-1">Topics</div>
                        <div className="flex flex-wrap gap-2">
                          {item.topics.map((t: string, idx: number) => (
                            <div
                              key={idx}
                              className="text-[13px] px-2 py-1 bg-white/5 rounded-md break-all"
                            >
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.value && (
                      <div>
                        <div className="text-gray-400 mb-1">Value</div>
                        <pre className="bg-white/5 p-2 rounded-md break-all">
                          {String(item.value)}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LiveStream;

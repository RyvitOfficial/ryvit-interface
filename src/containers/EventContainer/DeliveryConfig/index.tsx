'use client';

import { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/hooks/useRedux';

import CInput from '@/components/Input';
import Button from '@/components/Button';
import { ToggleButtonGroup } from '@/components/ToggleButtonGroup';

import TestDeliveryApi from '@/api/TestDelivery';
import saveDeliveryApi from '@/api/saveDelivery';

import { IGetContractResponse } from '@/types';

import { Tick, Loading } from '@/assets';

interface DeliveryConfigProps {
  currentContract: IGetContractResponse;
}

const DeliveryConfig = ({ currentContract }: DeliveryConfigProps) => {
  const [method, setMethod] = useState<'HTTP' | 'RabbitMQ'>('HTTP');
  const [testing, setTesting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    'success' | 'error' | 'idle' | 'saving'
  >('idle');

  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>(
    'idle',
  );
  const [endpointValue, setEndPointValue] = useState(
    currentContract.event.eventConfig.endpoint,
  );

  const token = useAppSelector((state) => state.user.token);

  const handleTestEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    setEndPointValue(e.target.value.trim());
    setTestStatus('idle');
    setSaveStatus('idle');
  };

  const handleSaveConfig = async () => {
    setTesting(true);
    setTestStatus('idle');
    setSaveStatus('idle');

    try {
      const res = await TestDeliveryApi(
        currentContract._id,
        endpointValue,
        token as string,
      );

      if (res.result) {
        setTestStatus('success');
        setTesting(false);
        setSaveStatus('saving');

        try {
          await saveDeliveryApi(
            currentContract._id,
            endpointValue,
            token as string,
          );

          await setTimeout(() => setTestStatus('idle'), 2000);
        } catch {
          setSaveStatus('error');
        } finally {
          setSaveStatus('success');
        }
      } else {
        setTestStatus('error');
      }
    } catch {
      setTestStatus('error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="flex flex-col bg-bgblack py-5 px-6 rounded-2xl">
      <div className="w-full flex justify-between items-center pb-3">
        <h2 className="text-xl font-medium text-white flex items-center gap-2">
          Delivery Method
        </h2>
      </div>

      <ToggleButtonGroup
        options={['HTTP', 'RabbitMQ']}
        value={method}
        onChange={setMethod}
      />

      <div className="mt-4 space-y-3">
        <CInput
          type="text"
          placeholder={
            method === 'HTTP'
              ? 'https://yourapp.com/events'
              : 'amqp://guest:guest@localhost:5672'
          }
          inputClassName="!border-border3 text-[15px] font-jetbrains text-txtgray desktopMax:rounded-lg desktopMax:h-[35px] desktopMax:text-[13px]"
          value={endpointValue}
          onChange={handleTestEndpoint}
        />

        <div className="flex items-center justify-between w-full gap-4">
          <div className="h-8 w-full flex items-center gap-2">
            <AnimatePresence mode="wait">
              {testing && (
                <motion.p
                  key="testing"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-white text-sm font-medium font-jetbrains"
                >
                  Testing...
                </motion.p>
              )}

              {testStatus === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-green-500 text-sm font-medium flex items-center gap-2"
                >
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  Status code 200
                </motion.div>
              )}

              {testStatus === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-red-500 text-sm font-medium flex items-center gap-2 font-jetbrains"
                >
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  Status code 500
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="w-1/2">
            <Button
              type="button"
              color="gray"
              rounded="sm"
              onClick={handleSaveConfig}
              className={cn(
                'h-[35px] w-full text-sm flex-1 transition-colors duration-200 disabled:cursor-not-allowed',
                saveStatus === 'idle' &&
                  'bg-primary hover:bg-[#2A2D31] text-gray-200',
                saveStatus === 'success' && 'bg-green-600 text-white',
                saveStatus === 'error' && 'bg-red-500/90 text-white',
              )}
              content={
                saveStatus === 'saving' ? (
                  <div className="scale-50">
                    <Loading fill="#fff" />
                  </div>
                ) : saveStatus === 'success' ? (
                  <p className="flex items-center gap-2">
                    Saved <Tick fill="#fff" />
                  </p>
                ) : saveStatus === 'error' ? (
                  'Save Failed'
                ) : (
                  'Save Config'
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfig;

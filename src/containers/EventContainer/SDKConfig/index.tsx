'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Card from '@/components/Card';
import CopyButton from '@/components/CopyButton';

import generateEventSDK from '@/utils/generateEventSDK';

import { IGetContractResponse } from '@/types';

interface SDKConfigProps {
  currentContract: IGetContractResponse;
}

const SDKConfig = ({ currentContract }: SDKConfigProps) => {
  const publicKey = currentContract.event.eventConfig.publickKey
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .trim();

  const sdk = generateEventSDK(currentContract);

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6 h-full flex flex-col"
    >
      <h2 className="text-xl font-medium text-white flex items-center gap-2">
        SDK Configuration
      </h2>

      <div className="flex-1 relative">
        <div className="w-full flex justify-between items-center mb-1">
          <p className="text-sm text-txtgray">usage</p>

          <div className="mb-2">
            <CopyButton
              text={sdk}
              content="Copy"
              className="text-white bg-secondary hover:bg-secondary/80 text-[9px] rounded-md py-1 flex items-center gap-1 px-3"
            />
          </div>
        </div>

        <div className="rounded-md overflow-hidden">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: '12px',
              padding: '0.5rem 1rem',
              border: '1px solid transparent',
              fontSize: '12px',
              height: 'auto',
            }}
          >
            {sdk}
          </SyntaxHighlighter>
        </div>

        <div className="mt-8 z-50 pb-8">
          <p className="text-sm text-txtgray mb-1">Public Key</p>

          <div className="flex items-center justify-between bg-input px-4 py-3 rounded-xl z-50">
            <span className="truncate text-gray-200 text-xs">{publicKey}</span>
            <div className="relative z-50">
              <CopyButton text={publicKey} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SDKConfig;

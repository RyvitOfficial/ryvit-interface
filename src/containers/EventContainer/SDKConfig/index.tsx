'use client';

import { Copy } from '@/assets';
import Button from '@/components/Button';
import Card from '@/components/Card';
import CInput from '@/components/Input';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const codeString = `interface MyDataType {
  id: string
}

createdLockupEventRoute<MyDataType>(app, {
  path: "/custom-events",
  publicKey: 'your public key',
  handler: (data) => {
    console.log("Received secure data:", data);
  },
});`;

const SDKConfig = () => {
  const [publicKey, setPublicKey] = useState(
    'asklfjhlksdjfhkasjdhdfsssssssssssdsdfewfkadjshf',
  );

  const handlePublicKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(e.target.value);
  };

  const handleCopyClick = () => {};

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6 h-full flex flex-col"
    >
      <h2 className="text-lg font-medium font-jetbrains desktopMax:text-base text-white mb-2 shrink-0">
        SDK Configuration
      </h2>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full flex justify-between items-center mb-1">
          <p className="text-sm text-txtgray">usage</p>
          <Button
            color="darkBlue"
            content="Copy"
            rounded="sm"
            className="h-6 text-xs !px-3"
            logo={<Copy />}
            onClick={handleCopyClick}
          />
        </div>

        <Card
          bgColor="#2A2A2F"
          borderColor="transparent"
          className="rounded-md overflow-hidden"
        >
          <SyntaxHighlighter
            language="typescript"
            style={oneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: '#2A2A2F',
              border: '1px solid transparent',
              fontSize: '12px',
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </Card>

        <div className="mt-8">
          <p className="text-sm text-txtgray mb-1">Public Key</p>
          <CInput
            value={publicKey}
            onChange={handlePublicKey}
            inputClassName="!bg-input border-borderblack text-white"
            hideCharacter
            border
          />
        </div>
      </div>
    </Card>
  );
};

export default SDKConfig;

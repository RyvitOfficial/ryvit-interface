'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Button from '@/components/Button';
import Card from '@/components/Card';

import { Copy } from '@/assets';

const codeString = `import { callFunc } from 'ryvit'

interface IValues {
  amount : string;
  token : string;
  receiver : string;
  rate : string;
}

const callCreateLockup = async(amount:string, token:string,
  receiver:string, rate:string, signer:string
) => {
  const values: IValues = {
    amount,
    token,
    receiver,
    rate,
  }

  const result = await callFunc<IValues>('create-lockup',
     signer, values)

  return result
}
`;

const FunctionSDK = () => {
  const handleCopyClick = () => {};

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6 flex flex-col"
    >
      <h2 className="text-lg font-medium font-jetbrains desktopMax:text-base text-white mb-2 shrink-0">
        TypeScript SDK
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
      </div>
    </Card>
  );
};

export default FunctionSDK;

import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Card from '@/components/Card';

const a = `✓ Transaction successful 

lockup_Id: 372 
tx_hash: 0x9f2a1b5c...d3e7f8a1 
gas_used: 45,678`;

const ResponseOutput = () => {
  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6 flex flex-col"
    >
      <h2 className="text-lg font-medium font-jetbrains desktopMax:text-base text-white mb-2 shrink-0">
        Response Output
      </h2>
      <Card
        bgColor="#2A2A2F"
        borderColor="transparent"
        className="rounded-md overflow-hidden"
      >
        <SyntaxHighlighter
          language="typescript"
          style={anOldHope}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#2A2A2F',
            border: '1px solid transparent',
            fontSize: '12px',
          }}
        >
          {a}
        </SyntaxHighlighter>
      </Card>
    </Card>
  );
};

export default ResponseOutput;

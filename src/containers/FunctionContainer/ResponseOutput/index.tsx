import { useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { motion, AnimatePresence } from 'framer-motion';
import { irBlack } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import Card from '@/components/Card';

const a = `✓ Transaction successful
{
  lockup_Id: 10 
  tx_hash: "f8eda16d8e0a54d05702176675ee56e2d78eea05a3cdc758030f69df65e6781b",
  amount: 200,
  receiver: "GBPIAD62EAIOFK3Q2T2637TJDNWN6ZWMEBKNPFKZZ3DVZUVZVJKD37IT",
  token: "USDC:GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR",
}`;

const ResponseOutput = () => {
  const [res, setRes] = useState('');

  const handleClick = () => {
    setRes(a);
  };

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6 flex flex-col"
      onClick={handleClick}
    >
      <h2 className="text-lg font-medium desktopMax:text-base text-white mb-2 shrink-0">
        Response Output
      </h2>
      <Card
        bgColor="#2A2A2F"
        borderColor="transparent"
        className="rounded-md overflow-hidden"
      >
        <AnimatePresence>
          {res ? (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <SyntaxHighlighter
                language="javascript"
                style={irBlack}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: '#2A2A2F',
                  border: '1px solid transparent',
                  fontSize: '12px',
                }}
              >
                {res}
              </SyntaxHighlighter>
            </motion.div>
          ) : (
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
              `// Waiting for response...`
            </SyntaxHighlighter>
          )}
        </AnimatePresence>
      </Card>
    </Card>
  );
};

export default ResponseOutput;

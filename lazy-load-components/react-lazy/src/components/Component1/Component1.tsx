import React, { useState } from 'react';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const Component1: React.FC = () => {
  const [createdDate] = useState<string>(() => formatDate(new Date()));

  return (
    <div
      style={{
        display: 'block',
        backgroundColor: 'yellow',
        borderRadius: '5px',
        padding: '1rem',
        margin: '0.5rem 0',
      }}
    >
      Component1 - {createdDate}
    </div>
  );
};

export default Component1;

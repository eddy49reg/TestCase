import React from 'react';
import { MessageCardProps } from './types/type';

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  return (
    <div className="mesCont" style={{ border: '2px solid' }}>
      <div>{message.title}</div>
      <div>{message.date}</div>
      <div>{message.isNew}</div>
      <div>{message.isRead}</div>
      <div>{message.platform.name}</div>
      <div>{message.reaction}</div>
    </div>
  );
};

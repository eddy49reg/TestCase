import React, { useState } from 'react';
import { updateMessage } from '../../app/api';
import { MessageCardProps } from './types/type';

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = async () => {
    setIsExpanded(!isExpanded);
    if (message.isNew) {
      try {
        await updateMessage(message.id, { isNew: false });
        message.isNew = false;
      } catch (error) {
        console.error('Ошибка при обновлении сообщения:', error);
      }
    }
  };
  return (
    <div
      className="mesCont"
      style={{ border: '2px solid' }}
      onClick={handleCardClick}
    >
      <div>{message.title}</div>
      <div>{message.date}</div>
      <div>{message.isNew && 'новое'}</div>
      <div>{message.isRead && 'непрочитанное'}</div>
      <div>{message.platform.name}</div>
      <div>{message.reaction}</div>
      {isExpanded && (
        <div className="fullMessage" style={{ border: '2px solid' }}>
          <div>{message.title}</div>
          <div>{message.date}</div>
          <div>{message.content}</div>
          <div>{message.isNew}</div>
          <div>{message.isRead}</div>
          <div>{message.platform.name}</div>
          <div>{message.reaction}</div>
        </div>
      )}
    </div>
  );
};

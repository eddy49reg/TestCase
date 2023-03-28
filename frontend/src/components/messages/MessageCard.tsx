import React, { useState } from 'react';
import { updateMessage } from '../../app/api';
import { MessageCardProps } from './types/type';

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messageState, setMessageState] = useState(message);

  const handleCardClick = async () => {
    setIsExpanded(!isExpanded);
    const updatedFields = {
      isNew: false,
      isRead: true,
    };
    try {
      const updatedMessage = await updateMessage(
        messageState.id,
        updatedFields
      );
      setMessageState(updatedMessage);
    } catch (error) {
      console.error('Ошибка при обновлении сообщения:', error);
    }
  };

  return (
    <div
      className="mesCont"
      style={{ border: '2px solid' }}
      onClick={handleCardClick}
    >
      <div>{messageState.title}</div>
      <div>{messageState.date}</div>
      <div>{messageState.isNew && 'новое'}</div>
      <div>{!messageState.isRead && 'непрочитанное'}</div>
      <div>{messageState.platform.name}</div>
      <div>{messageState.reaction}</div>
      {isExpanded && (
        <div className="fullMessage" style={{ border: '2px solid' }}>
          <div>{messageState.title}</div>
          <div>{messageState.date}</div>
          <img src={messageState.imageUrl} alt="" style={{ width: '400px' }} />
          <div>{messageState.content}</div>
          <div>{messageState.isNew}</div>
          <div>{messageState.isRead}</div>
          <div>{messageState.platform.name}</div>
          <div>{messageState.reaction}</div>
        </div>
      )}
    </div>
  );
};

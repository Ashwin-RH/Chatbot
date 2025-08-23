import React from 'react';
import { User, Bot } from 'lucide-react';
import clsx from 'clsx';

const Avatar = ({ role, userData }) => {
  const isUser = role === 'user';
  const initial = userData?.displayName?.charAt(0).toUpperCase() || '?';

  return (
    <div className={clsx(
      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
      isUser ? 'bg-green-500 dark:bg-gray-800 text-gray-100 dark:text-green-400 border-2 border-green-300 dark:border-green-500' : 'text-white bg-gray-600 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-500'
    )}>
      {isUser ? (
        <span className="font-semibold">{initial}</span>
      ) : (
        <Bot size={20} />
      )}
    </div>
  );
};

export default Avatar;
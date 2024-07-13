import React from 'react';
export const convertToTimestamp = (plugin) => {
  const { type } = plugin;
  switch(type) {
    case 'wysiwyg':
      return (
        <>
          {content.title && (<h2>{content.title}</h2>)}
          {content.content && content.content}
        </>
      );
  }
}

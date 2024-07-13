import React from 'react'
import Skeleton from 'react-loading-skeleton';

// An ARIA wrapper around the Skeleton component.
const SkeletonItem = ({ children, ...skeletonSettings }) => {
  return (
    <span aria-label="Content is loading">
      <Skeleton {...skeletonSettings}>
        { children }
      </Skeleton>
    </span>
  )
}

export default SkeletonItem;
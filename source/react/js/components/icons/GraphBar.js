import React from 'react';

import Icon from '../Icon';

const GraphBarIcon = props => (
  <Icon viewBox="0 0 256 256" {...props}>
    <defs>
      <path id="b" d="M156 32h32v208h-32z" />
      <filter x="-37.5%" y="-5.8%" width="175%" height="111.5%" filterUnits="objectBoundingBox" id="a">
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter1" />
      </filter>
      <path id="d" d="M208 0h32v240h-32z" />
      <filter x="-37.5%" y="-5%" width="175%" height="110%" filterUnits="objectBoundingBox" id="c">
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter1" />
      </filter>
      <path id="f" d="M0 72h32v168H0z" />
      <filter x="-37.5%" y="-7.1%" width="175%" height="114.3%" filterUnits="objectBoundingBox" id="e">
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter1" />
      </filter>
      <path id="h" d="M52 52h32v188H52z" />
      <filter x="-37.5%" y="-6.4%" width="175%" height="112.8%" filterUnits="objectBoundingBox" id="g">
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter1" />
      </filter>
      <path id="j" d="M104 72h32v168h-32z" />
      <filter x="-37.5%" y="-7.1%" width="175%" height="114.3%" filterUnits="objectBoundingBox" id="i">
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter1" />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(8 8)">
        <use fill="#000" filter="url(#a)" xlinkHref="#b" />
        <use fill="#FFCF3F" xlinkHref="#b" />
      </g>
      <g transform="translate(8 8)">
        <use fill="#000" filter="url(#c)" xlinkHref="#d" />
        <use fill="#008D49" xlinkHref="#d" />
      </g>
      <g transform="translate(8 8)">
        <use fill="#000" filter="url(#e)" xlinkHref="#f" />
        <use fill="#A8DD7C" xlinkHref="#f" />
      </g>
      <g transform="translate(8 8)">
        <use fill="#000" filter="url(#g)" xlinkHref="#h" />
        <use fill="#FFE596" xlinkHref="#h" />
      </g>
      <g transform="translate(8 8)">
        <use fill="#000" filter="url(#i)" xlinkHref="#j" />
        <use fill="#4BAC4C" xlinkHref="#j" />
      </g>
    </g>
  </Icon>
);

export default GraphBarIcon;

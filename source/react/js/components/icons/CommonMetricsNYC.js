import React from 'react';

import Icon from '../Icon';

let matrixIconColors = ["#A8DD7C", "#C9EEFE", "#2A82C7", "#008D49", "#4BAC4C", "#3194E0", "#003C7A", "#24588D"];

if(window.App.pages.matrixIconColors.length === 8) {
  matrixIconColors = window.App.pages.matrixIconColors;
}

const CommonMetricsNYCIcon = props => (
  <Icon viewBox="0 0 394 466" {...props}>
    <g fill="none" fillRule="evenodd">
      {/* <path fill="#FFF" d="M-124-949h1400v3166H-124z" /> */}
      <g transform="translate(-4 1)">
        <circle fill={matrixIconColors[0]} cx="254.658" cy="17.799" r="18.483" />
        <circle fill={matrixIconColors[0]} cx="217.691" cy="39.705" r="18.483" />
        <circle fill={matrixIconColors[0]} cx="254.658" cy="106.792" r="18.483" />
        <circle stroke={matrixIconColors[1]} strokeWidth=".5" cx="254.658" cy="62.295" r="18.483" />
        <circle stroke={matrixIconColors[1]} strokeWidth=".5" cx="217.007" cy="84.886" r="18.483" />
        <circle stroke={matrixIconColors[2]} strokeWidth=".5" cx="178.671" cy="106.792" r="18.483" />
        <circle stroke={matrixIconColors[3]} strokeWidth=".5" cx="179.356" cy="151.973" r="18.483" />
        <circle fill={matrixIconColors[3]} cx="144.443" cy="176.617" r="18.483" />
        <circle fill={matrixIconColors[4]} cx="180.04" cy="245.758" r="18.483" />
        <circle stroke={matrixIconColors[5]} strokeWidth=".5" cx="108.161" cy="245.074" r="18.483" />
        <circle fill={matrixIconColors[4]} cx="218.376" cy="226.591" r="18.483" />
        <circle stroke={matrixIconColors[5]} strokeWidth=".5" cx="144.443" cy="221.114" r="18.483" />
        <circle fill={matrixIconColors[4]} cx="257.396" cy="245.074" r="18.483" />
        <circle fill={matrixIconColors[4]} cx="257.396" cy="288.886" r="18.483" />
        <circle fill={matrixIconColors[4]} cx="379.248" cy="227.275" r="18.483" />
        <circle stroke={matrixIconColors[6]} strokeWidth=".5" cx="339.544" cy="245.074" r="18.483" />
        <circle fill={matrixIconColors[4]} cx="339.544" cy="288.886" r="18.483" />
        <circle stroke={matrixIconColors[6]} strokeWidth=".5" cx="297.101" cy="227.275" r="18.483" />
        <circle stroke={matrixIconColors[6]} strokeWidth=".5" cx="297.101" cy="307.369" r="18.483" />
        <circle stroke={matrixIconColors[5]} strokeWidth=".5" cx="217.691" cy="311.477" r="18.483" />
        <circle fill={matrixIconColors[5]} cx="180.04" cy="289.57" r="18.483" />
        <circle fill={matrixIconColors[5]} cx="143.758" cy="311.477" r="18.483" />
        <circle fill={matrixIconColors[6]} cx="23.275" cy="355.289" r="18.483" />
        <circle fill={matrixIconColors[6]} cx="60.926" cy="421.007" r="18.483" />
        <circle fill={matrixIconColors[6]} cx="23.275" cy="445.651" r="18.483" />
        <circle fill={matrixIconColors[5]} cx="143.758" cy="355.289" r="18.483" />
        <circle fill={matrixIconColors[5]} cx="180.04" cy="376.51" r="18.483" />
        <circle fill={matrixIconColors[5]} cx="217.691" cy="355.973" r="18.483" />
        <circle fill={matrixIconColors[5]} cx="256.711" cy="374.456" r="18.483" />
        <circle stroke={matrixIconColors[7]} strokeWidth=".5" cx="106.107" cy="376.51" r="18.483" />
        <circle stroke={matrixIconColors[7]} strokeWidth=".5" cx="60.926" cy="376.51" r="18.483" />
      </g>
    </g>
  </Icon>
);

export default CommonMetricsNYCIcon;

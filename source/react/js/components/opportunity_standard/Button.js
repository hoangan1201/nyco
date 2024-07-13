import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/button.scss'

const Button = ({
  label, onClick, iconLeft, iconRight, ariaExpanded, disabled,
  loading, type, isBlock, isBlockOnMobile, theme
}) => {
  const buttonStyles = [ style.button ]
  if (iconLeft || iconRight) buttonStyles.push(style.hasIcon);
  if (isBlock) buttonStyles.push(style.block);
  if (loading) buttonStyles.push(style.loading);
  if (isBlockOnMobile) buttonStyles.push(style.blockOnMobile);
  if (theme) {
    if (Array.isArray(theme)) {
      buttonStyles.push(...theme.map(theme => style[theme]));
    } else {
      buttonStyles.push(style[theme])
    }
  }

  const handleClick = (e) => {
    if (!disabled) {
      onClick(e);
    }
  }

  return (
    <button
      className={buttonStyles.join(' ')}
      onClick={e => handleClick(e)}
      aria-expanded={ariaExpanded}
      disabled={disabled}
      type={type}
    >
      { iconLeft &&
        <span className={`${style.iconContainer} ${style.left}`}>
          { iconLeft }
        </span>
      }

      { label }

      { iconRight &&
        <span className={`${style.iconContainer} ${style.right}`}>
          { iconRight }
        </span>
      }
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  ariaExpanded: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  isBlock: PropTypes.bool,
  isBlockOnMobile: PropTypes.bool,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  dropdownContent: PropTypes.node
};

Button.defaultProps = {
  onClick: (val) => {},
  disabled: false,
  loading: false,
  isBlock: false,
  isBlockOnMobile: false
}

export default withStyles(style)(Button);
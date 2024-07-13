import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/big-number-card.scss';
import SkeletonWrapper from '../SkeletonWrapper';
import SkeletonItem from '../SkeletonItem';

const BigNumberCard = ({ label, heading, icon, number, bottomLabel, isLoading }) => {
  return (
    <div className={style.bigNumberCard}>
      <div className={style.upper}>
        <div className={style.label}>{ label }</div>
        
        <h4>{ heading }</h4>
      </div>

      <div className={style.lower}>
        <div className={style.numberContainer}>
          { icon && 
            <div className={style.iconContainer}>
              { icon }
            </div>
          }
          
          <div className={style.number}>
            { isLoading && <SkeletonWrapper baseColor="#c9e7fc"><SkeletonItem /></SkeletonWrapper> }
            { !isLoading && number }
          </div>
        </div>

        { bottomLabel && 
          <div className={style.bottomLabel}>
            { bottomLabel }
          </div>
        }
      </div>
    </div>
  )
}

BigNumberCard.propTypes = {
  label: PropTypes.string,
  heading: PropTypes.string,
  icon: PropTypes.node,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  bottomLabel: PropTypes.string,
  isLoading: PropTypes.bool
}

BigNumberCard.defaultProps = {
  isLoading: false
}

export default withStyles(style)(BigNumberCard);
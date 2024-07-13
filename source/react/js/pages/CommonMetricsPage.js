import React, { useEffect, useRef } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory, useLocation } from "react-router-dom";

import page from '../hocs/page';
import layout from '../styles/with-layout.scss';
import CommonMetricsNYCIcon from '../components/icons/CommonMetricsNYC';
import CommonMetricView from '../components/CommonMetricView';
import { decodeHTML } from '../utils/misc';
import getCommonMetrics, { resetCommonMetrics } from '../actions/commonMetrics';
import SkeletonWrapper from '../components/SkeletonWrapper';
import SkeletonItem from '../components/SkeletonItem';
import ChipSelect from '../components/opportunity_standard/ChipSelect';
import DropdownSelect from '../components/opportunity_standard/DropdownSelect';
import FormControl from '../components/opportunity_standard/FormControl';
import { putFocusOnElement } from '../utils/accessibility';

const CommonMetricsPage = (props) => {
  const { translatedStrings, intl, items } = props;

  const activeMetricSlug = props.match.params.slug ? props.match.params.slug : 'clients-served';
  const currentMetric = items?.common_metric;

  const metricSelectionRef = useRef(null);

  const history = useHistory();
  const location = useLocation();

  const reloadActiveMetricFromUrl = () => {
    const { dispatch, match } = props;
    const { lang } = match.params;

    dispatch(resetCommonMetrics());
    dispatch(
      getCommonMetrics({
        lang,
        slug: activeMetricSlug,
        ignoreMarqueeNumber: true // We'll refresh the marquee number based on common metric filters
      })
    );
  }

  useEffect(() => {
    reloadActiveMetricFromUrl();
  }, [location]);

  const handleMetricChange = (newSlug) => {
    history.push(`/${intl.locale}/common-metrics/${newSlug}`);
    putFocusOnElement({ elementId: 'marquee-section', preventScroll: true })
  }

  const getPopulationOptions = () => items?.agency_program_data['Program Target Population']?.map(dict => ({
    key: Object.values(dict)[0],
    value: Object.keys(dict)[0]
  }))

  const getMetricOptions = () => {
    const options = items?.common_metric_menu_items?.map(item => ({
      key: item.title,
      value: item.slug
    }))

    return (options?.length > 0) ? options : null;
  }

  return (
    <section className={layout.rootNew}>
      <div className={`${layout.section} ${layout.lessTopPadding} ${layout.verticalCenter}`}>
        <div className={layout.content}>
          <div className={`${layout.tabletOnly}`} style={{ marginBottom: '5rem' }}>
            <CommonMetricsNYCIcon
              width={90}
              height={110}
            />
          </div>

          <h1>{ translatedStrings.common_metric_title }</h1>

          <div dangerouslySetInnerHTML={{ __html: decodeHTML(translatedStrings.common_metric_description) }} />
        </div>

        <div className={`${layout.iconContainer} ${layout.desktopOnly}`}>
          <CommonMetricsNYCIcon
            width={180}
            height={210}
          />
        </div>
      </div>

      <div className={`${layout.section} ${layout.darker} ${layout.lessBottomPaddingOnTablet}`} style={{ marginBottom: '-5rem'}} ref={metricSelectionRef}>
        <div className={layout.content}>
          <h2>Select a Metric</h2>

          { getMetricOptions() && 
            <>
              <span className={layout.desktopOnly}>
                <ChipSelect
                  options={ getMetricOptions() }
                  value={ activeMetricSlug }
                  maxViewAtOnce={4}
                  itemPlural="metrics"
                  theme="dark"
                  onValueChange={ handleMetricChange }
                />
              </span>
              <span className={layout.tabletOnly}>
                <FormControl>
                  <DropdownSelect
                    options={ getMetricOptions() }
                    value={ activeMetricSlug }
                    theme="dark"
                    onValueChange={ handleMetricChange }
                    showAsPopup={ false }
                    autoClose={ true }
                  />
                </FormControl>
              </span>
            </>
          }

          { !getMetricOptions() && 
            <SkeletonWrapper>
              <p style={{ lineHeight: '5.5rem' }}><SkeletonItem count={2} height="4rem" /></p>
            </SkeletonWrapper>
          }
        </div>
      </div>

      <CommonMetricView
        metric={ currentMetric }
        translatedStrings={ translatedStrings }
        populationOptions={ getPopulationOptions() }
        metricSelectionRef={ metricSelectionRef }
        intl={ intl }
      />
    </section>
  )
}

const mapStateToProps = ({ commonMetrics }) => ({
  items: commonMetrics.items
});

export default compose(
  page(),
  connect(mapStateToProps),
  withStyles(layout),
)(CommonMetricsPage);
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/table-modal.scss';
import { generateUniqueId } from '../utils/misc';
import ExpandCollapse from './ExpandCollapse'

class TableModal extends Component {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    isMap: PropTypes.bool,
    isSankey: PropTypes.bool,
    renderTableOnly: PropTypes.bool
  };

  static defaultProps = {
    isMap: false,
    isSankey: false,
    renderTableOnly: false
  };
  constructor(props) {
    super(props);
  }

  getRow = () => {
    const { data, isMap, isSankey } = this.props;
    if (isMap) {
      return (
        // eslint-disable-next-line no-shadow
        data.series.map(({ name, data }, i) => {
          const unique = [];
          data.map(x => unique.filter(a => a.title == x.title && a.tooltip_content == x.tooltip_content).length > 0 ? null : unique.push(x));
          return (
          <Fragment key={i}>
            {unique.map(({ title, tooltip_content }, j) => {
              if(title || tooltip_content){
                return (
                  <tr key={j}>
                    {/* eslint-disable-next-line react/no-danger */}
                    <td dangerouslySetInnerHTML={{ __html: title }} />
                    {/* eslint-disable-next-line react/no-danger */}
                    <td dangerouslySetInnerHTML={{ __html: tooltip_content }} />
                  </tr>
                );
              }
            })}
          </Fragment>
        )})
      );
    }
    if (isSankey) {
      return (
        // eslint-disable-next-line no-shadow
        data.series.map(({ name, data }) => (
          <Fragment key={name}>
            {data.map(({ from, to, weight }) => (
              <Fragment key={generateUniqueId({ from })}>
                <tr>
                  <td>{from.slice(0,-2)}</td>
                  <td>{to.slice(0,-2)}</td>
                  <td>{weight}</td>
                </tr>
              </Fragment>
            ))}
          </Fragment>
        ))
      );
    }
    return (
      // eslint-disable-next-line no-shadow
      data.series.map(({ name, data }, i) => (
        <tr key={i}>
          <Fragment>
            <td>{name}</td>
            {data.map(d => (
              <td key={generateUniqueId({ d })}>{d}</td>
            ))}
          </Fragment>
        </tr>
      ))
    );
  };

  getHeader = () => {
    const { isMap, isSankey, categories } = this.props;
    if (isMap) {
          <tr>
                {categories.map(category => (
                  <th key={category}>{category}</th>
                ))}
              </tr>    }
    else if (isSankey){
      return (
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
        </tr>
      )
    }

    return (
      <tr>
        <th>Series</th>
        {categories.map(category => (
          <th key={category}>{category}</th>
        ))}
      </tr>
    )
  };
  getTable = () => {
    const { data, categories, table, isMap, isSankey, tableRef } = this.props;
    if (!isMap && !isSankey && table){
      return <div ref={tableRef} className={style.modal} dangerouslySetInnerHTML={{__html:table.options.getTable(table)}}/>

    }
    return (<table ref={tableRef} className={style.modal} data-is-styled="true" role="table">
            <thead>
              {this.getHeader()}
            </thead>
            <tbody>
              {this.getRow()}
            </tbody>
          </table>)
  }

  render() {
    const { data, categories, table, renderTableOnly, tableRef } = this.props;
    const { dataNotes } = data;
    if(table && Object.entries(table).length === 0){
      return false
    }
    return (
      <div className={style.root} style={{ paddingTop: renderTableOnly ? '0rem' : undefined }}>
        { !renderTableOnly &&
          <div className={style.meta}>
            <h3>{data.title.wdpTitle}</h3>
            <div className={style.description} dangerouslySetInnerHTML={{__html: data.chartDescription}} />
            {dataNotes && <ExpandCollapse title={'Data Notes'} content={dataNotes} />}
          </div>
        }
        <div className={style.tableWrapper}>
          {this.getTable()}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(TableModal);

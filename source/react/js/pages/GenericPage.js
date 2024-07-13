import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _, { stubArray } from 'lodash';
import classnames from 'classnames';

import style from '../styles/generic-page.scss';
import page from '../hocs/page';
import AgencyCard from '../components/AgencyCard';
// import UnorderedList from '../components/UnorderedList';
// import ALink from '../components/ALink';
import Loader from '../components/Loader';
import FourOhFour from '../components/404';

import { getGenericPage } from '../actions/genericPage';
import { contentWrapper, formatNavData } from '../utils/misc';
import SidebarSticky from '../components/SidebarSticky';
import SideMenu from '../components/SideMenu';
import Embed from '../components/Embed';
import CaptionCard from '../components/CaptionCard';
import Breadcrumb from '../components/Breadcrumb';


class GenericPage extends Component {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        lang: PropTypes.string.isRequired,
      }),
      path: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.initialState = {
      foo: false,
      activeSection: 0,
    };

    this.state = this.initialState;
    this.sections = [];
  }

  handleSectionScroll = () => {
    const { data } = this.props;

    if (data.agency_items.length === 0) {
      const { activeSection } = this.state;

      if (this.sections.length === 0) {
        const { contents } = this.props;
        const navData = formatNavData({ contents });

        this.sections = navData.map(({ label }) => (
          document.getElementById(encodeURIComponent(label))
        ));
      }

      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
        if (section) {
          const currentSectionY = section.getBoundingClientRect().y + (section.getBoundingClientRect().height / 2);
          if (currentSectionY > 0) {
            if (activeSection !== i) {
              this.setState({ ...this.state, activeSection: i });
            }
            break;
          }
        }
      }
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { slug, lang } = match.params;
    dispatch(getGenericPage({ slug, lang }));
    window.addEventListener('scroll', this.handleSectionScroll, { passive: true });
  }

  componentDidUpdate(prevProps) {
    const { dispatch, match } = this.props;
    const { slug, lang } = match.params;
    if (!_.isEqual(match, prevProps.match)) {
      dispatch(getGenericPage({ slug, lang }));
      this.sections = [];
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleSectionScroll, { passive: true });
  }

  getBreadcrumb = () => {
    const { match } = this.props;
    const { slug } = match.params;
    console.log(slug);
    const breadcrumbData = [
      { title: 'Home', path: '/'},
      { title: slug.charAt(0).toUpperCase() + slug.slice(1), path: `/${slug}`}
    ];

    return breadcrumbData;
  }


  render() {
    const { isFetching, data, contents } = this.props;
    const { activeSection } = this.state;

    if (isFetching) {
      return <Loader />;
    }

    if (!Object.keys(data).length) {
      return <FourOhFour />;
    }

    const pageContents = contentWrapper({ contents });
    const navData = formatNavData({ contents });
    const breadcrumbData = this.getBreadcrumb();


    return (
      <div className={style.root}>
        <Breadcrumb data={breadcrumbData} />        
        {/* Title section */}
        <section className={style.title_container}>
          {/* title */}
          <div className={style.title}>
            <h1>{data.title}</h1>
          </div>
          {/* subtitle */}
          <div className={style.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </section>

        {data.title === 'About' ? (
          <div className={classnames(style.left, style.about_content)}>
            {pageContents.map((content, index) => {
              switch (content.type) {
                case 'wysiwyg':
                  return (
                    // <section className={classnames(style.content, style.contentDesc)} key={index} id={encodeURIComponent(content.title)}>
                    <section className={style.section_content} key={index} id={encodeURIComponent(content.title)}>
                      <div>
                        {content.title && (<h2 className={style.section_title}>{content.title}</h2>)}
                      </div>
                      <div>
                        {content.title && (<div className={style.divider}></div>)}
                      </div>
                      {/* <div className={style.divider}></div> */}
                      <div className={style.content}>
                        {content.content && content.content}
                      </div>
                    </section>
                  );

                case 'image':
                  return (
                    <section key={index} id={encodeURIComponent(content.title)}>
                      <h2>{content.title}</h2>
                      <CaptionCard
                        content={<img src={content.src} alt={content.alt}></img>}
                        caption={content.caption}
                      />
                    </section>
                  );

                case 'embed':
                  return (
                    <section key={index} id={encodeURIComponent(content.title)}>
                      <h2>{content.title}</h2>
                      <Embed embedCode={content.embed_code} />
                    </section>
                  );
              }
            })}
          </div>
        ) : (
          <div className={style.content_container}>
            {/* in-page hamburger navbar for mobile */}

            <div className={classnames(style.mobile_nav, style.generic_content, { [style.hidden]: !this.state.isMobile })}>
              <div className={style.mobile_nav_header}>
                <span>On this page</span>
                <button className={style.hamburger} id="hamburgerBtn">&#9776;</button>
              </div>
              <nav className={style.mobile_nav_menu} id="mobileNavMenu">
                <SideMenu navData={navData} activeIndex={activeSection} />
              </nav>
            </div>

            <div className={classnames(style.left, style.generic_content)}>
              {pageContents.map((content, index) => {
                switch (content.type) {
                  case 'wysiwyg':
                    return (
                      <section className={style.section_content} key={index} id={encodeURIComponent(content.title)}>
                        <div>
                          {content.title && (<h2 className={style.section_title}>{content.title}</h2>)}
                        </div>
                        <div>
                          {content.title && (<div className={style.divider}></div>)}
                        </div>
                        {/* <div className={style.divider}></div> */}
                        <div className={style.content}>
                          {content.content && content.content}
                        </div>
                      </section>
                    );
                  case 'image':
                    return (
                      <section key={index} id={encodeURIComponent(content.title)}>
                        <CaptionCard
                          content={<img src={content.src} alt={content.alt}></img>}
                          caption={content.caption}
                        />
                      </section>
                    );
                  case 'embed':
                    return (
                      <section key={index} id={encodeURIComponent(content.title)}>
                        <h2>{content.title}</h2>
                        <Embed embedCode={content.embed_code} />
                      </section>
                    );
                }
              })}
            </div>

            <div className={classnames(style.right, { [style.hidden]: this.state.isMobile })}>
              <SidebarSticky>
                <SideMenu navData={navData} activeIndex={activeSection} />
              </SidebarSticky>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ genericPage }) => {
  const { isFetching, data, contents } = genericPage;
  return {
    data,
    isFetching,
    contents,
  };
};

export default compose(
  page({
    isDark: true,
  }),
  connect(mapStateToProps),
  withStyles(style),
)(GenericPage);


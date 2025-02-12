import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink, Component } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';

const EventTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }
  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <Component
              className="listing-image"
              componentName="PreviewImage"
              item={item}
              alt=""
            />
            <div className="listing-body">
              <div className="event-when-where">
                <div className="date">
                  {item?.start ? (
                    <FormattedDate date={item.start} locale="de" />
                  ) : (
                    <span className="day">No date</span>
                  )}{' '}
                  &mdash;&nbsp;
                  {item?.end ? (
                    <FormattedDate date={item.end} />
                  ) : (
                    <span className="day">No date</span>
                  )}
                </div>
                {item?.location ? (
                  <div className="location">, {item.location}</div>
                ) : (
                  <></>
                )}
              </div>
              <h3 className="listing-header">
                <ConditionalLink item={item} condition={!isEditMode}>
                  {item.title ? item.title : item.id}
                </ConditionalLink>
              </h3>
              <p className="listing-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

EventTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default EventTemplate;

//item.start && item.end && item.location

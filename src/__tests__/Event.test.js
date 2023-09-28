import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';

describe('<Event /> componenent', () => {
   let EventWrapper;
   const event = mockData[0];
   beforeAll(() => {
      EventWrapper = shallow(<Event event={event} />);
   })

   test('component renders', () => {
      expect(EventWrapper).toBeDefined();
   } );

   test('summary renders', () => {
      const summary = EventWrapper.find('h2.summary');
      expect(summary).toHaveLength(1);
      expect(summary.text()).toBe(event.summary);
   } );

   test('event start time renders', () => {
      const eventStart = EventWrapper.find('p.event-start');
      expect(eventStart).toHaveLength(1);
      expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
   } );

   test('event location renders', () => {
      const eventLocation = EventWrapper.find('p.event-location');
      expect(eventLocation).toHaveLength(1);
      expect(eventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
   } );

   test('defaults to collapsed view', () => {
      expect(EventWrapper.state("collapsed")).toBe(true);
   } );

   test('collapsed view renders', () => {
      expect(EventWrapper.find('h3.about')).toHaveLength(0);
      expect(EventWrapper.find('a.link')).toHaveLength(0);
      expect(EventWrapper.find('p.description')).toHaveLength(0);
   } );

   test('clicking show details renders expanded view', () => {
      const detailsButton = EventWrapper.find('button.details-btn');
      expect(detailsButton.text()).toBe('show details');
      detailsButton.simulate('click');
      expect(EventWrapper.state('collapsed')).toBe(false);
   } );

   test('event details render when in expanded view', () => {
      expect(EventWrapper.find('h3.about')).toHaveLength(1);
      expect(EventWrapper.find('a.link')).toHaveLength(1);
      expect(EventWrapper.find('p.description')).toHaveLength(1);
   
   } );

   test('clikcing hide details collapsed the expanded view to render the collapsed view', () => {
      const detailsButton = EventWrapper.find('button.details-btn');
      expect(detailsButton.text()).toBe('hide details');
      detailsButton.simulate('click');
      expect(EventWrapper.state('collapsed')).toBe(true);
   } );

});
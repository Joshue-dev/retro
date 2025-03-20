import hammer from '/src/images/icons/hammer_filter.svg';
import circle_dot from '/src/images/icons/circle_dot_filter.svg';
import completed from '/src/images/icons/completed_filter.svg';
import estate from '/src/images/icons/estateIcon_filter.svg';
import flat from '/src/images/icons/flatIcon_filter.svg';

import land from '/src/images/icons/land_filter.svg';
import terraces from '/src/images/icons/terraces_filter.svg';
import semi_detached from '/src/images/icons/semi_detached_filter.svg';

import detached from '/src/images/icons/detached_filter.svg';
import mixed_use from '/src/images/icons/mixed_use_filter.svg';

import active from '/src/images/icons/active_listing_filter.svg';
import inactive from '/src/images/icons/inactive_listing_filter.svg';
import soldout from '/src/images/icons/soldout_listing_filter.svg';

export const construction_constants = [
  {image: hammer.src, name: 'Pre Construction'},
  {image: circle_dot.src, name: 'In Construction'},
  {image: completed.src, name: 'Post Construction'},
];

export const listings_type_constants = [
  {image: estate.src, name: 'Estate'},
  {image: flat.src, name: 'Flat/Apartment'},
  {image: terraces.src, name: 'Terraces'},

  {image: land.src, name: 'Land'},
  {image: semi_detached.src, name: 'Semi Detached'},

  {image: detached.src, name: 'Detached'},
  {image: mixed_use.src, name: 'Mixed Use'},
];

export const listings_status_constants = [
  {image: active.src, name: 'Active'},
  {image: inactive.src, name: 'Inactive'},
  {image: soldout.src, name: 'Sold out'},
];

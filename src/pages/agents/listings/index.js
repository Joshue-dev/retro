/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {ListingsTable} from './manage';
import { AgentsLayoutView } from 'page.components/agents_components/AgentLayout';

export const ManageListing = () => {
  return (
    <AgentsLayoutView activePage={'listings'} pt="0px">
      <ListingsTable />
    </AgentsLayoutView>
  )
};
export default ManageListing;

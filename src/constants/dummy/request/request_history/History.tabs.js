import AccountRequest from '../../../pages/request/account_request';
import AgentRequest from '../../../pages/request/agent_request';
import AllocationRequest from '../../../pages/request/allocation_request';
import DeedRequest from '../../../pages/request/deed_request';
import InspectionRequest from '../../../pages/request/inspection_request';

export const HistoryTabs = [
  {
    tablist: 'Inspection Request',
    component: <InspectionRequest />,
  },
  {
    tablist: 'Deed Request',
    component: <DeedRequest />,
  },
  {
    tablist: 'Allocation Request',
    component: <AllocationRequest />,
  },
  {
    tablist: 'Account Request',
    component: <AccountRequest />,
  },
  {
    tablist: 'Agent Request',
    component: <AgentRequest />,
  },
];

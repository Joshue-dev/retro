import {Text} from '@chakra-ui/react';
import users_icon from '/src/images/icons/contact_icon.svg';
import account_icon from '/src/images/icons/account.svg';
import request_icon from '/src/images/icons/request_icon.svg';
import users_icon_dark from '/src/images/icons/users_icon_dark.svg';
import listing_icon from '/src/images/icons/listings_icon.png';
import mobile_listing_icon from '/src/images/icons/mobile_nav/mobile_listing_icon.svg';
import mobile_subscribers_icon from '/src/images/icons/mobile_nav/mobile_subscribers_icon.svg';
import mobile_wallet_icon from '/src/images/icons/mobile_nav/mobile_wallet_icon.svg';
import mobile_commission_request_icon from '/src/images/icons/mobile_nav/mobile_commission_request_icon.svg';
// import mobile_commission_request_icon from '/src/images/icons/commission_request.svg';

import mobile_logout_icon from '/src/images/icons/mobile_nav/mobile_logout_icon.svg';
import mobile_report_bug_icon from '/src/images/icons/mobile_nav/mobile_report_bug_icon.svg';
import mobile_settings_icon from '/src/images/icons/mobile_nav/mobile_settings_icon.svg';
import mobile_share_link_icon from '/src/images/icons/mobile_nav/mobile_share_link_icon.svg';
import mobile_suggest_idea_icon from '/src/images/icons/mobile_nav/mobile_suggest_idea_icon.svg';
import mobile_feedback_icon from '/src/images/icons/mobile_nav/mobile_feedback_icon.svg';
import mobile_terms_icon from '/src/images/icons/mobile_nav/mobile_terms_icon.svg';
import listing_icon_dark from '/src/images/icons/listings_icon_dark.svg';
import account_icon_dark from '/src/images/icons/account_icon_dark.svg';
import request_icon_dark from '/src/images/icons/request_icon_dark.svg';
import settingsIcon from '/src/images/icons/settingsIcon.svg';
import feedbackIcon from '/src/images/icons/feedback.svg';
import suggestIcon from '/src/images/icons/suggest.svg';
import reportBugIcon from '/src/images/icons/reportBug.svg';
import helpCenterIcon from '/src/images/icons/helpcenter.svg';
import termsIcon from '/src/images/icons/terms.svg';
import {FeedbackDrawer} from 'page.components/agents_components/AgentLayout/drawers/FeedbackDrawer';
import {MobileNavTab} from 'page.components/agents_components/AgentLayout/MobileNavTab';
import {SuggestAnIdeaDrawer} from 'page.components/agents_components/AgentLayout/drawers/SuggestIdeaDrawer';
import {ReportABugDrawer} from 'page.components/agents_components/AgentLayout/drawers/ReportABugDrawer';
import Wallet from 'page.components/agents_components/AgentLayout/Wallet';
import {ShareAgentLink} from 'page.components/agents_components/ShareAgentLink';
import RequestCommission from 'page.components/agents_components/requestCommission/RequestCommission';

export const dashboardTabs = [
  {
    iconSrc: listing_icon, //listing_icon,
    linkText: 'Listings',
    component: <Text>Listings</Text>,
    dark_iconSrc:  listing_icon_dark, //listing_icon_dark,
  },
  {
    iconSrc: users_icon,
    linkText: 'Referrals',
    component: <Text>Subscribers</Text>,
    dark_iconSrc: users_icon_dark,
  },

  {
    iconSrc: request_icon,
    linkText: 'Request',
    component: <Text>Request</Text>,
    dark_iconSrc: request_icon_dark,
  },
];

export const mobile_top_menu = [
  {
    iconSrc: mobile_listing_icon,
    linkText: 'Listings',
    name: 'Listings',
  },
  {
    iconSrc: mobile_subscribers_icon,
    linkText: 'Referrals',
    name: 'Subscribers',
  },
  {
    iconSrc: mobile_wallet_icon,
    linkText: 'Wallet',
    name: 'Wallet',
    component: (
      <Wallet>
        <MobileNavTab link={{iconSrc: mobile_wallet_icon, linkText: 'Wallet', name: 'Wallet'}} />
      </Wallet>
    ),
  },
  {
    iconSrc: mobile_commission_request_icon,
    linkText: 'Commission Request',
    name: 'Commission Request',
    component: (
      <RequestCommission>
        <MobileNavTab
          link={{
            iconSrc: mobile_commission_request_icon,
            linkText: 'Commission Request',
            name: 'Commission Request',
          }}
        />
      </RequestCommission>
    ),
  },
  {
    iconSrc: request_icon,
    linkText: 'Request',
    name: 'Request History',
  },
];

export const mobile_sub_menus = [
  {
    iconSrc: mobile_share_link_icon,
    linkText: 'Share Link',
    name: 'Share Link',
    component: (
      <ShareAgentLink>
        <MobileNavTab
          sub_menu
          link={{iconSrc: mobile_share_link_icon, linkText: 'Share Link', name: 'Share Link'}}
        />
      </ShareAgentLink>
    ),
  },
  {
    iconSrc: mobile_settings_icon,
    linkText: 'settings',
    name: 'Settings',
  },
  {
    iconSrc: mobile_feedback_icon,
    linkText: 'Feedback',
    name: 'Feedback',
    component: (
      <FeedbackDrawer>
        <MobileNavTab
          sub_menu
          link={{iconSrc: mobile_feedback_icon, linkText: 'Feedback', name: 'Feedback'}}
        />
      </FeedbackDrawer>
    ),
  },

  {
    iconSrc: mobile_suggest_idea_icon,
    linkText: 'Suggest',
    name: 'Suggest an Idea',
    component: (
      <SuggestAnIdeaDrawer>
        <MobileNavTab
          sub_menu
          link={{iconSrc: mobile_suggest_idea_icon, linkText: 'Suggest', name: 'Suggest an Idea'}}
        />
      </SuggestAnIdeaDrawer>
    ),
  },
  {
    iconSrc: mobile_report_bug_icon,
    linkText: 'Report-bug',
    name: 'Report a Bug',
    component: (
      <ReportABugDrawer>
        <MobileNavTab
          sub_menu
          link={{iconSrc: mobile_report_bug_icon, linkText: 'Report-bug', name: 'Report a Bug'}}
        />
      </ReportABugDrawer>
    ),
  },
  {
    iconSrc: mobile_terms_icon,
    linkText: 'Terms',
    name: 'Terms of use',
  },
];

export const subMenus = [
  {
    iconSrc: settingsIcon,
    linkText: 'settings',
    name: 'Settings',
    dark_iconSrc: settingsIcon,
  },
  {
    iconSrc: feedbackIcon,
    linkText: 'Feedback',
    name: 'Feedback',
    dark_iconSrc: feedbackIcon,
  },

  {
    iconSrc: suggestIcon,
    linkText: 'Suggest',
    name: 'Suggest an Idea',
    dark_iconSrc: suggestIcon,
  },
  {
    iconSrc: reportBugIcon,
    linkText: 'Report-bug',
    name: 'Report a Bug',
    dark_iconSrc: reportBugIcon,
  },
  {
    iconSrc: helpCenterIcon,
    linkText: 'Help',
    name: 'Help Center',
    dark_iconSrc: helpCenterIcon,
  },
  {
    iconSrc: termsIcon,
    linkText: 'Terms',
    name: 'Terms of use',
    dark_iconSrc: termsIcon,
  },
];

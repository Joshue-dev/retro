import Router from 'next/router';

const openExternalUrl = link => {
  window.open(link, '_blank');
};

export default openExternalUrl;

// src/services/dashboard/getDashboardData.js
import { getUserCount } from './getUserCount';
import { getServiceProviderCount } from './getServiceProviderCount';
import { getPageViews } from './getPageViews';
import { getNewApplications } from './getNewApplications';

export const getDashboardData = async () => {
  const [users, providers, views, applications] = await Promise.all([
    getUserCount(),
    getServiceProviderCount(),
    getPageViews(),
    getNewApplications(),
  ]);

  return {
    users,
    providers,
    views,
    applications,
  };
};

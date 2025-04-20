import { getUserCount } from './getUserCount';
import { getServiceProviderCount } from './getServiceProviderCount';
import { getPageViews } from './getPageViews';
import { getNewApplications } from './getNewApplications';
import { getTopServices } from './getTopServices';
import { getRevenueOverview } from './getRevenueOverview';

export const getDashboardData = async () => {
  const [
    users,
    providers,
    views,
    applications,
    services,
    revenue,
  ] = await Promise.all([
    getUserCount(),
    getServiceProviderCount(),
    getPageViews(),
    getNewApplications(),
    getTopServices(),
    getRevenueOverview(),
  ]);

  return {
    users,
    providers,
    views,
    applications,
    services,
    revenue,
  };
};

import { useEffect, useState } from 'react';

import statistics from '~/data/mock-statistics.json';
import users from '~/data/mock-users.json';

import { ChartType } from '~/types/domain';
import { MockApiResultMap, RequestEndpoint, StoreModelName } from '~/types/providers';

const MAX_TIMEOUT = 1000 * 5; // 5 seconds

/**
 * Custom hook to wrap the mock API request logic.
 * This holds data, loading and error state and automatically (re)fetches data when the key or store name changes.
 * 
 * @param storeFor The name of the store, which will determine the type of data being fetched
 * @param key "endpoint" or cache key for the request
 * @returns 
 */
export default function useMockApi<TStoreFor extends StoreModelName>(
  storeFor: TStoreFor,
  key: RequestEndpoint<TStoreFor>
) {
  const [data, setData] = useState<Record<string, MockApiResultMap[TStoreFor]>>({});
  const [loading, setLoading] = useState(true); // To avoid child components using invalid provider data, the loading state is default to true
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (data?.[key]) return; // If data for the given key is already present, do not re-fetch
    if (!loading) setLoading(true);

    setError(null);
    mockApiRequest(storeFor, key)
      .then(data => setData(prev => ({ ...prev, [key]: data })))
      .catch(setError)
      .finally(() => setLoading(false));

  }, [key, storeFor]);

  // Return error first to force the developer to handle it
  return [error, data[key] ?? [], loading] as const;
}

/**
 * Internal function to mock an API request.
 * Ideally, this functionality is handled by the backend.
 * 
 * @param storeFor The name of the store, which will determine the type of data being fetched
 * @param key Cache key aka request endpoint
 * @returns Array of returned store model, based on the store name
 */
async function mockApiRequest<TStoreFor extends StoreModelName>(
  storeFor: TStoreFor,
  key: RequestEndpoint<TStoreFor>
): Promise<MockApiResultMap[TStoreFor]> {
  //  Timeout variable(s) to simulate network latency for demonstration purposes
  const timeout = Math.random() * MAX_TIMEOUT;
  // const timeout = storeFor !== 'users' ? 0 : 20 * 1000; // 20 seconds

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, timeout));

  switch (storeFor) {
    case 'statistics': {
      // To support mocking a filter, the key can include a query parameter, i.e. "?type=bar", to filter by chart type
      if (key.includes('?')) {
        const type = key.split('=')[1] as ChartType;
        const filtered = statistics.filter(stat => stat.type === type);
        return filtered as MockApiResultMap[TStoreFor];
      }

      return statistics as MockApiResultMap[TStoreFor];
    }
    case 'users': {
      const mappedUsers = users
        .map(user => ({
          ...user,
          lastLoginTimestamp: Date.now() // Due to mocked data being static, the login timestamp is updated to the current time
        }));

      const displayName = key.split('=')[1].toLowerCase();
      if (displayName) {
        const filtered = mappedUsers.find(user => user.displayName.toLowerCase().includes(displayName));
        return filtered as MockApiResultMap[TStoreFor];
      }

      throw new Error('No display name provided');
    }
  }
}
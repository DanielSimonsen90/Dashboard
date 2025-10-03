import { ChartType } from 'chart.js';
import { create, StateCreator } from 'zustand';

import statistics from '~/data/mock-statistics.json';
import users from '~/data/mock-users.json';
import { BaseStore, MockApiResultMap, RequestEndpoint, StoreModelName } from './BaseStoreTypes';

/**
 * For skeleton demonstration purposes (and mocking API call promises), a mocked API call will take 5 seconds at most
 */
const MAX_TIMEOUT = 1000 * 5; // 5 seconds

/**
 * Using node package "zustand", this function creates a base store with caching and request capabilities.
 * It is intended to be a generic store that can be extended for specific data types.
 * It should not be used on its own, and it is therefore not exported through ~/stores/index.ts
 * 
 * @param storeFor The name of the store, which will determine the type of data being fetched
 * @param initializer Additional state and actions to initialize the extended store with
 * @returns The created store hook
 */
export const createBaseStore = <
  TStore extends BaseStore<TStoreModelName>,
  TStoreModelName extends StoreModelName,
  TCachedItems extends MockApiResultMap[TStoreModelName] = MockApiResultMap[TStoreModelName]
>(
  storeFor: TStoreModelName,
  initializer?: StateCreator<Omit<TStore, keyof BaseStore<TStoreModelName>>, [], [], Omit<TStore, keyof BaseStore<TStoreModelName>>>
) => {
  return create<TStore>((getState, setState, store) => {
    // Initialize any additional state and actions provided by the initializer function
    const initialized = initializer?.(getState, setState, store) ?? {} as TStore;

    return {
      ...initialized,

      __cache: new Map<string, TCachedItems>(),

      async request(key: RequestEndpoint<TStoreModelName>) {
        // Check cache
        if (this.__cache.has(key)) return this.__cache.get(key)!;

        // If request key is not cached, make a mock API request and update cache accordingly
        const item = await mockApiRequest(storeFor, key) as TCachedItems;
        this.__cache.set(key, item);

        return item;
      }
    } as any as TStore;
  });
};

export default createBaseStore;

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
  // const timeout = storeFor === 'users' ? 0 : 20 * 1000; // 20 seconds

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
        const filtered = mappedUsers.filter(user => user.displayName.toLowerCase().includes(displayName));
        return filtered as MockApiResultMap[TStoreFor];
      }

      return mappedUsers as MockApiResultMap[TStoreFor];
    }
  }
}
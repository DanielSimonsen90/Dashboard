import { ChartType } from 'chart.js';
import { create, StateCreator } from 'zustand';

import statistics from '~/data/mock-statistics.json'
import users from '~/data/mock-users.json'
import { StatisticEntry, User } from '~/types/domain';

const MAX_TIMEOUT = 10 * 1000; // 10 seconds

type StoreModelName = 'statistics' | 'users';
type RequestEndpoint<TStoreModelName extends StoreModelName> = TStoreModelName extends 'statistics' 
  ? `/api/statistics` | `/api/statistics?type=${ChartType}`
  : `/api/users?displayName=${string}`;

export interface BaseStore<TStoreFor extends StoreModelName> {
  __cache: Map<string, MockApiResultMap[TStoreFor]>;

  request(key: RequestEndpoint<TStoreFor>): Promise<MockApiResultMap[TStoreFor]>;
}

export const createBaseStore = <
  TStoreModelName extends StoreModelName, 
  TCachedItems extends MockApiResultMap[TStoreModelName]
>(
  storeFor: TStoreModelName,
  initializer: StateCreator<BaseStore<TStoreModelName>, [], [], BaseStore<TStoreModelName>>
) => {
  return create<BaseStore<TStoreModelName>>((getState, setState, store) => {
    const initialized = initializer(getState, setState, store);

    return {
      ...initialized,

      __cache: new Map<string, TCachedItems>(),

      async request(key: RequestEndpoint<TStoreModelName>) {
        if (this.__cache.has(key)) return this.__cache.get(key)!;

        const item = await mockApiRequest(storeFor, key) as TCachedItems;
        this.__cache.set(key, item);
        return item;
      }
    }
  });
}

type MockApiResultMap = {
  statistics: StatisticEntry[];
  users: User[];
}

async function mockApiRequest<TStoreFor extends StoreModelName>(storeFor: TStoreFor, key: RequestEndpoint<TStoreFor>): Promise<MockApiResultMap[TStoreFor]> {
  await new Promise(resolve => setTimeout(resolve, Math.random() * MAX_TIMEOUT));

  switch (storeFor) {
    case 'statistics': {
      if (key.includes('?')) {
        const type = key.split('=')[1] as ChartType;
        const filtered = statistics.filter(stat => stat.type === type);
        return filtered as MockApiResultMap[TStoreFor];
      }

      return statistics as MockApiResultMap[TStoreFor];
    }
    case 'users': {
      const displayName = key.split('=')[1].toLowerCase();
      if (displayName) {
        const filtered = users.filter(user => user.displayName.toLowerCase().includes(displayName));
        return filtered as MockApiResultMap[TStoreFor];
      }

      return users as MockApiResultMap[TStoreFor];
    }
  }
}
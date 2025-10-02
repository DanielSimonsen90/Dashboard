interface BaseEntity {
  id: string;
}

export interface User extends BaseEntity {
  displayName: string;
  avatarUrl: string;
  lastLoginTimestamp: number;
}

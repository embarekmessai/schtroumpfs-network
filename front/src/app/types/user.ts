export interface User {
  username : string | null,
  fullname : string | null,
  password : string | null,
  confirme_password ?: string | null
};

// User role interface

export type UserProfile = {
  roles : {name ?: string | null}[],
  user: {
    username ?: string | null,
    fullname ?: string | null,
    role ?: string | null,
    password ?: string | null,
  },
};

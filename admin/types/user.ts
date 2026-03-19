export type Permissions = {
  news: {
    create: boolean;
    edit: boolean;
    delete: boolean;
    publish: boolean;
  };
  category: {
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  user: {
    changeRole: boolean;
    managePermissions: boolean;
  };
};

export type User = {
  _id: string;

  name: string;
  email: string;

  role: "USER" | "EDITOR" | "ADMIN";

  permissions: Permissions;

  isActive: boolean;

  avatarUrl?: {
    url: string;
    publicId: string;
  };

  createdAt?: string;
  updatedAt?: string;
};
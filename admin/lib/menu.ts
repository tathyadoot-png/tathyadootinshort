import {
  LayoutDashboard,
  Newspaper,
  Users,
  Tag,
} from "lucide-react";

export const sidebarMenu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "News",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
    icon: Tag,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
];

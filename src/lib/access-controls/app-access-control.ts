import { createAccessControl } from "better-auth/plugins/access";

const appDashBoard = ["view"] as const;

const blogs = [
  "insert",
  "update",
  "export",
  "go-live",
  "public_view",
  "delete",
  "view_all",
] as const;

const support = ["*"] as const;

const survey = [
  "view",
  "insert",
  "update",
  "analyze",
  "go-live",
  "delete",
] as const;

const userManagement = ["insert", "*", "update", "invite", "delete"] as const;

const property = [
  "insert",
  "update",
  "delete",
  "verify",
  "getOwner",
  "view_all",
] as const;
const userRoleManagement = ["*"] as const;

const subscription = ["create", "viewOwn", "delete", "viewAll"] as const;

const appAC = createAccessControl({
  appDashBoard,
  blogs,
  support,
  survey,
  userManagement,
  userRoleManagement,
  property,
  subscription,
});

const superAdminRole = appAC.newRole({
  appDashBoard: ["view"],
  blogs: ["insert", "update", "export", "go-live", "view_all", "public_view"],
  support: ["*"],
  survey: ["insert", "update", "analyze", "go-live", "view", "delete"],
  userManagement: ["*"],
  userRoleManagement: ["*"],
  property: ["view_all", "delete", "getOwner", "insert", "update"],
  subscription: ["create", "viewAll", "delete"],
});

const contentAdminRole = appAC.newRole({
  appDashBoard: ["view"],
  survey: ["insert", "update", "analyze", "go-live", "view"],
  blogs: ["insert", "update", "go-live", "export", "public_view", "delete"],
});

const contentCreatorRole = appAC.newRole({
  appDashBoard: ["view"],
  survey: ["insert", "update", "view"],
  blogs: ["insert", "update", "delete", "public_view"],
});

const hostUserRole = appAC.newRole({
  property: ["insert", "update"],
});

const endUserRole = appAC.newRole({
  subscription: ["create", "delete", "viewOwn"],
});

export {
  appAC,
  contentAdminRole,
  contentCreatorRole,
  endUserRole,
  hostUserRole,
  superAdminRole,
};

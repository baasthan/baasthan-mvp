import { createAccessControl } from "better-auth/plugins/access";

const rooms = ["view", "view_all", "add_tenant", "remove_tenant"] as const;

const orgAcc = createAccessControl({ rooms });

const tenantRole = orgAcc.newRole({ rooms: ["view", "view_all"] });
const ownerRole = orgAcc.newRole({
  rooms: ["view", "add_tenant", "remove_tenant", "view_all"],
});

export { orgAcc, ownerRole, tenantRole };

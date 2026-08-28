import { SetMetadata } from '@nestjs/common';

export const PERM_KEY = 'requiredAdminPerm';

/**
 * Marks a route as requiring a specific admin feature-flag (see
 * profiles.admin_perms). super_admin bypasses the check in PermissionGuard.
 */
export const RequirePerm = (perm: string) => SetMetadata(PERM_KEY, perm);

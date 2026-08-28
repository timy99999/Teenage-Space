import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { SuperAdminGuard } from '../auth/super-admin.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { RequirePerm } from '../auth/require-perm.decorator';
import { CurrentUser } from '../auth/supabase-user.decorator';
import type { User } from '@supabase/supabase-js';
import { UsersAdminService } from './users-admin.service';
import { BanUserDto } from './dto/ban-user.dto';
import { SetRoleDto } from './dto/set-role.dto';
import { SetPermsDto } from './dto/set-perms.dto';

@Controller('admin/users')
@UseGuards(SupabaseAuthGuard, AdminGuard, PermissionGuard)
export class UsersAdminController {
  constructor(private readonly users: UsersAdminService) {}

  @Get()
  @RequirePerm('users')
  list() {
    return this.users.listUsers();
  }

  @Get('admins')
  @UseGuards(SuperAdminGuard)
  listAdmins() {
    return this.users.listAdmins();
  }

  @Get(':id')
  @RequirePerm('users')
  get(@Param('id') id: string) {
    return this.users.getUser(id);
  }

  @Post(':id/ban')
  @RequirePerm('users')
  ban(@Param('id') id: string, @Body() dto: BanUserDto, @CurrentUser() user: User) {
    return this.users.ban(id, user.id, dto);
  }

  @Post(':id/unban')
  @RequirePerm('users')
  unban(@Param('id') id: string) {
    return this.users.unban(id);
  }

  @Post(':id/role')
  @UseGuards(SuperAdminGuard)
  setRole(@Param('id') id: string, @Body() dto: SetRoleDto, @CurrentUser() user: User) {
    return this.users.setRole(id, user.id, dto.role);
  }

  @Patch(':id/perms')
  @UseGuards(SuperAdminGuard)
  setPerms(@Param('id') id: string, @Body() dto: SetPermsDto) {
    return this.users.setPerms(id, dto.perms);
  }
}

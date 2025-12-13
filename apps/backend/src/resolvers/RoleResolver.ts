import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'
import { Role } from './types/Role'
import { Permission } from './types/Permission'
import type { Context } from '@/utils/graphql'

@Resolver(() => Role)
export class RoleResolver {
  @FieldResolver(() => [Permission])
  async permissions(@Root() role: Role, @Ctx() ctx: Context) {
    const data = await ctx.prisma.role.findUnique({
      where: { role_id: role.role_id },
      include: { role_permissions: { include: { permission: true } } },
    })
    return data?.role_permissions.map((rp) => rp.permission) ?? []
  }
}

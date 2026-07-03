<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Eye, FileEdit, Headset, Plus, Shield, UserCog } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { roles, permissionGroups } from '@/data/mock/roles.mock'
import type { Role } from '@/types/role'

const route = useRoute()
const selectedRole = ref<Role | null>(null)
const showAddRoleModal = ref(false)
const showEditRoleModal = ref(false)
const editingRole = ref<Role | null>(null)

const newRoleName = ref('')
const newRoleDescription = ref('')

const roleIconMap: Record<string, typeof Shield> = {
  Shield,
  UserCog,
  FileEdit,
  Headset,
  Eye,
}

function openDetail(role: Role) {
  selectedRole.value = role
}

function closeDetail() {
  selectedRole.value = null
}

function openEdit(role: Role) {
  editingRole.value = role
  showEditRoleModal.value = true
}

function openAdd() {
  newRoleName.value = ''
  newRoleDescription.value = ''
  showAddRoleModal.value = true
}

function addRole() {
  if (!newRoleName.value.trim()) return
  roles.push({
    id: `role-${Date.now()}`,
    name: newRoleName.value.trim(),
    description: newRoleDescription.value.trim() || '',
    icon: 'Shield',
    user_count: 0,
    permissions: [],
    created_at: '2026-06-14',
  })
  showAddRoleModal.value = false
}

function togglePermission(role: Role, permKey: string) {
  const idx = role.permissions.indexOf(permKey)
  if (idx === -1) role.permissions.push(permKey)
  else role.permissions.splice(idx, 1)
}

function groupPermissions(perms: typeof permissionGroups) {
  const groups: { group: string; perms: typeof permissionGroups }[] = []
  for (const perm of perms) {
    let g = groups.find((g) => g.group === perm.group)
    if (!g) {
      g = { group: perm.group, perms: [] }
      groups.push(g)
    }
    g.perms.push(perm)
  }
  return groups
}

const groupedPermissions = groupPermissions(permissionGroups)


function statsRoles() {
  return [
    { label: 'Total Roles', value: roles.length },
    { label: 'Permissions', value: permissionGroups.length },
    { label: 'Total Users', value: roles.reduce((sum, r) => sum + r.user_count, 0) },
  ]
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Roles & Permissions" description="Manage role-based access and permission groups." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openAdd">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Create Role
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="stat in statsRoles()" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="role in roles" :key="role.id" class="rounded-card border border-app-borderSoft bg-app-card p-5 shadow-card">
        <div class="mb-4 flex items-start justify-between">
          <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
            <component :is="roleIconMap[role.icon] || Shield" class="h-6 w-6" aria-hidden="true" />
          </span>
          <AppBadge variant="neutral">{{ role.user_count }} users</AppBadge>
        </div>
        <h3 class="app-card-title">{{ role.name }}</h3>
        <p class="mt-1 text-sm text-app-textSecondary">{{ role.description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <AppButton variant="secondary" size="sm" @click="openDetail(role)">View Permissions</AppButton>
          <AppButton variant="secondary" size="sm" @click="openEdit(role)">Edit</AppButton>
        </div>
      </div>
    </div>

    <AppModal :open="Boolean(selectedRole)" :title="selectedRole ? `${selectedRole.name} Permissions` : ''" @close="closeDetail">
      <div v-if="selectedRole" class="grid gap-4">
        <p class="text-sm text-app-textSecondary">{{ selectedRole.description }}</p>
        <div v-for="group in groupedPermissions" :key="group.group">
          <p class="app-label-text mb-2">{{ group.group }}</p>
          <div class="grid gap-2">
            <div v-for="perm in group.perms" :key="perm.id" class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-sm text-app-text">{{ perm.label }}</span>
              <span class="text-xs" :class="selectedRole.permissions.includes(perm.key) ? 'text-success-700 font-medium' : 'text-app-textMuted'">
                {{ selectedRole.permissions.includes(perm.key) ? 'Granted' : '—' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppModal>

    <AppModal :open="showEditRoleModal && Boolean(editingRole)" :title="editingRole ? `Edit ${editingRole.name}` : ''" @close="showEditRoleModal = false">
      <div v-if="editingRole" class="grid gap-4">
        <p class="text-sm text-app-textSecondary">Toggle permissions for this role.</p>
        <div v-for="group in groupedPermissions" :key="group.group">
          <p class="app-label-text mb-2">{{ group.group }}</p>
          <div class="grid gap-2">
            <div v-for="perm in group.perms" :key="perm.id" class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-sm text-app-text">{{ perm.label }}</span>
              <button
                class="relative inline-flex h-6 w-10 items-center rounded-full transition-colors"
                :class="editingRole.permissions.includes(perm.key) ? 'bg-primary-600' : 'bg-app-border'"
                type="button"
                role="switch"
                :aria-checked="editingRole.permissions.includes(perm.key)"
                @click="togglePermission(editingRole, perm.key)"
              >
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="editingRole.permissions.includes(perm.key) ? 'translate-x-5' : 'translate-x-1'" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <AppButton @click="showEditRoleModal = false">Save Changes</AppButton>
          <AppButton variant="secondary" type="button" @click="showEditRoleModal = false">Cancel</AppButton>
        </div>
      </div>
    </AppModal>

    <AppModal :open="showAddRoleModal" title="Create Role" @close="showAddRoleModal = false">
      <form class="grid gap-4" @submit.prevent="addRole">
        <AppInput id="role-name" v-model="newRoleName" label="Role name" placeholder="Enter role name" required />
        <label class="app-form-group" for="role-description">
          <span class="app-label">Description</span>
          <textarea id="role-description" v-model="newRoleDescription" class="app-textarea" placeholder="Describe this role's purpose..." />
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Role</AppButton>
          <AppButton variant="secondary" type="button" @click="showAddRoleModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>

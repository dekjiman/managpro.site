<template>
  <div>
    <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Color System</h3>
    <div class="grid grid-cols-5 gap-2">
      <div
        v-for="(group, name) in colorGroups"
        :key="name"
        class="flex flex-col items-center gap-1"
      >
        <div
          v-for="swatch in group"
          :key="swatch.shade"
          :style="{ backgroundColor: swatch.value }"
          class="h-6 w-full rounded"
        />
        <span class="mt-1 text-xs font-medium text-gray-500">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorGroups = {
  Primary: [
    { shade: 50, value: '#eff6ff' },
    { shade: 100, value: '#dbeafe' },
    { shade: 200, value: '#bfdbfe' },
    { shade: 300, value: '#93c5fd' },
    { shade: 400, value: '#60a5fa' },
    { shade: 500, value: '#066fd1' },
    { shade: 600, value: '#055bb0' },
    { shade: 700, value: '#04478f' },
    { shade: 800, value: '#03336e' },
    { shade: 900, value: '#021f4d' },
  ],
  Success: [
    { shade: 50, value: '#f0fdf4' },
    { shade: 100, value: '#dcfce7' },
    { shade: 200, value: '#bbf7d0' },
    { shade: 300, value: '#86efac' },
    { shade: 400, value: '#4ade80' },
    { shade: 500, value: '#2fb344' },
    { shade: 600, value: '#27963a' },
    { shade: 700, value: '#1f7930' },
    { shade: 800, value: '#175c26' },
    { shade: 900, value: '#0f3f1c' },
  ],
  Info: [
    { shade: 50, value: '#eff6ff' },
    { shade: 100, value: '#dbeafe' },
    { shade: 200, value: '#bfdbfe' },
    { shade: 300, value: '#93c5fd' },
    { shade: 400, value: '#60a5fa' },
    { shade: 500, value: '#4299e1' },
    { shade: 600, value: '#3182ce' },
    { shade: 700, value: '#2b6cb0' },
    { shade: 800, value: '#2c5282' },
    { shade: 900, value: '#2a4365' },
  ],
  Warning: [
    { shade: 50, value: '#fffbeb' },
    { shade: 100, value: '#fef3c7' },
    { shade: 200, value: '#fde68a' },
    { shade: 300, value: '#fcd34d' },
    { shade: 400, value: '#fbbf24' },
    { shade: 500, value: '#f59f00' },
    { shade: 600, value: '#d97706' },
    { shade: 700, value: '#b45309' },
    { shade: 800, value: '#92400e' },
    { shade: 900, value: '#78350f' },
  ],
  Danger: [
    { shade: 50, value: '#fef2f2' },
    { shade: 100, value: '#fee2e2' },
    { shade: 200, value: '#fecaca' },
    { shade: 300, value: '#fca5a5' },
    { shade: 400, value: '#f87171' },
    { shade: 500, value: '#d63939' },
    { shade: 600, value: '#b91c1c' },
    { shade: 700, value: '#991b1b' },
    { shade: 800, value: '#7f1d1d' },
    { shade: 900, value: '#63171b' },
  ],
}
</script>

<script setup lang="ts">
import AppChartCard from './AppChartCard.vue'
defineProps<{ title: string; series: { name: string; data: number[] }[] }>()
</script>
<template><AppChartCard :title="title" type="area" :series="series" /></template>

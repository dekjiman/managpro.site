<script setup lang="ts">
import AppChartCard from './AppChartCard.vue'
defineProps<{ title: string; series: number[] }>()
</script>
<template><AppChartCard :title="title" type="radialBar" :series="series" /></template>

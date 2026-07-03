<script setup lang="ts">
import AppChartCard from './AppChartCard.vue'
defineProps<{ title: string; labels: string[]; series: number[] }>()
</script>
<template><AppChartCard :title="title" type="donut" :labels="labels" :series="series" /></template>

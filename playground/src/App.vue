<template>
  <div class="container mx-auto p-10">
    <h3 class="text-2xl font-semibold">Solid Button</h3>
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <HButton>Default</HButton>
      <HButton primary>Primary</HButton>
      <HButton danger>Danger</HButton>
      <HButton warning>Warning</HButton>
      <HButton success>Success</HButton>
      <HButton info>Info</HButton>
    </div>
    <h3 class="text-2xl font-semibold mt-8">Outline Button</h3>
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <HButton outline>Default</HButton>
      <HButton outline primary>Primary</HButton>
      <HButton outline danger>Danger</HButton>
      <HButton outline warning>Warning</HButton>
      <HButton outline success>Success</HButton>
      <HButton outline info>Info</HButton>
    </div>
    <h3 class="text-2xl font-semibold mt-8">Ghost Button</h3>
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <HButton ghost>Default</HButton>
      <HButton ghost primary>Primary</HButton>
      <HButton ghost danger>Danger</HButton>
      <HButton ghost warning>Warning</HButton>
      <HButton ghost success>Success</HButton>
      <HButton ghost info>Info</HButton>
    </div>
    <h3 class="text-2xl font-semibold mt-8">States</h3>
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <HButton disabled primary>Disabled</HButton>
      <HButton loading primary>Loading</HButton>
      <HButton :icons="{ prefix: 'fluent:add-circle-12-regular' }">Prefix</HButton>
      <HButton
        :icons="{ prefix: 'fluent:add-circle-12-regular', suffix: 'fluent:arrow-right-16-filled' }"
        small
        >Prefix</HButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { heartGlobalKey, type HeartTheme } from '../../dist'

const heart = inject<{ theme: HeartTheme }>(heartGlobalKey)
</script>

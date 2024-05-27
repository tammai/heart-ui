<template>
  <main class="container p-10 mx-auto">
    <h1 class="heading-1">Heart UI Playground</h1>
    <h2 class="heading-2 mt-10">Button</h2>
    <h3 class="heading-3 mt-8">Main</h3>
    <div class="flex gap-4 mt-4">
      <HButton>Default</HButton>
      <HButton outline>Outline</HButton>
      <HButton semi>Semi</HButton>
      <HButton ghost>Ghost</HButton>
      <HButton disabled>Disabled</HButton>
      <HButton busy>Busy</HButton>
    </div>
    <div class="flex gap-4 mt-4">
      <HButton primary>Default</HButton>
      <HButton primary outline>Outline</HButton>
      <HButton primary semi>Semi</HButton>
      <HButton primary ghost>Ghost</HButton>
      <HButton primary disabled>Disabled</HButton>
      <HButton primary busy>Busy</HButton>
    </div>

    <h3 class="heading-3 mt-8">Context</h3>
    <div class="flex gap-4 mt-4">
      <HButton danger>Default</HButton>
      <HButton danger outline>Outline</HButton>
      <HButton danger semi>Semi</HButton>
      <HButton danger ghost>Ghost</HButton>
      <HButton danger disabled>Disabled</HButton>
      <HButton danger busy>Busy</HButton>
    </div>
    <div class="flex gap-4 mt-4">
      <HButton warning>Default</HButton>
      <HButton warning outline>Outline</HButton>
      <HButton warning semi>Semi</HButton>
      <HButton warning ghost>Ghost</HButton>
      <HButton warning disabled>Disabled</HButton>
      <HButton warning busy>Busy</HButton>
    </div>
    <div class="flex gap-4 mt-4">
      <HButton success>Default</HButton>
      <HButton success outline>Outline</HButton>
      <HButton success semi>Semi</HButton>
      <HButton success ghost>Ghost</HButton>
      <HButton success disabled>Disabled</HButton>
      <HButton success busy>Busy</HButton>
    </div>
    <div class="flex gap-4 mt-4">
      <HButton info>Default</HButton>
      <HButton info outline>Outline</HButton>
      <HButton info semi>Semi</HButton>
      <HButton info ghost>Ghost</HButton>
      <HButton info disabled>Disabled</HButton>
      <HButton info busy>Busy</HButton>
    </div>

    <h3 class="heading-3 mt-8">Rounded</h3>
    <div class="flex gap-4 mt-4">
      <HButton rounded>Default</HButton>
      <HButton rounded outline>Outline</HButton>
      <HButton rounded semi>Semi</HButton>
      <HButton rounded ghost>Ghost</HButton>
      <HButton rounded disabled>Disabled</HButton>
      <HButton rounded busy>Busy</HButton>
    </div>

    <h3 class="heading-3 mt-8">Sizes</h3>
    <div class="flex gap-4 mt-4">
      <HButton large>Large</HButton>
      <HButton>Default</HButton>
      <HButton small>Small</HButton>
    </div>

    <h3 class="heading-3 mt-8">With icons</h3>
    <div class="flex gap-4 mt-4">
      <HButton
        :icons="{ prefix: 'fluent:arrow-left-16-regular' }"
        prefix-icon="fluent:arrow-right-16-regular"
        >Prefix</HButton
      >
      <HButton>Default</HButton>
      <HButton>Small</HButton>
    </div>
  </main>
</template>

<template>
  <HApp>
    <HLayout :slot-sizes="{ left: 200 }" class="min-h-screen">
      <NuxtLoadingIndicator color="var(--color-primary)" />
      <template #left>
        <ClientOnly>
          <div class="sticky top-0 flex h-screen flex-col bg-neutral-200 p-5">
            <div class="flex items-center gap-2">
              <NuxtImg src="/heart-ui.svg" class="h-12" />
            </div>

            <div class="mt-6">
              <h6 class="mb-1 tracking-wider text-neutral-500 uppercase">
                Container
              </h6>
              <a
                v-for="item in ['Layout', 'Card']"
                :key="item"
                :href="`#${item.toLowerCase()}`"
                class="block cursor-pointer rounded-r border-l border-neutral-300 pl-2.5 leading-8 text-neutral-700 transition-all"
                :class="[
                  $route.hash === `#${item.toLowerCase()}`
                    ? 'border-primary-500 text-primary-600 bg-white/50 font-medium'
                    : 'hover:border-neutral-400 hover:bg-white/25 hover:text-neutral-950',
                ]"
              >
                {{ item }}
              </a>
            </div>
            <div class="mt-6">
              <h6 class="mb-1 tracking-wider text-neutral-500 uppercase">
                Form
              </h6>
              <a
                v-for="item in [
                  'Button',
                  'Input',
                  'Select',
                  'Radio',
                  'Checkbox',
                ]"
                :key="item"
                :href="`#${item.toLowerCase()}`"
                class="block cursor-pointer rounded-r border-l border-neutral-300 pl-2.5 leading-8 text-neutral-700 transition-all"
                :class="[
                  $route.hash === `#${item.toLowerCase()}`
                    ? 'border-primary-500 text-primary-600 bg-white/50 font-medium'
                    : 'hover:border-neutral-400 hover:bg-white/25 hover:text-neutral-950',
                ]"
              >
                {{ item }}
              </a>
            </div>
            <div
              class="mx-auto mt-auto flex gap-0.25 rounded-full bg-neutral-300 p-0.5"
            >
              <div
                v-for="item in ['system', 'light', 'dark']"
                :key="item"
                class="flex h-6 w-6 cursor-pointer flex-col items-center justify-center rounded-full text-neutral-600 transition-all"
                :class="{
                  'bg-white/50 text-neutral-950':
                    $colorMode.preference === item,
                  'text-neutral-950 hover:bg-white/30':
                    $colorMode.preference !== item,
                }"
                @click="$colorMode.preference = item"
              >
                <Icon
                  :name="
                    (item === 'light' && 'fluent:weather-sunny-16-regular') ||
                    (item === 'dark' && 'fluent:weather-moon-16-regular') ||
                    'fluent:desktop-16-regular'
                  "
                  size="16"
                />
              </div>
            </div>
          </div>
        </ClientOnly>
      </template>

      <div class="container mx-auto p-5 lg:p-8">
        <div class="flex h-60 flex-col items-center justify-center">
          <h1 class="!font-bold">Heart UI</h1>
          <p class="max-w-140 text-center text-lg text-neutral-600">
            The collection of customizable UI components built for Nuxt
          </p>
          <a href="https://github.com/tammai/heart-ui" target="_blank">
            <Icon
              name="mdi:github"
              size="24"
              class="mt-2 cursor-pointer text-neutral-700 hover:text-neutral-950"
            />
          </a>
        </div>

        <!-- Layout -->
        <h3 id="layout" class="mt-8">Layout</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic
          adipisci nesciunt, est libero voluptatibus neque aliquam soluta
          quaerat, nisi vitae nostrum ipsum accusantium. Obcaecati nobis
          consequuntur quibusdam qui temporibus!
        </p>

        <h4 class="mt-4 mb-1">Default layout</h4>
        <HLayout
          class="rounded border-1 border-pink-300 bg-pink-200 dark:border-pink-600 dark:bg-pink-700"
        >
          <template #top>
            <div
              class="flex h-full flex-col items-center justify-center border-b-1 border-pink-300 dark:border-pink-600"
            >
              Header
            </div>
          </template>
          <template #left>
            <div
              class="flex h-full flex-col items-center justify-center border-r-1 border-pink-300 dark:border-pink-600"
            >
              Aside
            </div>
          </template>
          <div
            class="flex h-60 flex-col items-center justify-center bg-pink-100 dark:bg-pink-900"
          >
            Body
          </div>
          <template #bottom>
            <div
              class="flex h-full flex-col items-center justify-center border-t-1 border-pink-300 dark:border-pink-600"
            >
              Footer
            </div>
          </template>
        </HLayout>

        <h4 class="mt-4 mb-1">Two columns</h4>
        <HLayout class="rounded border-1 border-neutral-200 bg-white">
          <template #left>
            <div
              class="flex h-full flex-col items-center justify-center border-r-1 border-neutral-200"
            >
              Aside
            </div>
          </template>
          <div class="flex h-76 flex-col items-center justify-center">Body</div>
        </HLayout>

        <h4 class="mt-4 mb-1">One column</h4>
        <HLayout class="rounded border-1 border-neutral-200 bg-white">
          <template #top>
            <div
              class="flex h-full flex-col items-center justify-center border-b-1 border-neutral-200"
            >
              Header
            </div>
          </template>
          <div class="flex h-60 flex-col items-center justify-center">Body</div>
          <template #bottom>
            <div
              class="flex h-full flex-col items-center justify-center border-t-1 border-neutral-200"
            >
              Footer
            </div>
          </template>
        </HLayout>

        <h4 class="mt-4 mb-1">Nested containers</h4>
        <HLayout class="rounded border-1 border-neutral-200 bg-white">
          <template #left>
            <div
              class="flex h-full flex-col items-center justify-center border-r-1 border-neutral-200"
            >
              Aside
            </div>
          </template>
          <HLayout>
            <template #top>
              <div
                class="flex h-full flex-col items-center justify-center border-b-1 border-neutral-200"
              >
                Header
              </div>
            </template>
            <div class="flex h-60 flex-col items-center justify-center">
              Body
            </div>
            <template #bottom>
              <div
                class="flex h-full flex-col items-center justify-center border-t-1 border-neutral-200"
              >
                Footer
              </div>
            </template>
          </HLayout>
        </HLayout>

        <!-- Card -->
        <h3 id="card" class="mt-8">Card</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur
          omnis consequatur nam sequi porro dolorum eligendi, laborum sed
          tempora ratione natus voluptas perspiciatis dignissimos sunt, eos
          dicta sapiente, fugiat voluptatum.
        </p>

        <div class="grid grid-cols-2 gap-x-8">
          <div>
            <h4 class="mt-4 mb-1">Default</h4>
            <HCard class="h-50">
              <h4>Title</h4>
              <p>Content</p>
            </HCard>
          </div>
          <div>
            <h4 class="mt-4 mb-1">Clickable</h4>
            <HCard clickable class="h-50">
              <h4>Title</h4>
              <p>Content</p>
            </HCard>
          </div>
          <div>
            <h4 class="mt-4 mb-1">With Header</h4>
            <HCard class="h-50">
              <template #top> Header </template>
              <h4>Title</h4>
              <p>Content</p>
            </HCard>
          </div>
          <div>
            <h4 class="mt-4 mb-1">With Footer</h4>
            <HCard class="flex h-50 flex-col" body-class="grow">
              <h4>Title</h4>
              <p>Content</p>
              <template #bottom> Footer </template>
            </HCard>
          </div>
        </div>
      </div>
    </HLayout>
  </HApp>
</template>

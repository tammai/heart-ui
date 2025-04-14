<template>
  <HApp :config="{ locale: 'vi' }">
    <HLayout class="min-h-screen">
      <NuxtLoadingIndicator color="var(--color-primary)" />
      <template #asideLeft>
        <ClientOnly>
          <div class="sticky top-0 bottom-0 flex h-screen flex-col p-5">
            <div class="flex items-center gap-2">
              <NuxtImg src="/heart-ui.svg" class="h-12" />
            </div>
            <div class="scrollbar-light grow overflow-y-auto">
              <div class="mt-6 flex flex-col gap-1">
                <h6 class="tracking-wider text-neutral-500 uppercase">
                  Container
                </h6>
                <a
                  v-for="item in ['Layout', 'Card']"
                  :key="item"
                  :href="`#${item.toLowerCase()}`"
                  class="after:bg-primary-500 relative block cursor-pointer rounded px-3 leading-8 text-neutral-700 transition-all after:absolute after:top-1/2 after:left-0 after:block after:h-0 after:w-0.75 after:translate-y-[-50%] after:rounded after:transition-all after:content-['']"
                  :class="[
                    $route.hash === `#${item.toLowerCase()}`
                      ? 'bg-neutral-200 after:h-5'
                      : 'hover:bg-neutral-200',
                  ]"
                >
                  {{ item }}
                </a>
              </div>
              <div class="mt-5 flex flex-col gap-1">
                <h6 class="tracking-wider text-neutral-500 uppercase">Form</h6>
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
                  class="after:bg-primary-500 relative block cursor-pointer rounded px-3 leading-8 text-neutral-700 transition-all after:absolute after:top-1/2 after:left-0 after:block after:h-0 after:w-0.75 after:translate-y-[-50%] after:rounded after:transition-all after:content-['']"
                  :class="[
                    $route.hash === `#${item.toLowerCase()}`
                      ? 'bg-neutral-200 after:h-5'
                      : 'hover:bg-neutral-200',
                  ]"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div
              class="mx-auto mt-5 flex gap-0.5 rounded-full bg-neutral-200 p-0.5"
            >
              <div
                v-for="item in ['system', 'light', 'dark']"
                :key="item"
                class="flex h-6 w-6 cursor-pointer flex-col items-center justify-center rounded-full text-neutral-600 transition-all"
                :class="{
                  'bg-neutral-50 text-neutral-900':
                    $colorMode.preference === item,
                  'hover:bg-neutral-100 hover:text-neutral-800':
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

      <HContainer class="mx-auto p-5 lg:p-8">
        <div class="flex h-60 flex-col items-center justify-center">
          <h1 class="!font-bold">Heart UI</h1>
          <p class="max-w-140 text-center text-lg text-neutral-600">
            A collection of customizable UI components for Nuxt
          </p>
          <a
            href="https://github.com/tammai/heart-ui"
            target="_blank"
            class="mt-4 flex cursor-pointer"
          >
            <Icon name="mdi:github" size="32" />
          </a>
        </div>

        <h3 id="divider" class="mt-8">Divider</h3>
        <div class="grid grid-cols-3 gap-5">
          <HDivider class="my-4" />
          <HDivider
            icon="fluent:heart-24-filled"
            icon-size="24"
            class="text-rose-600"
          />
          <HDivider>Heart</HDivider>
          <HDivider vertical class="h-20" />
          <HDivider
            vertical
            icon="fluent:heart-24-filled"
            icon-size="24"
            class="h-20 text-rose-600"
          />
          <HDivider vertical class="h-20">Heart</HDivider>
        </div>

        <h3 id="button" class="mt-8">Button</h3>
        <div class="flex flex-wrap gap-4">
          <h4 class="w-full">Default</h4>
          <HButton @click="handleClick">Default</HButton>
          <HButton type="tertiary">Tertiary</HButton>
          <HButton type="ghost">Ghost</HButton>

          <HButton variant="primary">Default</HButton>
          <HButton variant="primary" type="tertiary">Tertiary</HButton>
          <HButton variant="primary" type="ghost">Ghost</HButton>

          <HButton variant="danger">Default</HButton>
          <HButton variant="danger" type="tertiary">Tertiary</HButton>
          <HButton variant="danger" type="ghost">Ghost</HButton>
          <div class="w-full"></div>
          <HButton variant="warning">Default</HButton>
          <HButton variant="warning" type="tertiary">Tertiary</HButton>
          <HButton variant="warning" type="ghost">Ghost</HButton>

          <HButton variant="success">Default</HButton>
          <HButton variant="success" type="tertiary">Tertiary</HButton>
          <HButton variant="success" type="ghost">Ghost</HButton>

          <HButton variant="info">Default</HButton>
          <HButton variant="info" type="tertiary">Tertiary</HButton>
          <HButton variant="info" type="ghost">Ghost</HButton>

          <h4 class="w-full">Outline</h4>
          <HButton outline>Default</HButton>
          <HButton outline type="tertiary">Tertiary</HButton>
          <HButton outline type="ghost">Ghost</HButton>

          <HButton outline variant="primary">Default</HButton>
          <HButton outline variant="primary" type="tertiary">Tertiary</HButton>
          <HButton outline variant="primary" type="ghost">Ghost</HButton>

          <HButton outline variant="danger">Default</HButton>
          <HButton outline variant="danger" type="tertiary">Tertiary</HButton>
          <HButton outline variant="danger" type="ghost">Ghost</HButton>
          <div class="w-full"></div>
          <HButton outline variant="warning">Default</HButton>
          <HButton outline variant="warning" type="tertiary">Tertiary</HButton>
          <HButton outline variant="warning" type="ghost">Ghost</HButton>

          <HButton outline variant="success">Default</HButton>
          <HButton outline variant="success" type="tertiary">Tertiary</HButton>
          <HButton outline variant="success" type="ghost">Ghost</HButton>

          <HButton outline variant="info">Default</HButton>
          <HButton outline variant="info" type="tertiary">Tertiary</HButton>
          <HButton outline variant="info" type="ghost">Ghost</HButton>

          <h4 class="w-full">Rounded</h4>
          <HButton rounded>Default</HButton>
          <HButton rounded type="tertiary">Tertiary</HButton>
          <HButton rounded type="ghost">Ghost</HButton>

          <HButton rounded variant="primary">Default</HButton>
          <HButton rounded variant="primary" type="tertiary">Tertiary</HButton>
          <HButton rounded variant="primary" type="ghost">Ghost</HButton>

          <HButton rounded variant="danger">Default</HButton>
          <HButton rounded variant="danger" type="tertiary">Tertiary</HButton>
          <HButton rounded variant="danger" type="ghost">Ghost</HButton>
          <div class="w-full"></div>
          <HButton rounded variant="warning">Default</HButton>
          <HButton rounded variant="warning" type="tertiary">Tertiary</HButton>
          <HButton rounded variant="warning" type="ghost">Ghost</HButton>

          <HButton rounded variant="success">Default</HButton>
          <HButton rounded variant="success" type="tertiary">Tertiary</HButton>
          <HButton rounded variant="success" type="ghost">Ghost</HButton>

          <HButton rounded variant="info">Default</HButton>
          <HButton rounded variant="info" type="tertiary">Tertiary</HButton>
          <HButton rounded variant="info" type="ghost">Ghost</HButton>

          <h4 class="w-full">Size</h4>
          <HButton size="sm">Small</HButton>
          <HButton>Default</HButton>
          <HButton size="lg">Large</HButton>

          <h4 class="w-full">Icon</h4>
          <HButton icon="fluent:person-24-regular" />
          <HButton icon="fluent:arrow-left-24-regular">Left</HButton>
          <HButton icon="fluent:arrow-right-24-regular" iconPosition="right">
            Right
          </HButton>
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
          class="rounded border border-pink-300 bg-pink-200 dark:border-pink-600 dark:bg-pink-700"
        >
          <template #header>
            <div
              class="flex h-full flex-col items-center justify-center border-b border-pink-300 dark:border-pink-600"
            >
              Header
            </div>
          </template>
          <template #asideLeft>
            <div
              class="flex h-full flex-col items-center justify-center border-r border-pink-300 dark:border-pink-600"
            >
              Left Aside
            </div>
          </template>
          <div
            class="flex h-60 flex-col items-center justify-center bg-pink-100 dark:bg-pink-900"
          >
            Body
          </div>
          <template #asideRight>
            <div
              class="flex h-full flex-col items-center justify-center border-l border-pink-300 dark:border-pink-600"
            >
              Right Aside
            </div>
          </template>
          <template #footer>
            <div
              class="flex h-full flex-col items-center justify-center border-t border-pink-300 dark:border-pink-600"
            >
              Footer
            </div>
          </template>
        </HLayout>

        <h4 class="mt-4 mb-1">Two columns</h4>
        <HLayout class="rounded border border-neutral-200 bg-white">
          <template #asideLeft>
            <div
              class="flex h-full flex-col items-center justify-center border-r-1 border-neutral-200"
            >
              Aside
            </div>
          </template>
          <div class="flex h-76 flex-col items-center justify-center">Body</div>
        </HLayout>

        <h4 class="mt-4 mb-1">One column</h4>
        <HLayout class="rounded border border-neutral-200 bg-white">
          <template #header>
            <div
              class="flex h-full flex-col items-center justify-center border-b-1 border-neutral-200"
            >
              Header
            </div>
          </template>
          <div class="flex h-60 flex-col items-center justify-center">Body</div>
          <template #footer>
            <div
              class="flex h-full flex-col items-center justify-center border-t-1 border-neutral-200"
            >
              Footer
            </div>
          </template>
        </HLayout>

        <h4 class="mt-4 mb-1">Nested containers</h4>
        <HLayout class="rounded border border-neutral-200 bg-white">
          <template #asideLeft>
            <div
              class="flex h-full flex-col items-center justify-center border-r-1 border-neutral-200"
            >
              Aside
            </div>
          </template>
          <HLayout>
            <template #header>
              <div
                class="flex h-full flex-col items-center justify-center border-b-1 border-neutral-200"
              >
                Header
              </div>
            </template>
            <div class="flex h-60 flex-col items-center justify-center">
              Body
            </div>
            <template #footer>
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
            <HCard clickable class="h-50" @click="handleClick">
              <h4>Title</h4>
              <p>Content</p>
            </HCard>
          </div>
          <div>
            <h4 class="mt-4 mb-1">With Header</h4>
            <HCard size="sm" class="h-50">
              <template #header> Header </template>
              <h4>Title</h4>
              <p>Content</p>
            </HCard>
          </div>
          <div>
            <h4 class="mt-4 mb-1">With Footer</h4>
            <HCard
              size="lg"
              class="flex h-50 flex-col"
              :rounded="false"
              :ui="{
                slots: { body: 'grow' },
              }"
            >
              <h4>Title</h4>
              <p>Content</p>
              <template #footer> Footer </template>
            </HCard>
          </div>
        </div>

        <!-- Skeleton -->
        <h2>Skeleton</h2>
        <div class="mt-6 grid grid-cols-3 gap-6">
          <HSkeleton :animation="false" />
          <HSkeleton>
            <template #template>
              <div class="flex flex-col gap-3">
                <HSkeletonItem variant="image" class="h-50 w-full" />
                <HSkeletonItem variant="heading" class="w-1/3" />
                <HSkeletonItem
                  v-for="i in 3"
                  :key="i"
                  variant="text"
                  :class="i === 3 ? 'w-1/2' : 'w-full'"
                />
              </div>
            </template>
          </HSkeleton>
          <HSkeleton
            :ui="{
              base: 'bg-red-300',
              variants: { hasIcon: { true: 'text-red-400' } },
            }"
          >
            <template #template>
              <div class="flex flex-col gap-6">
                <div class="flex items-center gap-3">
                  <HSkeletonItem variant="avatar" />
                  <div class="flex grow flex-col gap-3">
                    <HSkeletonItem variant="heading" />
                    <HSkeletonItem class="w-1/2" />
                  </div>
                </div>
                <div class="flex gap-3">
                  <HSkeletonItem variant="rect" class="h-20 w-30" />
                  <HSkeletonItem variant="circle" class="size-20" />
                </div>
              </div>
            </template>
          </HSkeleton>
        </div>
        <h2 class="mt-6">Alert</h2>
        <div class="grid grid-cols-2 gap-6">
          <HAlert
            variant="success"
            title="Success"
            message="This is a success!"
          />
          <HAlert variant="error" title="Error" message="This is an error!">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            recusandae corporis culpa odio repudiandae, natus quas sint,
            explicabo dolor ipsum ex sit tenetur impedit dolore et accusantium
            beatae quaerat! Et!</HAlert
          >
          <HAlert variant="info" title="Info" message="This is an info!" />
          <HAlert
            variant="warning"
            title="Warning"
            message="This is a warning!"
            closable
          />
        </div>
      </HContainer>
    </HLayout>
  </HApp>
</template>

<script setup lang="ts">
const handleClick = () => {
  if (import.meta.client) {
    alert('You just clicked!');
  }
};
</script>

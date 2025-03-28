<template>
  <HContainer :aside-width="220" class="min-h-screen">
    <NuxtLoadingIndicator color="var(--color-primary)" />
    <template #aside>
      <div class="sticky top-0 bg-neutral-200 h-screen p-5 flex flex-col">
        <div class="flex items-center gap-2">
          <NuxtImg src="/heart-ui.svg" class="h-12" />
        </div>

        <div class="mt-6">
          <p
            class="text-neutral-500 mb-1 text-xs uppercase font-medium tracking-wider"
          >
            Layout
          </p>
          <p
            class="text-neutral-800 leading-8 pl-2.5 border-l border-neutral-300 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-all"
          >
            Container
          </p>
          <p
            class="text-neutral-800 leading-8 pl-2.5 border-l border-neutral-300 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-all"
          >
            Card
          </p>
        </div>
        <div class="mt-6">
          <p
            class="text-neutral-500 mb-1 text-xs uppercase font-medium tracking-wider"
          >
            Form
          </p>
          <p
            class="text-neutral-800 leading-8 pl-2.5 border-l border-neutral-300 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-all"
          >
            Button
          </p>
          <p
            class="text-neutral-800 leading-8 pl-2.5 border-l border-neutral-300 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-all"
          >
            Input
          </p>
          <p
            class="text-neutral-800 leading-8 pl-2.5 border-l border-neutral-300 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-all"
          >
            Select
          </p>
          <p
            class="text-neutral-800 leading-8 pl-2.5 border-l border-neutral-300 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-all"
          >
            Radio
          </p>
          <p
            class="text-neutral-800 leading-8 pl-2.5 border-l border-neutral-300 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-all"
          >
            Checkbox
          </p>
        </div>
        <div class="flex justify-center gap-2 mt-auto">
          <div
            class="w-8 h-8 rounded-full flex flex-col items-center justify-center cursor-pointer text-neutral-700 bg-black/6 hover:bg-black/12 hover:text-neutral-900 transition-all"
          >
            <Icon name="ph:github-logo-light" size="20" />
          </div>
          <div
            class="w-8 h-8 rounded-full flex flex-col items-center justify-center cursor-pointer text-neutral-700 bg-black/6 hover:bg-black/12 hover:text-neutral-900 transition-all"
            @click="
              $colorMode.preference =
                $colorMode.value === 'dark' ? 'light' : 'dark'
            "
          >
            <Icon
              v-if="$colorMode.value === 'dark'"
              name="material-symbols-light:sunny-outline-rounded"
              size="24"
            />
            <Icon
              v-else
              name="material-symbols-light:dark-mode-outline-rounded"
              size="24"
            />
          </div>
        </div>
      </div>
    </template>
    <div class="max-w-240 mx-auto p-5 lg:p-8">
      <div class="h-60 flex flex-col items-center justify-center">
        <h1>Heart UI</h1>
        <p class="text-lg text-neutral-700 text-center max-w-140">
          The open-source customizable UI components built for Nuxt
        </p>
      </div>

      <!-- Container -->
      <h3 id="container" class="mt-8">Container</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic
        adipisci nesciunt, est libero voluptatibus neque aliquam soluta quaerat,
        nisi vitae nostrum ipsum accusantium. Obcaecati nobis consequuntur
        quibusdam qui temporibus!
      </p>

      <h4 class="mt-4 mb-1">Default layout</h4>
      <HContainer class="bg-white rounded border-1 border-neutral-300">
        <template #header>
          <div
            class="h-full flex flex-col items-center justify-center border-b-1 border-neutral-300"
          >
            Header
          </div>
        </template>
        <template #aside>
          <div
            class="h-full border-r-1 border-neutral-300 flex flex-col items-center justify-center"
          >
            Aside
          </div>
        </template>
        <div class="h-60 flex flex-col items-center justify-center">Body</div>
        <template #footer>
          <div
            class="h-full flex flex-col items-center justify-center border-t-1 border-neutral-300"
          >
            Footer
          </div>
        </template>
      </HContainer>

      <h4 class="mt-4 mb-1">Two columns</h4>
      <HContainer class="bg-white rounded border-1 border-neutral-300">
        <template #aside>
          <div
            class="h-full border-r-1 border-neutral-300 flex flex-col items-center justify-center"
          >
            Aside
          </div>
        </template>
        <div class="h-76 flex flex-col items-center justify-center">Body</div>
      </HContainer>

      <h4 class="mt-4 mb-1">One column</h4>
      <HContainer class="bg-white rounded border-1 border-neutral-300">
        <template #header>
          <div
            class="h-full flex flex-col items-center justify-center border-b-1 border-neutral-300"
          >
            Header
          </div>
        </template>
        <div class="h-60 flex flex-col items-center justify-center">Body</div>
        <template #footer>
          <div
            class="h-full flex flex-col items-center justify-center border-t-1 border-neutral-300"
          >
            Footer
          </div>
        </template>
      </HContainer>

      <h4 class="mt-4 mb-1">Nested containers</h4>
      <HContainer class="bg-white rounded border-1 border-neutral-300">
        <template #aside>
          <div
            class="h-full border-r-1 border-neutral-300 flex flex-col items-center justify-center"
          >
            Aside
          </div>
        </template>
        <HContainer>
          <template #header>
            <div
              class="h-full flex flex-col items-center justify-center border-b-1 border-neutral-300"
            >
              Header
            </div>
          </template>
          <div class="h-60 flex flex-col items-center justify-center">Body</div>
          <template #footer>
            <div
              class="h-full flex flex-col items-center justify-center border-t-1 border-neutral-300"
            >
              Footer
            </div>
          </template>
        </HContainer>
      </HContainer>

      <!-- Card -->
      <h3 id="card" class="mt-8">Card</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur
        omnis consequatur nam sequi porro dolorum eligendi, laborum sed tempora
        ratione natus voluptas perspiciatis dignissimos sunt, eos dicta
        sapiente, fugiat voluptatum.
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
            <template #header> Header </template>
            <h4>Title</h4>
            <p>Content</p>
          </HCard>
        </div>
        <div>
          <h4 class="mt-4 mb-1">With Footer</h4>
          <HCard class="h-50 flex flex-col" body-class="grow">
            <h4>Title</h4>
            <p>Content</p>
            <template #footer> Footer </template>
          </HCard>
        </div>
      </div>
    </div>
  </HContainer>
</template>

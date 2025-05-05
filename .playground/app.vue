<template>
  <HApp :config="{ locale: 'vi' }">
    <NuxtLoadingIndicator color="var(--color-primary)" />
    <HLayout class="min-h-screen">
      <HAside>
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
                  v-for="item in [
                    'Layout',
                    'Card',
                    'Skeleton',
                    'Alert',
                    'Divider',
                    'Tag',
                    'Scrollbar',
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
      </HAside>

      <HMain class="mx-auto min-w-screen p-5 md:min-w-0 lg:p-8">
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
        <div class="flex flex-wrap gap-2">
          <HBadge :value="1000" :max="99">
            <HButton tertiary>Button</HButton>
          </HBadge>
          <HBadge :value="1000" :max="99" is-dot :offset="[2, 2]">
            <HButton tertiary>Button</HButton>
          </HBadge>
          <HBadge :value="'NEW'" type="success">
            <HButton tertiary>Button</HButton>
          </HBadge>
          <HBadge>
            <HButton tertiary>Button</HButton>
            <template #content>Custom</template>
          </HBadge>
          <HButton @click="showMessage" label="Show message" />
        </div>

        <h3 id="empty-state" class="mt-8">Empty State</h3>

        <h4 class="mt-6">Default</h4>

        <HEmptyState />

        <h4 class="mt-6">Custom content</h4>
        <HEmptyState>
          <template #image="{ css }">
            <svg
              width="250"
              height="200"
              viewBox="0 0 250 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M99.942 133.192L101.432 133.141V154.14C101.432 154.615 101.819 155 102.296 155H154.136C154.613 155 155 154.615 155 154.14V82.155C155 80.4126 153.582 79 151.832 79H104.6C102.85 79 101.432 80.4126 101.432 82.155V97.1227L99.942 97.0711C99.767 97.065 99.5917 97.062 99.416 97.062C90.3809 97.062 83 105.124 83 115.132C83 125.139 90.3809 133.202 99.416 133.202C99.5917 133.202 99.767 133.199 99.942 133.192ZM100.107 126.29C99.8778 126.309 99.6473 126.318 99.416 126.318C93.9625 126.318 89.6432 121.263 89.6432 115.132C89.6432 109.001 93.9625 103.946 99.416 103.946C99.6473 103.946 99.8778 103.955 100.107 103.973L101.432 104.079V126.184L100.107 126.29Z"
                fill="white"
                stroke="#1F64E7"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
              <path
                d="M147 85.1816V103.5M147 109.182V113.925V109.182Z"
                stroke="#75A4FE"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M67.1279 147H74M181.128 147H184M161 147H176.428M80 147H97.4541"
                stroke="#1F64E7"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M128 35C125.333 39.2135 124 42.8802 124 46C124 51.5562 128.654 54.0444 128.654 60.063C128.654 63.1177 127.103 66.1507 124 69.1621"
                stroke="#75A4FE"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M116 46C115.128 51.5127 119 52.5322 119 57.4746C119 59.9831 118 62.4915 116 65"
                stroke="#75A4FE"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M134.795 43.4741C133.474 46.8933 134.216 48.9774 134.795 50.2041C136.033 52.8262 138 55.0896 138 57.7578C138 60.8568 136.932 63.8392 134.795 66.7051"
                stroke="#75A4FE"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M105 84C105 83.4477 105.448 83 106 83L125 83V152H106C105.448 152 105 151.552 105 151V84Z"
                fill="#E8F0FE"
              />
            </svg>
          </template>
          <h5>You're all caught up!</h5>
          <p class="text-neutral-600">Check back later for new tasks</p>
          <HButton type="primary" class="mt-6">OK</HButton>
        </HEmptyState>

        <HEmptyState
          title="The list is empty"
          message="Create your first item by clicking below button"
        >
          <template #action>
            <HButton type="primary" label="Create" />
          </template>
        </HEmptyState>

        <h3 id="scrollbar" class="mt-8">Scrollbar</h3>

        <h4 class="mt-6">Vertical</h4>
        <HScrollbar height="320px">
          <div class="flex flex-col gap-2 p-3">
            <div
              v-for="item in 16"
              :key="item"
              class="flex h-10 items-center justify-center rounded bg-neutral-200"
            >
              {{ item }}
            </div>
          </div>
        </HScrollbar>

        <h4 class="mt-6">Horizontal</h4>

        <HScrollbar>
          <div class="flex w-fit gap-2 p-3">
            <div
              v-for="item in 16"
              :key="item"
              class="flex h-10 w-30 items-center justify-center rounded bg-neutral-200"
            >
              {{ item }}
            </div>
          </div>
        </HScrollbar>

        <h3 id="collapse" class="mt-8">Collapse</h3>
        <div class="mt-6">
          <h4 class="mb-3">Default</h4>
          <HCollapse v-model="collapseValue1" @change="handleChange">
            <HCollapseItem title="Consistency" name="1">
              <div>
                Consistency refers to the quality of always behaving or
                performing in a similar way, maintaining uniformity or
                steadiness over time. It's about reliability, predictability,
                and coherence in actions, principles, or results.
              </div>
            </HCollapseItem>
            <HCollapseItem title="Feedback" name="2">
              <div>
                Feedback is information or reactions shared with someone about
                their actions, work, or behavior to help them improve,
                understand their impact, or reinforce positive outcomes. It can
                be verbal, written, or expressed nonverbally and is often used
                in workplaces, education, personal relationships, and creative
                projects.
              </div>
            </HCollapseItem>
            <HCollapseItem title="Efficiency" name="3">
              <div>
                Efficiency is the ability to accomplish a task or achieve a goal
                with the least amount of wasted time, effort, or resources. It's
                about optimizing processes and outputs while minimizing
                unnecessary inputs or actions. Essentially, it's doing things
                right—and doing them swiftly and smartly.
              </div>
            </HCollapseItem>
            <HCollapseItem title="Controllability" name="4">
              <div>
                Controllability refers to the ability to manage, influence, or
                regulate a system, process, or situation to achieve desired
                outcomes. It's often used in fields like engineering, economics,
                and management.
              </div>
            </HCollapseItem>
          </HCollapse>
        </div>
        <div class="mt-6">
          <h4 class="mb-3">Accordion</h4>
          <HCollapse
            v-model="collapseValue2"
            accordion
            icon="fluent:add-24-regular"
            active-icon="fluent:subtract-24-regular"
            @change="handleChange"
          >
            <HCollapseItem title="Consistency" name="1">
              <div>
                Consistency refers to the quality of always behaving or
                performing in a similar way, maintaining uniformity or
                steadiness over time. It's about reliability, predictability,
                and coherence in actions, principles, or results.
              </div>
            </HCollapseItem>
            <HCollapseItem title="Feedback" name="2">
              <div>
                Feedback is information or reactions shared with someone about
                their actions, work, or behavior to help them improve,
                understand their impact, or reinforce positive outcomes. It can
                be verbal, written, or expressed nonverbally and is often used
                in workplaces, education, personal relationships, and creative
                projects.
              </div>
            </HCollapseItem>
            <HCollapseItem title="Efficiency" name="3">
              <div>
                Efficiency is the ability to accomplish a task or achieve a goal
                with the least amount of wasted time, effort, or resources. It's
                about optimizing processes and outputs while minimizing
                unnecessary inputs or actions. Essentially, it's doing things
                right—and doing them swiftly and smartly.
              </div>
            </HCollapseItem>
            <HCollapseItem title="Controllability" name="4">
              <div>
                Controllability refers to the ability to manage, influence, or
                regulate a system, process, or situation to achieve desired
                outcomes. It's often used in fields like engineering, economics,
                and management.
              </div>
            </HCollapseItem>
          </HCollapse>
        </div>

        <h3 id="tag" class="mt-8">Tag</h3>
        <p>
          A tag is a small piece of information that can be used to label or
          categorize content. It can be used for filtering, grouping, or
          organizing items.
        </p>
        <h4 class="mt-6">Light</h4>
        <div class="inline-flex flex-wrap gap-2">
          <HTag>Neutral</HTag>
          <HTag color="primary">Primary</HTag>
          <HTag color="success">Success</HTag>
          <HTag color="danger">Danger</HTag>
          <HTag color="info">Info</HTag>
          <HTag color="warning">Warning</HTag>
          <HTag color="lime">Lime</HTag>
          <HTag color="violet">Violet</HTag>
          <HTag color="fuchsia">Fuchsia</HTag>
        </div>

        <h4 class="mt-6">Dark</h4>
        <div class="inline-flex flex-wrap gap-2">
          <HTag effect="dark">Neutral</HTag>
          <HTag color="primary" effect="dark">Primary</HTag>
          <HTag color="success" effect="dark">Success</HTag>
          <HTag color="danger" effect="dark">Danger</HTag>
          <HTag color="info" effect="dark">Info</HTag>
          <HTag color="warning" effect="dark">Warning</HTag>
          <HTag color="lime" effect="dark">Lime</HTag>
          <HTag color="violet" effect="dark">Violet</HTag>
          <HTag color="fuchsia" effect="dark">Fuchsia</HTag>
        </div>

        <h4 class="mt-6">Plain</h4>
        <div class="inline-flex flex-wrap gap-2">
          <HTag effect="plain">Neutral</HTag>
          <HTag color="primary" effect="plain">Primary</HTag>
          <HTag color="success" effect="plain">Success</HTag>
          <HTag color="danger" effect="plain">Danger</HTag>
          <HTag color="info" effect="plain">Info</HTag>
          <HTag color="warning" effect="plain">Warning</HTag>
          <HTag color="lime" effect="plain">Lime</HTag>
          <HTag color="violet" effect="plain">Violet</HTag>
          <HTag color="fuchsia" effect="plain">Fuchsia</HTag>
        </div>

        <h4 class="mt-6">Size</h4>
        <div class="inline-flex gap-2">
          <HTag size="sm">Small</HTag>
          <HTag>Medium</HTag>
          <HTag size="lg">Large</HTag>
        </div>

        <h4 class="mt-6">Others</h4>
        <div class="inline-flex gap-2">
          <HTag disabled>Disabled</HTag>
          <HTag removable>Removable</HTag>
        </div>

        <h3 id="divider" class="mt-8">Divider</h3>
        <p>
          A divider is a thin line that separates content or sections within a
          layout. It can be used to create visual hierarchy and improve
          readability.
        </p>
        <div class="mt-4 grid grid-cols-3 gap-8">
          <div class="flex h-40 flex-col gap-2">
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
            <HDivider class="my-3" />
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
          </div>
          <div class="flex h-40 flex-col gap-2">
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
            <HDivider
              icon="fluent:heart-24-filled"
              icon-size="24"
              class="text-rose-600"
              :ui="{ slots: { line: 'bg-rose-600' } }"
            />
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
          </div>
          <div class="flex h-40 flex-col gap-2">
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
            <HDivider>Heart</HDivider>
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
          </div>

          <div class="flex gap-2">
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
            <HDivider vertical class="mx-3 h-30" />
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
          </div>
          <div class="flex gap-2">
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
            <HDivider
              vertical
              icon="fluent:heart-24-filled"
              icon-size="24"
              class="h-30 text-rose-600"
              :ui="{ slots: { line: 'bg-rose-600' } }"
            />
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
          </div>
          <div class="flex gap-2">
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
            <HDivider vertical class="h-30">Heart</HDivider>
            <div
              class="flex grow items-center justify-center rounded bg-neutral-200"
            >
              Content
            </div>
          </div>
        </div>

        <h3 id="button" class="mt-8">Button</h3>
        <p>
          A button component is an interactive element that performs an action
          when clicked or tapped. It can be used for navigation, commands, or
          form submissions.
        </p>
        <div class="flex flex-wrap gap-4">
          <h4 class="mt-4 w-full">Default</h4>
          <HButton @click="handleClick">Default</HButton>
          <HButton variant="tertiary">Tertiary</HButton>
          <HButton variant="ghost">Ghost</HButton>

          <HButton type="primary">Default</HButton>
          <HButton type="primary" variant="tertiary">Tertiary</HButton>
          <HButton type="primary" variant="ghost">Ghost</HButton>

          <HButton type="danger">Default</HButton>
          <HButton type="danger" variant="tertiary">Tertiary</HButton>
          <HButton type="danger" variant="ghost">Ghost</HButton>
          <div class="w-full"></div>
          <HButton type="warning">Default</HButton>
          <HButton type="warning" variant="tertiary">Tertiary</HButton>
          <HButton type="warning" variant="ghost">Ghost</HButton>

          <HButton type="success">Default</HButton>
          <HButton type="success" variant="tertiary">Tertiary</HButton>
          <HButton type="success" variant="ghost">Ghost</HButton>

          <HButton type="info">Default</HButton>
          <HButton type="info" variant="tertiary">Tertiary</HButton>
          <HButton type="info" variant="ghost">Ghost</HButton>

          <h4 class="w-full">Outline</h4>
          <HButton outline>Default</HButton>
          <HButton outline variant="tertiary">Tertiary</HButton>
          <HButton outline variant="ghost">Ghost</HButton>

          <HButton outline type="primary">Default</HButton>
          <HButton outline type="primary" variant="tertiary">Tertiary</HButton>
          <HButton outline type="primary" variant="ghost">Ghost</HButton>

          <HButton outline type="danger">Default</HButton>
          <HButton outline type="danger" variant="tertiary">Tertiary</HButton>
          <HButton outline type="danger" variant="ghost">Ghost</HButton>
          <div class="w-full"></div>
          <HButton outline type="warning">Default</HButton>
          <HButton outline type="warning" variant="tertiary">Tertiary</HButton>
          <HButton outline type="warning" variant="ghost">Ghost</HButton>

          <HButton outline type="success">Default</HButton>
          <HButton outline type="success" variant="tertiary">Tertiary</HButton>
          <HButton outline type="success" variant="ghost">Ghost</HButton>

          <HButton outline type="info">Default</HButton>
          <HButton outline type="info" variant="tertiary">Tertiary</HButton>
          <HButton outline type="info" variant="ghost">Ghost</HButton>

          <h4 class="w-full">Rounded</h4>
          <HButton rounded>Default</HButton>
          <HButton rounded variant="tertiary">Tertiary</HButton>
          <HButton rounded variant="ghost">Ghost</HButton>

          <HButton rounded type="primary">Default</HButton>
          <HButton rounded type="primary" variant="tertiary">Tertiary</HButton>
          <HButton rounded type="primary" variant="ghost">Ghost</HButton>

          <HButton rounded type="danger">Default</HButton>
          <HButton rounded type="danger" variant="tertiary">Tertiary</HButton>
          <HButton rounded type="danger" variant="ghost">Ghost</HButton>
          <div class="w-full"></div>
          <HButton rounded type="warning">Default</HButton>
          <HButton rounded type="warning" variant="tertiary">Tertiary</HButton>
          <HButton rounded type="warning" variant="ghost">Ghost</HButton>

          <HButton rounded type="success">Default</HButton>
          <HButton rounded type="success" variant="tertiary">Tertiary</HButton>
          <HButton rounded type="success" variant="ghost">Ghost</HButton>

          <HButton rounded type="info">Default</HButton>
          <HButton rounded type="info" variant="tertiary">Tertiary</HButton>
          <HButton rounded type="info" variant="ghost">Ghost</HButton>

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

          <h4 class="w-full">Group</h4>
          <HButtonGroup size="sm" variant="ghost" outline rounded>
            <HButton>One</HButton>
            <HButton>Two</HButton>
            <HButton>Three</HButton>
          </HButtonGroup>
          <HButtonGroup outline variant="tertiary">
            <HButton icon="fluent:arrow-left-24-regular"></HButton>
            <HButton icon="fluent:arrow-right-24-regular"></HButton>
          </HButtonGroup>
          <HButtonGroup size="lg" type="primary">
            <HButton>One</HButton>
            <HButton>Two</HButton>
            <HButton>Three</HButton>
          </HButtonGroup>
        </div>

        <!-- Layout -->
        <h3 id="layout" class="mt-8">Layout</h3>
        <p>
          A layout component is a container that defines the structure and
          arrangement of other components within a page or section. It can be
          used to create responsive and organized layouts for different screen
          sizes.
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
          <HAside>
            <div
              class="flex h-full flex-col items-center justify-center border-r border-pink-300 dark:border-pink-600"
            >
              Left Aside
            </div>
          </HAside>
          <HMain
            class="flex h-60 flex-col items-center justify-center bg-pink-100 dark:bg-pink-900"
          >
            Body
          </HMain>

          <HAside>
            <div
              class="flex h-full flex-col items-center justify-center border-l border-pink-300 dark:border-pink-600"
            >
              Right Aside
            </div>
          </HAside>
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
          <HAside>
            <div
              class="flex h-full flex-col items-center justify-center border-r-1 border-neutral-200"
            >
              Aside
            </div>
          </HAside>
          <HMain class="flex h-76 flex-col items-center justify-center"
            >Body</HMain
          >
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
          <HMain class="flex h-60 flex-col items-center justify-center"
            >Body</HMain
          >
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
          <HAside>
            <div
              class="flex h-full flex-col items-center justify-center border-r-1 border-neutral-200"
            >
              Aside
            </div>
          </HAside>
          <HMain>
            <HLayout>
              <template #header>
                <div
                  class="flex h-full flex-col items-center justify-center border-b-1 border-neutral-200"
                >
                  Header
                </div>
              </template>
              <HMain class="flex h-60 flex-col items-center justify-center">
                Body
              </HMain>
              <template #footer>
                <div
                  class="flex h-full flex-col items-center justify-center border-t-1 border-neutral-200"
                >
                  Footer
                </div>
              </template>
            </HLayout>
          </HMain>
        </HLayout>

        <!-- Card -->
        <h3 id="card" class="mt-8">Card</h3>
        <p>
          A card component is a container that displays content in a visually
          appealing way. It can be used to group related information, images,
          and actions together.
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
        <h2 id="skeleton" class="mt-8">Skeleton</h2>
        <p>
          A skeleton component is a placeholder that indicates loading content.
          It can be used to improve user experience by providing visual feedback
          while data is being fetched or processed.
        </p>
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
        <h2 id="alert" class="mt-8">Alert</h2>
        <p>
          An alert component is a message that provides feedback or information
          to the user. It can be used to display success, error, warning, or
          informational messages.
        </p>
        <div class="grid grid-cols-2 gap-6">
          <HAlert type="success" title="Success" message="This is a success!" />
          <HAlert type="danger" title="Error" message="This is an error!">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            recusandae corporis culpa odio repudiandae, natus quas sint,
            explicabo dolor ipsum ex sit tenetur impedit dolore et accusantium
            beatae quaerat! Et!</HAlert
          >
          <HAlert type="info" title="Info" message="This is an info!" />
          <HAlert
            type="warning"
            title="Warning"
            message="This is a warning!"
            closable
          />
        </div>
      </HMain>
    </HLayout>
  </HApp>
</template>

<script setup lang="ts">
const handleClick = () => {
  if (import.meta.client) {
    alert('You just clicked!');
  }
};

const { info, warning, success, error } = useHeartToast();

const collapseValue1 = ref(['1']);
const collapseValue2 = ref([]);
const handleChange = (val: any) => {
  console.log('activeItems', val);
};
const showMessage = () => {
  info({
    message: 'Banana is the best fruit!',
    duration: 0,
    showClose: true,
  });
  warning('Banana make you better!');
  success({ message: 'Banana is the winner!' });
  error({ message: 'But Potato is the king.' });
};
</script>

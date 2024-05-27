declare module "vue" {
  export interface GlobalComponents {
    HButton: typeof import("heart-ui").HButton;
    HIcon: typeof import("heart-ui").HIcon;
  }
}

export {};

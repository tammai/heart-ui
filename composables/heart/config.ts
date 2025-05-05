/**
 * Get the config from the app.config.ts
 *
 * @returns Reactive config for Heart UI
 */
export const useHeartConfig = () => {
  const { locale, icon, size, message } = useAppConfig().heart;

  return reactive({
    locale,
    size,
    icon,
    message,
  });
};

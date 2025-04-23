export const useHeartConfig = () => {
  const { locale, icon, size, message } = useAppConfig().heart;

  return reactive({
    locale,
    size,
    icon,
    message,
  });
};

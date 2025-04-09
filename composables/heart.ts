export const useHeartConfig = () => {
  const { locale, icon, size, message } = useAppConfig().heart;

  return {
    locale,
    size,
    icon,
    message,
  };
};

import { get } from 'lodash-unified';

export const getHeartConfig = (path: string) => {
  try {
    const heart = useAppConfig().heart;

    return get(heart, path);
  } catch (error) {
    return {};
  }
};

export const getHeartRoundedValue = (
  size: 'sm' | 'md' | 'lg',
  enabled?: boolean,
) => {
  const roundedMapping = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
  };

  return (enabled ?? getHeartConfig('rounded') === true)
    ? roundedMapping[size]
    : 'rounded-none';
};

export const getHeartShadowValue = (
  size: 'sm' | 'md' | 'lg',
  enabled?: boolean,
) => {
  const shadowMapping = {
    sm: 'shadow-md',
    md: 'shadow-lg',
    lg: 'shadow-xl',
  };

  return (enabled ?? getHeartConfig('shadow') ?? false)
    ? shadowMapping[size]
    : 'shadow-none';
};

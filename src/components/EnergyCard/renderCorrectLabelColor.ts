export function renderCorrectLabelColor(energyPercentageValue: string) {
  const sign = energyPercentageValue[0];
  switch (sign) {
    case '-':
      return 'text-green-500';
    case '+':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

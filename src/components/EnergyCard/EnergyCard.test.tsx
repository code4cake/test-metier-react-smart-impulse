import { render } from '@testing-library/react';

import { EnergyCard } from './EnergyCard';

describe('EnergyCard', () => {
  it('should render', () => {
    const { container } = render(
      <EnergyCard
        title="Electricity"
        iconName="electricity"
        energyTotal="100"
        energyPercentageValue="10"
        energyPercentageLabel="10%"
      />,
    );

    expect(container).toBeInTheDocument();
  });
});

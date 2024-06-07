import { render } from '@testing-library/react';

import { EnergyCard } from './EnergyCard';

// [FIXME]: Test not working, I think it is because of aliasing imports with (@) typescript
// somehow webpack it is not able to resolve the path even with craco installed
describe('EnergyCard', () => {
  it.skip('should render', () => {
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

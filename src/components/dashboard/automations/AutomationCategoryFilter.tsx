'use client';

import { AUTOMATION_CATEGORIES } from '@/lib/constants';
import type { AutomationCategory } from '@/lib/types';
import FilterBar from '../shared/FilterBar';

interface AutomationCategoryFilterProps {
  active: string;
  onChange: (value: string) => void;
}

export default function AutomationCategoryFilter({ active, onChange }: AutomationCategoryFilterProps) {
  const filters = [
    { label: 'Todas', value: 'all' },
    ...Object.entries(AUTOMATION_CATEGORIES).map(([key, config]) => ({
      label: config.label,
      value: key,
    })),
  ];

  return <FilterBar filters={filters} active={active} onChange={onChange} />;
}

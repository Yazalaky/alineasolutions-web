import { describe, expect, it } from 'vitest';
import { buildHashForView, getViewFromHash } from './navigation';

describe('navigation', () => {
  it('resuelve la vista a partir del hash permitido', () => {
    expect(getViewFromHash('')).toBe('home');
    expect(getViewFromHash('#simulator')).toBe('simulator');
    expect(getViewFromHash('#/apply')).toBe('apply');
    expect(getViewFromHash('#unknown')).toBe('home');
  });

  it('construye hashes consistentes para cada vista', () => {
    expect(buildHashForView('home')).toBe('');
    expect(buildHashForView('simulator')).toBe('#simulator');
    expect(buildHashForView('apply')).toBe('#apply');
  });
});

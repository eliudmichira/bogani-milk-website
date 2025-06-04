// src/components/ui/SectionHeading.test.tsx
import { render, screen } from '@testing-library/react';
import SectionHeading from './SectionHeading'; // Assuming SectionHeading.tsx is in the same directory
import { vi } from 'vitest'; // Or import { jest } from '@jest/globals';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      // Provide minimal mock implementations for elements used in SectionHeading
      // For example, if SectionHeading uses <motion.h2> and <motion.p>
      h2: React.forwardRef(({ children, ...props }: any, ref: any) => <h2 ref={ref} {...props}>{children}</h2>),
      p: React.forwardRef(({ children, ...props }: any, ref: any) => <p ref={ref} {...props}>{children}</p>),
      // Add other motion elements if used and necessary for rendering
    },
  };
});

describe('SectionHeading component', () => {
  it('renders the title correctly', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByRole('heading', { name: /Test Title/i })).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<SectionHeading title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText(/Test Subtitle/i)).toBeInTheDocument();
  });

  it('does not render the subtitle when not provided', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.queryByText(/Test Subtitle/i)).not.toBeInTheDocument();
  });

  it('renders title with highlighted word when highlightWord is provided', () => {
    // This test checks for the presence of the span with the 'highlight' class.
    // It assumes 'highlight' is the class used for highlighting.
    // The actual visual highlighting would be a CSS concern.
    render(<SectionHeading title="Awesome Test Title" highlightWord="Test" />);
    const heading = screen.getByRole('heading', { name: /Awesome Test Title/i });
    // Check if the innerHTML contains the expected structure.
    // This is a bit brittle but necessary for dangerouslySetInnerHTML.
    expect(heading.innerHTML).toContain('<span class="highlight">Test</span>');
    expect(heading.innerHTML).toContain('Awesome');
    expect(heading.innerHTML).toContain('Title');
  });

  it('renders title normally when highlightWord does not match any word', () => {
    render(<SectionHeading title="Awesome Test Title" highlightWord="NonExistent" />);
    const heading = screen.getByRole('heading', { name: /Awesome Test Title/i });
    expect(heading.innerHTML).not.toContain('<span class="highlight">');
    expect(heading.textContent).toBe('Awesome Test Title');
  });

  // Test for isVisible prop (basic check, animation itself is harder to test)
  it('applies initial styles for animation when not visible (simulated)', () => {
    // Framer Motion's animations are complex to unit test without visual regression.
    // We can check if the motion component receives expected props.
    // Here, we're mostly ensuring it renders without error.
    // A more advanced test might involve checking style attributes if 'isVisible' directly translates to styles.
    render(<SectionHeading title="Test Title" isVisible={false} />);
    // For example, if opacity is set based on isVisible, you might try to check that.
    // However, with framer-motion, this is often handled internally or via variants.
    // This basic test ensures it renders.
    expect(screen.getByRole('heading', { name: /Test Title/i })).toBeInTheDocument();
  });
});

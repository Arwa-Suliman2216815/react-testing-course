import { render, screen, fireEvent } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
// import ExpandableText from './ExpandableText';

describe('ExpandableText', () => {
  const shortText = 'This is a short text';
  const longText = 'A'.repeat(300); // Creates a text longer than the limit of 255 characters

  it('should render the full text if the text length is under the limit (255 characters)', () => {
    render(<ExpandableText text={shortText} />);
    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull(); // No button should be present
  });

  it('should render truncated text if the text length exceeds the limit (255 characters)', () => {
    render(<ExpandableText text={longText} />);
    // const sectionedText= `${longText.substring(0, 255)}...`
    // expect(screen.getByText(sectionedText)).toBeInTheDocument();
    expect(screen.getByText(`${longText.substring(0, 255)}...`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show More' })).toBeInTheDocument();
  });

  it('should expand text when "Show More" button is clicked', () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole('button', { name: 'Show More' });
    fireEvent.click(showMoreButton);
    expect(screen.getByText(longText)).toBeInTheDocument(); // Full text should now be displayed
    expect(screen.getByRole('button', { name: 'Show Less' })).toBeInTheDocument(); // Button text should change to "Show Less"
  });

  it('should collapse text when "Show Less" button is clicked', () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole('button', { name: 'Show More' });
    fireEvent.click(showMoreButton); // Expand first
    const showLessButton = screen.getByRole('button', { name: 'Show Less' });
    fireEvent.click(showLessButton); // Collapse again
    expect(screen.getByText(`${longText.substring(0, 255)}...`)).toBeInTheDocument(); // Truncated text should be displayed again
    expect(screen.getByRole('button', { name: 'Show More' })).toBeInTheDocument(); // Button text should revert to "Show More"
  });
});

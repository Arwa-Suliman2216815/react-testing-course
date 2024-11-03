import { it, expect, describe } from 'vitest';
// "itr" vvvv
import { render, screen } from '@testing-library/react'
import Greet from '../../src/components/Greet';

describe('Greet', () => {
    it('should render Hello with the name when name is provided', () => {
        render(<Greet name="Arwa Magdy"/>);

       const heading = screen.getByRole("heading");
       expect(heading).toBeInTheDocument();
       expect(heading).toHaveTextContent(/Arwa Magdy/i)
    })

    it('should render login button when name is not provided', () => {
        render(<Greet />);

       const button = screen.getByRole("button");
       expect(button).toBeInTheDocument();
       expect(button).toHaveTextContent(/login/i)
    })
})
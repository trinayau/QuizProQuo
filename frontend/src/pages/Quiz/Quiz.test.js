import { screen } from '@testing-library/react';

import Quiz from "."

describe('Quiz', () => {
    test('it renders a div', () => {
        render(<Quiz />)
        const div = screen.getByRole('quiz-page')
        expect(div).toBeInTheDocument();
        
    })

})

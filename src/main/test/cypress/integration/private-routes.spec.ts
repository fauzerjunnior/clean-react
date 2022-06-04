import * as Helper from '../utils/helpers';

describe('Private Routes', () => {
  it('should logout if survey-list has no tokens', () => {
    cy.visit('');
    Helper.testUrl('/login');
  });
});

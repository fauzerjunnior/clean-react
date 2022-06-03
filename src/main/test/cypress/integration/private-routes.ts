import * as Helper from '../support/helpers';

describe('Private Routes', () => {
  it('should logout if survey-list has no tokens', () => {
    cy.visit('');
    Helper.testUrl('/login');
  });
});

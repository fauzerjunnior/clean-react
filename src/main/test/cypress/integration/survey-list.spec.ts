import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

export const mockUnexpectedError = (): void =>
  Http.mockServerError(/surveys/, 'GET');

export const mockAccessDeniedError = (): void =>
  Http.mockForbiddenError(/surveys/, 'GET');

export const mockSuccess = (): void =>
  Http.mockOk(/surveys/, 'GET', 'fx:survey-list');

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('');

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
  });

  it('should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('');

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
    mockSuccess();
    cy.getByTestId('reload').click();
    cy.get('li:not(empty)').should('have.length', 2);
  });

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('');

    Helper.testUrl('/login');
  });

  it('should present correct username', () => {
    mockUnexpectedError();
    cy.visit('');

    const { name } = Helper.getLocalStorageItem('account');

    cy.getByTestId('username').should('contain.text', name);
  });

  it('should logout on logout link click', () => {
    mockUnexpectedError();
    cy.visit('');

    cy.getByTestId('logout').click();
    Helper.testUrl('/login');
  });

  it('should present suvery items', () => {
    mockSuccess();
    cy.visit('');

    cy.get('li:empty').should('have.length', 4);
    cy.get('li:not(empty)').should('have.length', 2);

    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '03');
      assert.equal(li.find('[data-testid="month"]').text(), 'mai');
      assert.equal(li.find('[data-testid="year"]').text(), '2022');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1');
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp);
      });
    });

    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '04');
      assert.equal(li.find('[data-testid="month"]').text(), 'mai');
      assert.equal(li.find('[data-testid="year"]').text(), '2022');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2');
      cy.fixture('icons').then((icon) => {
        assert.equal(
          li.find('[data-testid="icon"]').attr('src'),
          icon.thumbDown
        );
      });
    });
  });
});

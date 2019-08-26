import { getGreeting } from '../support/app.po';

describe('ch01', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ch01!');
  });
});

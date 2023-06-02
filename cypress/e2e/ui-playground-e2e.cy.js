describe('Test all UI components listed on the homepage', () => {

  beforeEach(() => {
    cy.visit('/home');
  });

  it('NavBar', () => {
    cy.log('Hello! I can log during a test');

    // Get UITAP by class and assert with href
    cy.get('.navbar-brand').click();
    cy.location('href').should('eq', 'http://uitestingplayground.com/');

    // Get Home if the page contains text "Home" and assert with url
    cy.contains('Home').click();
    cy.url().should('eq', 'http://uitestingplayground.com/home');

    // Get Resources by getting the ul, finding all li elements, and find the one containing Resources. Assert partial url
    cy.get('ul').find('li').contains('Resources').click();
    cy.url().should('include', '/resources');
  });

  it('Description header', () => {

  });

  it('Dynamic ID', () => {
    
  });

});
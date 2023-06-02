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
    // Assert the title has the correct text
    cy.get('#title').should('have.text', 'UI Test AutomationPlayground');

    // Check the image successfully loaded
    cy.get('img')
      .should('be.visible') // Image is visible 
      .should('have.attr', 'src', '/static/cube.png') // assert src
      .should('have.attr', 'alt', 'Responsive image') // assert alt
      .and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0); // Check if the image has been loaded successfully
      });
  });

  it('Dynamic ID', () => {
    cy.get('a').contains('Dynamic ID').click();
    cy.url().should('include', '/dynamicid');
    cy.get('.btn').contains('Button with Dynamic ID').click();
  });

  it('Load Delay', () => {
    cy.get('a').contains('Load Delay').click(); //Cypress automatically wait 4000ms for a response.
    cy.url().should('include', '/loaddelay');
  });

  it('AJAX Data', () => {
    cy.get('a').contains('AJAX Data').click();
    cy.url().should('include', '/ajax');
    cy.get('#ajaxButton').click();
    cy.wait(15000);
    cy.get('#content').should('have.text', '\nData loaded with AJAX get request.');
  });

  it('Client Side Delay', () => {
    cy.get('a').contains('Client Side Delay').click();
    cy.url().should('include', '/clientdelay');
    cy.get('#ajaxButton').click();
    cy.wait(15000);
    cy.get('#content').should('have.text', '\nData calculated on the client side.');
  });

  it('Text Input', () => {
    cy.get('a').contains('Text Input').click();
    cy.url().should('include', '/textinput');
    cy.get('input[type="text"]').type("test"); // Get text box by element's attr
    cy.get('#updatingButton').click().should('have.text', 'test');
  });

  it('Logging in', () => {
    cy.get('a').contains('Sample App').click();
    cy.url().should('include', '/sampleapp');

    // Send a POST request with invalid credentials
    cy.request({
      method: 'POST',
      url: 'http://uitestingplayground.com/api/login',
      body: {
        username: 'invalidUsername',
        password: 'invalidPassword',
      },
      failOnStatusCode: false, // Allow the request to fail without throwing an error
    }).then((response) => {
      expect(response.status).to.equal(404); // Assert that the request was invalid (HTTP status code 404)
    });

    cy.get('input[name="UserName"]').type("test");
    cy.get('input[name="Password"]').type("pwd");
    cy.get('button[id="login"]').click();

    cy.get('#loginstatus')
      .should('have.attr', 'class', 'text-success')
      .should('have.text', 'Welcome, test!');
    cy.get('button[id="login"]').should('have.text', 'Log Out');
    cy.get('button[id="login"]').click();

    cy.get('#loginstatus')
      .should('have.attr', 'class', 'text-info')
      .should('have.text', 'User logged out.');
    cy.get('input[name="UserName"]').should('have.value', '');
    cy.get('input[name="Password"]').should('have.value', '');
    cy.get('button[id="login"]').should('have.text', 'Log In');
  });
});
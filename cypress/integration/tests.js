describe("Testing the chatapp", () => {

  it("Visit localhost:3000", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Type Hritik in input field & click join", () => {
    cy.get('input').type('Hritik',{delay: 100});
    cy.get('button').click();
  });

  it("Checking if users list contain Hritik", () => {
    cy.get('.users').should('contain','Hritik');
  });

  it("Checking if messages contain 'Welcome to chatbox'",() => {
    cy.get('.messages > .message').should('contain','Welcome to chatbox');
  });

  it("Going to message box , type 'Hello' , click on button & checking if messages contain 'Hello' from 'Hritik'", () => {
    cy.get('#msg').type('Hello');
    cy.get('#message-form > button').click();
    cy.get('.messages').should('contain','Hritik').and('contain','Hello');
  });

  it("Visiting localhost:3000 in new tab entering Jayam as username", () => {
    cy.openTab("http://localhost:3000/chatbox.html?username=Jayam", {tab_name:"newtab"});
    cy.tabVisit("http://localhost:3000/chatbox.html?username=Jayam", "newtab");
    cy.switchToTab("newtab");
  });

  it("Checking if Hritik & Jayam both are present in users list", () => {
    cy.get('.users').should('contain','Hritik').and('contain', 'Jayam');
  });

  it("Going to message box , type Hi , click on button & closing current tab & going back to Hritik", () => {
    cy.get('#msg').type('Hi',{delay: 100});
    cy.get('#message-form > button').click();
    cy.closeTab("newtab");
  });

  it("Checking for message 'Jayam has joined the chat'", () => {
    cy.get('.messages > .message').should('contain','Jayam').and('contain','Jayam has joined the chat');
  });

  it("Checking for message 'Hi' from Jayam", () => {
    cy.get('.messages > .message').should('contain', 'Hi');
  });

  it("Checking for message Jayam has left the chat'", () => {
    cy.get('.messages > .message').should('contain', 'Jayam has left the chat');
  });

})

export class FinancrooModalPage {
  private readonly closeIcon: string = `#close-icon`
  private readonly modalContentLabel: string = `#modal-content`
  private readonly cancelButton: string = `#cancel-button`
  private readonly startInvestingButton: string = `#start-investing-button`

  public assertThatModalIsDisplayed(): void {
    this.interceptAccountsRequest()
    cy.get(this.closeIcon).should('be.visible');
    cy.get(this.modalContentLabel).should('contain.text', 'Your Go Bank account(s) has been successfully connected to Financroo');
    cy.get(this.cancelButton).should('have.text', 'Cancel');
    cy.get(this.startInvestingButton).should('have.text', 'Start investing');
  }

  public close(): void {
    cy.get(this.closeIcon).click();
    this.assertThatModalIsNotDisplayed();
  }

  public cancel(): void {
    cy.get(this.cancelButton).click();
    this.assertThatModalIsNotDisplayed();
  }

  public startInvesting(): void {
    cy.get(this.startInvestingButton).click()
  }

  private assertThatModalIsNotDisplayed(): void {
    cy.get(this.closeIcon).should('not.exist');
    cy.get(this.modalContentLabel).should('not.exist');
    cy.get(this.cancelButton).should('not.exist');
    cy.get(this.startInvestingButton).should('not.exist');
  }

  private interceptAccountsRequest(): void {
    // Wait for accounts data to be visible on the page instead of intercepting
    // The intercept approach doesn't work reliably when the request may have already completed
    cy.get(this.modalContentLabel, { timeout: 10000 }).should('be.visible')
  }

}

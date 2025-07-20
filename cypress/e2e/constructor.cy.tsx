/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  const bunName = 'Краторная булка N-200i';
  const fillingName = 'Филе Люминесцентного тетраодонтимформа';

  before(() => {
    Cypress.on('window:before:load', (win) => {
      win.addEventListener('DOMContentLoaded', () => {
        const iframe = win.document.getElementById('webpack-dev-server-client-overlay');
        if (iframe) {
          iframe.style.display = 'none';
        }
      });
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user',    { fixture: 'auth.json' }).as('getUser');
    cy.intercept('POST','**/orders',       { fixture: 'order.json' }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку и начинку в конструктор', () => {
    // бука
    cy.contains(bunName)
      .parents('[data-test="ingredient-card"]')
      .within(() => {
        cy.get('[data-test="add-button"]').click();
      });

    cy.get('[data-test="constructor-bun-drop-zone"]')
      .contains(`${bunName} (верх)`).should('be.visible');

    // начинка
    cy.contains(fillingName)
      .parents('[data-test="ingredient-card"]')
      .within(() => {
        cy.get('[data-test="add-button"]').click();
      });

    cy.get('[data-test="constructor-filling-drop-zone"]')
      .contains(fillingName).should('be.visible');
  });

  it('открывает и закрывает модалку ингредиента', () => {
    // открывание
    cy.contains(fillingName)
      .parents('[data-test="ingredient-card"]')
      .find('[data-test="ingredient-link-main"]')
      .click();

    cy.get('[data-test="modal"]').should('be.visible');
    cy.get('[data-test="modal-title"]').contains('Детали ингредиента');

    // крестик
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should('not.exist');

    // оверлей
    cy.contains(fillingName)
      .parents('[data-test="ingredient-card"]')
      .find('[data-test="ingredient-link-main"]')
      .click();

    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('[data-test="modal"]').should('not.exist');
  });

  it('оформляет заказ и очищает конструктор', () => {
    // прокидываем фейковые токены
    cy.setCookie('accessToken', 'fake-access-token');
    window.localStorage.setItem('refreshToken', 'fake-refresh-token');

    // сборка бургера
    cy.contains(bunName)
      .parents('[data-test="ingredient-card"]')
      .within(() => {
        cy.get('[data-test="add-button"]').click();
      });
    cy.contains(fillingName)
      .parents('[data-test="ingredient-card"]')
      .within(() => {
        cy.get('[data-test="add-button"]').click();
      });

    // делаем заказ и проверяем его номер
    cy.get('[data-test="order-button"]').click();
    cy.wait('@getUser');
    cy.wait('@createOrder');
    cy.get('[data-test="modal"]').should('be.visible');
    cy.get('[data-test="order-number"]').contains('1234');

    // закрываемм модалку и убеждаемся что конструктор пуст
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
    cy.get('[data-test="constructor-ingredient"]').should('have.length', 0);

    // убираем токены
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });
});
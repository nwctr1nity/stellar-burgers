/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  const bunName = 'Краторная булка N-200i';
  const fillingName = 'Филе Люминесцентного тетраодонтимформа';

  const ingredientCardSelector = '[data-test="ingredient-card"]';
  const addButtonSelector = '[data-test="add-button"]';
  const bunDropZoneSelector = '[data-test="constructor-bun-drop-zone"]';
  const fillingDropZoneSelector = '[data-test="constructor-filling-drop-zone"]';
  const ingredientLinkSelector = '[data-test="ingredient-link-main"]';
  const modalSelector = '[data-test="modal"]';
  const modalTitleSelector = '[data-test="modal-title"]';
  const modalCloseSelector = '[data-test="modal-close"]';
  const modalOverlaySelector = '[data-test="modal-overlay"]';
  const orderButtonSelector = '[data-test="order-button"]';
  const orderNumberSelector = '[data-test="order-number"]';
  const constructorIngredientSelector = '[data-test="constructor-ingredient"]';

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
    // булка
    cy.contains(bunName)
      .parents(ingredientCardSelector)
      .within(() => {
        cy.get(addButtonSelector).click();
      });

    cy.get(bunDropZoneSelector)
      .contains(`${bunName} (верх)`).should('be.visible');

    // начинка
    cy.contains(fillingName)
      .parents(ingredientCardSelector)
      .within(() => {
        cy.get(addButtonSelector).click();
      });

    cy.get(fillingDropZoneSelector)
      .contains(fillingName).should('be.visible');
  });

  it('открывает и закрывает модалку ингредиента', () => {
    // открывание
    cy.contains(fillingName)
      .parents(ingredientCardSelector)
      .find(ingredientLinkSelector)
      .click();

    cy.get(modalSelector).should('be.visible');
    cy.get(modalTitleSelector).contains('Детали ингредиента');

    // крестик
    cy.get(modalCloseSelector).click();
    cy.get(modalSelector).should('not.exist');

    // оверлей
    cy.contains(fillingName)
      .parents(ingredientCardSelector)
      .find(ingredientLinkSelector)
      .click();

    cy.get(modalOverlaySelector).click({ force: true });
    cy.get(modalSelector).should('not.exist');
  });

  it('оформляет заказ и очищает конструктор', () => {
    // сборка бургера
    cy.contains(bunName)
      .parents(ingredientCardSelector)
      .within(() => {
        cy.get(addButtonSelector).click();
      });
    cy.contains(fillingName)
      .parents(ingredientCardSelector)
      .within(() => {
        cy.get(addButtonSelector).click();
      });

    // делаем заказ и проверяем его номер
    cy.get(orderButtonSelector).click();
    cy.wait('@getUser');
    cy.wait('@createOrder');
    cy.get(modalSelector).should('be.visible');
    cy.get(orderNumberSelector).contains('1234');

    // закрываем модалку и убеждаемся, что конструктор пуст
    cy.get(modalCloseSelector).click();
    cy.get(modalSelector).should('not.exist');
    cy.get(constructorIngredientSelector).should('have.length', 0);
  });
});

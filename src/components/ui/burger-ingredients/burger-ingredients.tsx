import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {['bun', 'main', 'sauce'].map((type) => (
            <Tab
              key={type}
              value={type}
              active={currentTab === type}
              onClick={onTabClick}
            >
              {type === 'bun' ? 'Булки' : type === 'main' ? 'Начинки' : 'Соусы'}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={styles.content}>
        {[
          {
            title: 'Булки',
            ingredients: buns,
            titleRef: titleBunRef,
            refProp: bunsRef
          },
          {
            title: 'Начинки',
            ingredients: mains,
            titleRef: titleMainRef,
            refProp: mainsRef
          },
          {
            title: 'Соусы',
            ingredients: sauces,
            titleRef: titleSaucesRef,
            refProp: saucesRef
          }
        ].map(({ title, ingredients, titleRef, refProp }) => (
          <IngredientsCategory
            key={title}
            title={title}
            titleRef={titleRef}
            ref={refProp}
            ingredients={ingredients}
          />
        ))}
      </div>
    </section>
  )
);

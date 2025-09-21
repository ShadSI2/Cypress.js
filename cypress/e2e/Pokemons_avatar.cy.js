import * as urls from "../fixtures/urls.json" // импорт файла с ссылками на сайты
import * as data from "../helpers/Passwords.json" // импорт логин и пароль
import * as login_page from "../locators/Pokemons_login_page.json"; // импорт страницы с авторизацией
import * as main_page from "../locators/Pokemons_main_page.json"; // импорт главной страницы
import * as profile_page from "../locators/Pokemons_profile_page.json"; // импорт страницы профиля
import * as shop_page from "../locators/Pokemons_shop_page.json"; // импорт страницы с покупкой аватара
import * as oplata_page from "../locators/Pokemons_oplata_page.json"; // импорт страницы с банковской оплатой
import * as verification_page from "../locators/Pokemons_3ds_page.json"; // импорт страницы с смс подтверждением
import * as payment from "../helpers/Debit_card.json" // импорт дебитовой карты

describe('Проверка пользовательного пути по покупке аватара https://pokemonbattle.ru/', function () {

   beforeEach('Начало теста', function () {
        cy.visit(urls.pokemonbattle); // переход на сайт
        cy.get(login_page.email).type(data.pokenonsLogin); // ввод логина из импорта
        cy.get(login_page.password).type(data.pokemonsPassword); // ввод пароля из импорта
        cy.get(login_page.enter_button).click(); // переход на главную страницу
        cy.get(main_page.title).should('be.visible').should('have.text', 'Покемоны') // ждет пока заголовок загрузится и станет виден
    });

    it('Переход в лавку и покупка аватара', function () {
        cy.get(main_page.profile_btn).click(); // переход в профиль
        cy.get(profile_page.text_avatar_btn).should('be.visible').should('have.text', 'Смена аватара') // ждет пока текст на кнопке смены аватара загрузится и станет виден
        cy.get(profile_page.avatar_btn).click(); // переход в магазин аватаров
        cy.get(shop_page.title).should('be.visible').should('have.text', 'Магазин') // ждет пока текст Магазин загрузится и станет виден
        cy.get('.available > button').first().click(); // кликаем Купить у первого доступного аватара
        cy.get(oplata_page.card_number).type(payment.card_number); // вводим номер карты
        cy.wait(1000); // после каждого ввода сделал вейт, так как первый прогон не проходил luhn_check, со второго прогона ошибки небыло
        cy.get(oplata_page.card_time).type(payment.card_time); // ввод срока действия карты
        cy.wait(1000);
        cy.get(oplata_page.card_cvv).type(payment.card_cvv); // ввод cvv карты
        cy.wait(1000);
        cy.get(oplata_page.card_name).type(payment.card_name); // ввод имя держателя карты
        cy.wait(1000);
        cy.get(oplata_page.pay_btn).click();
        cy.get(verification_page.title).should('be.visible').should('have.text', 'Подтверждение покупки') // ждет пока текст загрузится и станет виден
        cy.get(verification_page.sms_verification).type(payment.sms_code); // ввод смс
        cy.get(verification_page.sms_verification_btn).click();
        cy.contains('Покупка прошла успешно').should('be.visible'); // проверяем наличие и видимость сообщения об успешной покупке
    })
})

// запуск через теринал: npx cypress run с записью видео
// запуск UI: npx cypress open
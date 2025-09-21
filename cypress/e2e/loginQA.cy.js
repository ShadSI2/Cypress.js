import * as urls from "../fixtures/urls.json" // импорт файла с ссылками на сайты
import * as main_page from "../locators/LoginQA_main_page.json"; // импорт главной страницы
import * as result_page from "../locators/LoginQA_result_page.json" // импорт страницы с результатами авторизации
import * as recovety_page from "../locators/LoginQA_recovery_password_page.json" // импорт страницы восстановления пароля
import * as data from "../helpers/Passwords.json" // импорт логин и пароль

describe('Проверка авторизации https://login.qa.studio/', function () {

   beforeEach('Начало теста', function () {
         cy.visit(urls.login_qa); // переход на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки "Забыли пароль?"
    });

    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // проверка наличия крестика (должен быть видимым)
    });

   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.loginQA); // ввод логина из импорта
        cy.get(main_page.password).type(data.passwordQA); // ввод пароля из импорта
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible'); // виден текст авторизация успешно
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка что такой текст появился
    })

      it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.loginQA); // ввод логина из импорта
        cy.get(main_page.password).type('iLoveqastudio2'); // вводим неверный пароль
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible'); // виден текст такого логина или пароля нет
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка что такой текст появился
    })
    
      it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('dyadyavanya@mail.ru'); // ввод неверного логина
        cy.get(main_page.password).type(data.passwordQA); // вводим пароль из импорта
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible'); // виден текст такого логина или пароля нет
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка что такой текст появился
    })

      it('Приведение к строчным буквам в логине (есть баг, тест не будет пройден, так должно быть)', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввод логина с разным регистром
        cy.get(main_page.password).type(data.passwordQA); // вводим пароль из импорта
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible'); // виден текст такого логина или пароля нет
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка что такой текст появился
    })

      it('Валидация на наличие @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // ввод логина без @
        cy.get(main_page.password).type(data.passwordQA); // ввод пароля из импорта
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible'); // виден текст нужно исправить проблему валидации
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверка что такой текст появился
    })

       it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // переход на страницу восстановления пароля
        cy.get(recovety_page.email).type(data.loginQA); // ввод почты (логина)
        cy.get(recovety_page.send_button).click();
        cy.get(result_page.title).should('be.visible'); // виден текст отправили пароль на емайл
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверка что такой текст появился
    })
})


// запуск через теринал: npx cypress run с записью видео
// запуск UI: npx cypress open
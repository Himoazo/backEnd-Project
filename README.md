# Fetch-Burger restaurang API

Detta är ett RESTful API för att hantera ett snabbmatsrestaurangssystem. API:et har funktioner för att ta emot och hantera online-beställningar, hantera matmenyer, hantera kundkontakt samt personalanvändarkonton.

## Länk 
API:et finns [här] (https://backend-project-production-f507.up.railway.app/)

Dessa två webbplatser konsumerar API:et:
- Restaurang [Restaurang admin]( https://fetch-burger.netlify.app/) 
- [Fetch-Burger restaurang]( https://fetchburger.netlify.app/)

## Utvecklingsmiljö 
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)


## Installation 
- Klona repot: https://github.com/Himoazo/admin.git
- Installera dependencies: npm install
- Skapa MongoDB collection 
- Skapa environment variabler enligt .env.sample filen

## Användning
Alla mongoose-scheman finns i models-katalogen förutom contact-schemat som finns i contact.js i routes-katalogen.

Menu-schemat inkluderar alla underkategorier: Meals, Sides och Dipps
- GET /api/auth/ hämtar alla registrerade konton 
- GET /api/ hämtar matmenyer
- GET /api/orders hämtar alla beställningar
- GET api/contact/ hämtar alla kundmeddelanden 
- POST /api/auth/login  och /api/auth/register för att logga in eller registrera användare
- POST /api/meals eller /api/sides eller /api/dipps för att lägga till maträtter och /api/orders för att lägga till en beställning
- POST api/contact/ skickar ett meddelande 
- DELETE /api/auth/:id  raderar ett konto
- DELETE /api/meals/:id eller /api/sides/:id eller /api/dipps/:id för att radera maträtter
- DELETE /api/orders/:id för att radera en beställning
- DELETE api/contact/:id raderar ett meddelande
- PUT /api/meals/:id eller /api/sides/:id eller /api/dipps/:id för att redigera maträtt 
- PUT /api/orders/:id för att redigera en beställning


/**
 * Swagger API hujjatlashtirish konfiguratsiyasi
 * API endpointlarini avtomatik hujjatlashtirish uchun
 */
import swaggerJsdoc from 'swagger-jsdoc';

// Swagger konfiguratsiya parametrlari
const options = {
  definition: { // API ta'rifi
    openapi: '3.0.0', // OpenAPI spetsifikatsiya versiyasi
    info: { // API haqida umumiy ma'lumot
      title: 'Vacancy Task API',
      version: '1.0.0',
      description: 'API documentation for the Vacancy Task application',
    },
    servers: [ // API serverlari ro'yxati
      {
        url: '/',
        description: 'API Server',
      },
    ],
    components: { // API komponentlari
      securitySchemes: { // Xavfsizlik sxemalari
        bearerAuth: { // JWT autentifikatsiya
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [ // Standart xavfsizlik talablari
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [ // Hujjatlashtirish uchun API fayllar yo'llari
    './routes/*.js',
    './models/*.js'
  ],
};

// Swagger spetsifikatsiyasini yaratish
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

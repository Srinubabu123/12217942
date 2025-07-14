# AffordMed URL Shortener Microservice - 12217942

## Roll Number
`12217942`

##  Tech Stack
- Node.js
- Express.js
- MongoDB
- nanoid
- Custom Logging Middleware (no console.log)

## API Endpoints

### POST `/shorturls`
Create a short URL
```json```
{
  "url": "https://example.com",
  "validity": 30,
  "shortcode": "abcd1"
}

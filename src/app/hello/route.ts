import React from 'react'

/**
 * ! Route Handlers
 * * Unlike page routes, which respond with HTML content,route handlers allow you to create RESTful endpoints,
 * * giving you full control over the response.
 * 
 * * There is no overhead of having to create and configure a separate server.
 * * It means it's the same as 'node + express' but in one server.
 * 
 * * Route handlers are also great for making external API requests.
 * 
 * * Route handlers run server-side, ensuring that sensitive information like private keys remains secure and
 * * never gets shipped to the browser.
 * 
 * * Route handlers are the equivalent of API routes in Page router.
 */

export async function GET() {
  return new Response("Hello World!")
}

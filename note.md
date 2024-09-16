## Route Handlers
- Unlike page routes, which respond with HTML content,route handlers allow you to create RESTful endpoints,
  giving you full control over the response.
- There is no overhead of having to create and configure a separate server.
  It means it's the same as 'node + express' but in one server.
- Route handlers are also great for making external API requests.
- Route handlers run server-side, ensuring that sensitive information like private keys remains secure and
  never gets shipped to the browser.
- Route handlers are the equivalent of API routes in Page router.

- route.ts is the convention for Route Handlers.

  export async function GET() {
    return new Response("Hello World!")
  }

- To avoid conflict between page.tsx and route.ts in the same folder,
  put the route.ts in a different folder inside the folder of page.tsx file.

## Nested Route Handlers
- Act just as Route Pages

## GET
  export async function GET() {
    return Response()
  }

- GET is the naming convention for get request.

## POST
  export async function POST(request: Request) {
    const comment = await request.json()

    const newComment = {
      id: comments.length + 1,
      text: comment.text,
    }

    comments.push(newComment)

    return new Response(JSON.stringify(newComment), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    })
  }

- The submitted post request can be use in a function using (request: Request).

## Different uses of JSON
- return Response.json(comments)
- const comment = await request.json()
- return new Response(JSON.stringify(newComment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  })

- "return Response.json(comments)" and "return new Response(JSON.stringify(comments))" are just the same except
  "return new Response(JSON.stringify(comments))" have more control over the response.

## Dynamic Route Handlers
- The parent of params is 'context' which is the second parameter in GET function.
- The 'params' was destructured from context.

  export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
  ) {
    const foundComment = comments.find(
      (comment) => comment.id === parseInt(params.id)
    );

    return Response.json(foundComment);
  }

## Guide
- A Route Handler can have 2 parameters; the data sent from the body and the segment from the url.
- use _request since this variable has not been used.

- The comment variable is a parameter of the callback function passed to the find method.
- It represents each individual comment object in the comments array as the find method iterates over the array.
- The comment variable is automatically assigned by the find method as it executes the callback function for each element in the array.

## Patch
- Patch is used to update API.
  export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
      const body = await request.json()
      const { text } = body

      const index = comments.findIndex(
          (comment) => comment.id === parseInt(params.id)
      )
      
      comments[index].text = text

      return Response.json(comments[index])
  }

- This is used to update:
  comments[index].text = text

## Delete
- Delete is used to delete API
  export async function DELETE(
    request: Request,
  { params }: { params: { id: string } }
  ){
    const index = comments.findIndex(
      (comment) => comment.id === parseInt(params.id)
    )

    const deletedComment = comments[index]

    comments.splice(index, 1)

    return Response.json(deletedComment)
  }

- This is used to delete:
  comments.splice(index, 1)

## URL Query Parameters
  comments?query=1

  request: Request
- Type Request is a standard request API.
- Type NextRequest is used for query parameters.

- request.nextUrl.searchParams is used to access all queried parameters.
- Query Parameters are often optional but they are incredibly useful
  for implementing search, sort and pagination functionalities for your data.

## Redirects in Route Handlers
- You can redirect to another route in route handlers.
- It only works on GET
- GET doesn't have to be an async function
- It also redirect to UI

## Headers in Route Handlers
- HTTP headers represent the metadata associated with an API request and response.

# Request Headers
- These are sent by the client, such as web browser, to the server. They contain essential information
  about the request, which helps the server understand and process it correctly.

  - 'User-Agent' which identifies the browser and operating system to the server.
  - 'Accept' which indicates the content type like text, video or image formats that the client can process.
  - 'Authorization' header used by the client to authenticate itself to the server.
# Response Headers
- These are sent back from the server to the client.
  They provide information about the server and the data being sent in the response.

  - 'Content-Type' header which indicates the media type of the response. 
    It tells the client what the data type of the returned content is, 
    such as text/html for HTML, application.json for JSONdata, etc.

# Getting Header

  const requestHeader = new Headers(request.headers)
- Headers can be requested using NextRequest

  const headerList = headers()
- Headers can also be requested using headers() from next/headers

# Setting Header

  headers: {
      "Content-Type": "text/html",
  },
- Headers can be set in the Response on return.

## Cookies in Route Handlers
- Cookies are small pieces of data that a server sends to a user's web browser.
- The browser may store the cookie and send it back to the same server with later requests.

  # Cookies are mainly used for 3 purposes
  - Session management like login and shopping carts.
  - Personalization like user preferences and themes.
  - Tracking like recording and analyzing user behavior.

  How to set and get cookies inside of a route handler.
  There are 2 approaches to both setting and getting.

- Cookie is being set
  cookies().set("theme2", "light")

  headers: {
    "Set-Cookie": "theme1=dark",
  },

- Cookie is being get
  const theme1 = request.cookies.get("theme1")

  const theme2 = cookies().get("theme2")

## Caching in Route Handlers
- Route Handlers are cached by default when using the GET method with the Response Object in Nextjs.
- eg.. Time will only update when in development mode.
  But if you use "npm run build" and "npm run start", the time won't change because of caching.

  # How to opt out of caching?
  - Dynamic mode in segment Config Option.
    export const dynamic = "force-dynamic"
  - using the Request object with the GET method.
  - Employing dynamic functions like headers() and cookies().
  - Using any HTTP method other than GET.

## Middleware
- create a file named "middleware.ts" in the src directory outside of the app directory.
- middleware is the naming convention for middleware.

- Middleware in nextjs is a powerful feature that offers a robust way to intercept
  and control the flow of requests and responses within your application.
- It does this at a global level significantly enhancing features like redirection,
  URL rewrites, authentication, headers and cookies management, and more.

  # Middleware allows us to specify paths where it will be active.
  There are 2 main approaches:
  - Custom matcher config

    import { NextResponse, type NextRequest } from "next/server";

    export function middleware(request: NextRequest) {
      return NextResponse.redirect(new URL("/hello", request.url))
    }

    export const config = {
        matcher: "/profile",
    }

  - matcher is the trigger of when the middleware will be active
  

  - Conditional statements
    export function middleware(request: NextRequest) {
      if(request.nextUrl.pathname === "/profile") {
          return NextResponse.redirect(new URL("/hello", request.url))
      } 
    }
    

  - Can also use return NextResponse.rewrite(),
    which is useful tool for legacy url support or SEO Optimization.
  - Rewrite doesn't change the url, only the content.

  - Custom Headers are useful for passing additional information in responses,
    which can be leverage by client-side scripts for debugging purposes.

  - Middleware can be effectively used to manipulate both cookies and headers.

  - Middleware in nextjs allows you to effectively control and intercept the request-response cycle which
    enable redirects, url rewrites, and the manipulation of headers and cookies.
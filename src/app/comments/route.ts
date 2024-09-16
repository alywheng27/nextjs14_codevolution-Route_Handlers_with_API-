import { allComments } from "./data"

// ! return Response is required for a route handler to work.
export async function GET() {
  return Response.json(allComments)
}

export async function POST(request: Request) {
  // comment variable's value is from the request
  const comment = await request.json()

  // newComment variable's value is from the combined value of comments and comment
  const newComment = {
    id: allComments.length + 1,
    text: comment.text,
  }

  // allComments variable's value is from the data.ts
  // Inserted to comments
  allComments.push(newComment)

  return new Response(JSON.stringify(newComment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  })

  /***
   * ! Different uses of JSON
   * return Response.json(comments)
   * const comment = await request.json()
   * return new Response(JSON.stringify(newComment), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
     })
   */

}
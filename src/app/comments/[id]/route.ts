import { comments } from "../data";

// ! Dynamic Route Handlers
// ? The parent of params is 'context' which is the second parameter in GET function.
// ? The 'params' was destructured from context.
export async function GET(
  // use _request since thsi variable has not been used
  _request: Request,
  { params }: { params: { id: string } }
) {
  const foundComment = comments.find(
    /***
     * The comment variable is a parameter of the callback function passed to the find method.
     * It represents each individual comment object in the comments array as the find method iterates over the array.
     * The comment variable is automatically assigned by the find method as it executes the callback function for each element in the array.
     */
    (comment) => comment.id === parseInt(params.id)
  );

  return Response.json(foundComment);
}

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

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
  const index = comments.findIndex(
      (comment) => comment.id === parseInt(params.id)
  )

  const deletedComment = comments[index]

  comments.splice(index, 1)

  return Response.json(deletedComment)
}
  
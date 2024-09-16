import { allComments } from "../data";

// ! Dynamic Route Handlers
// ? The parent of params is 'context' which is the second parameter in GET function.
// ? The 'params' was destructured from context.
export async function GET(
  // use _request since this variable has not been used
  _request: Request,
  { params }: { params: { id: string } }
) {
  const foundComment = allComments.find((comment) => comment.id === parseInt(params.id)
    /***
     * The comment variable is a parameter of the callback function passed to the find method.
     * It represents each individual comment object in the allComments array as the find method iterates over the array.
     * The comment variable is automatically assigned by the find method as it executes the callback function for each element in the array.
     */
  );
  
  return Response.json(foundComment);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
    const body = await request.json()
    const { text } = body

    const index = allComments.findIndex(
        (comment) => comment.id === parseInt(params.id)
    )
    
    allComments[index].text = text
    
    return Response.json(allComments[index])
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
  const index = allComments.findIndex(
      (comment) => comment.id === parseInt(params.id)
  )

  const remainingComments = allComments.splice(index, 1)

  return Response.json(allComments)
}

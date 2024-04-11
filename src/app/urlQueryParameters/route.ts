import { NextRequest } from "next/server";
import { comments } from "../comments/data";

// NextRequest is used to access the query parameter
export async function GET(request: NextRequest) {
    // request.nextUrl.searchParams is used to access all queried parameters.
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query")

    /***
     *  This code is creating a new array called queryFiltered based on the value of the query variable.
     *  If query is truthy (i.e., it has a value), then it will filter the comments array and only keep the comments
        where the text property includes the value of query. The filtered comments will be assigned to the queryFiltered array.
     *  If query is falsy (i.e., it does not have a value), then the queryFiltered array will be assigned the same value as the comments array.
     */
    const filteredComments = query ? comments.filter((comment) => comment.text.includes(query)) : comments

    return Response.json(filteredComments)
}

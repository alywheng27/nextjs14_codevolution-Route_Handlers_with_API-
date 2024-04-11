import { NextRequest } from "next/server";
import { headers, cookies } from "next/headers"

export async function GET(request: NextRequest) {
    // Header is being get
    // Headers can be requested using NextRequest
    const requestHeader = new Headers(request.headers)
    // Header is being get
    // Header can also be requested using headers from next/headers
    const headerList = headers()

    // Get cookie option 1
    const theme1 = request.cookies.get("theme1")

    // Set Cookie Option 2
    cookies().set("theme2", "light")
    // Get Cookie Option 2
    const theme2 = cookies().get("theme2")

    console.log(requestHeader.get("Authorization"))
    console.log(headerList.get("Authorization"))
    console.log(theme1)
    console.log(theme2)

    return new Response("<h1>Response Header</h1>", {
        // Header is being set
        // Headers can be set in the Response on return.
        headers: {
            "Content-Type": "text/html",
            // Set Cookie Option 1
            "Set-Cookie": "theme1=dark",
        },
    })

}
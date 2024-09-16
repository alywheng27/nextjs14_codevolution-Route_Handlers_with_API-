import { redirect } from "next/navigation"

// Redirect to urlQueryParameters
// It only works on GET
// GET doesn't have to be an async function
// It also redirect to UI
export function GET(){
    redirect("/urlQueryParameters")
    // redirect("/app-ui")
}
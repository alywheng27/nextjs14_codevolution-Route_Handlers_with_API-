import { redirect } from "next/navigation"

// Redirect to urlQueryParameters
export async function GET(){
    redirect("/urlQueryParameters")
    return null;
}
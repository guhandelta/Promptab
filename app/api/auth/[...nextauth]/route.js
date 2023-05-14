import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session }){
        
    },
    async signIn({ session }){
        try {
            /* serverless -> lambda -> dynamodb
            Every NextJS route is a serverless route, which means that this is a lambda fn() that opens up only
            when it is called, so everytime it is called, it needs to spin up a server an make a connection with
            the DB. This helps to not keep the server running constantly */ 

            await connectToDB();

            // Check if a user already exists

            // Create a new user if user doesn't exist and add it to the DB 
            
            return true
        } catch (error) {
            console.log(error);            
            return false;
        }
    }
})

/*Usually this is not how it is done, unoike the usual way of exporting the http methods separately, but this is
how it is done in NextJS.*/
export { handler as GET, handler as POST };
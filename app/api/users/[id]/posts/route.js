import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"


export const GET = async (request, { params }) => {
    /* 
    The params get populated when passing any dynamic variables is passed into the URL Eg:{session?.url.id}
    id is the dynamic param in this route, so that will be available in the params under params.id
    */
    try {
        await connectToDB();

        // find({{ creator: params.id }}) => all prompts of the user with that specific id
        const prompts = await Prompt.find({ creator: params.id }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 201 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}
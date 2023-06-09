import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

// GET
// Endpoint to fetch the details of a specific prompt for purposes like editing
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
        
    } catch (error) {
        return new Response("Failed the fetch all prompt", { status: 500 });
    }
}

// PATCH 
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        //Updating the prompt & tag => existingPrompt.prompt = the new prompt that was passed into the params
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 });
    }
}

// DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        
        const prompt = await Prompt.findOneAndRemove(params.id);
        if(!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response("Prompt deleted successfully!!", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete the prompt", { status: 500 });
    }
}
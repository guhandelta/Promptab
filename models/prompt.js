import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        // THe creator will be a doc in the DB, more specifically teh user type
        type: Schema.Types.ObjectId,
        // reference for the user, one-to-many || one user - to - many prompts
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
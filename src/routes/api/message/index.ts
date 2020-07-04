import { Router } from "express";
import { MessageController } from "../../../controllers/message";

/**
 * in this lib the verbs of the route /message are configured
 */
export class MessageRoute {
    private messageController: MessageController = new MessageController();
    public router = Router();

    constructor() {
        this.router
            .post("/", this.messageController.post)
            .get("/", this.messageController.index)
            .get("/:id", this.messageController.find)
    }
}



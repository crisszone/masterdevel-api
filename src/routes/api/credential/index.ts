import { Router } from "express";
import { CredentialController } from "../../../controllers/credential";

/**
 * in this lib the verbs of the route /credential are configured
 */
export class CredentialRoute {
    private credentialController: CredentialController = new CredentialController();
    public router = Router();

    constructor() {        
        this.router
            .put("/", this.credentialController.put)
    }
}



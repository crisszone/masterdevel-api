import { Application, Router } from "express";
import { CredentialRoute } from './api/credential';
import { MessageRoute } from './api/message';

export class Routes {
    private credentialRoute = new CredentialRoute();
    private messageRoute = new MessageRoute();

    public routes(app: Application): void {
        const router = Router();
        router.use("/credential", this.credentialRoute.router);
        router.use("/message", this.messageRoute.router);

        app.use("/api", router);
    }
}
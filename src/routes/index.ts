import { Application, Router } from "express";
import { CredentialRoute } from './api/credential';
import { MessageRoute } from './api/message';
import { SessionAuthorizationMiddleware } from '../middleware/authentication';

export class Routes {
    private credentialRoute = new CredentialRoute();
    private messageRoute = new MessageRoute();
    private sessionAuthorizationMiddleware = new SessionAuthorizationMiddleware();

    public routes(app: Application): void {
        const router = Router({mergeParams: true});
        router.use("/credential", this.credentialRoute.router);
        router.use("/message", this.sessionAuthorizationMiddleware.validAuthorization, this.messageRoute.router);

        app.use("/api", router);
    }
}
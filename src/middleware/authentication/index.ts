import { Request, Response, NextFunction } from "express";
import * as crypto from "crypto";
import { credentialFeature } from '../../controllers/credential/feature';

const ERROR_SESSION = 'Session invalid';

export class SessionAuthorizationMiddleware {
    public async validAuthorization(req: Request, res: Response, next: NextFunction) {
        try {
            let key: string,
                route: string,
                signature: string,
                url,
                signatureValidate,
                data,
                credential: Credential;


            key = <string>req.headers["x-key"];
            route = <string>req.headers["x-route"];
            signature = <string>req.headers["x-signature"];
            url = req.originalUrl;

            // find credential by header key
            credential = credentialFeature.findByKey(key);

            // validate if exist credential in storage
            if (!credential) return res.status(403).json(({ message: `${ERROR_SESSION}` }));

            data = `${key};${url};${JSON.stringify(req.body)}`;

            // Calculate signature.
            signatureValidate = crypto
                .createHmac("sha256", credential.shared_secret)
                .update(data)
                .digest("hex");

            console.log({ headers: req.headers, signatureValidate, url, data });
            // Compare signatures.
            if (signatureValidate === signature) next();
            else return res.status(403).json(({ message: `${ERROR_SESSION}` }));

        } catch (error) {
            return res.status(500).json(({ message: `${ERROR_SESSION}: ${error}` }));
        }
    }
}
import { Request, Response } from 'express';
import { credentials } from '../../model/credential';
import { credentialFeature } from './feature';

const ERROR_403 = 'Forbidden';
const ERROR_NOT_LOAD = 'Credential does not load';
const ERROR_INVALID_PARAMS = 'Parameters are invalid';

export class CredentialController {
    /**
     * PUT Controller for /credential routes
     * In this method credential are inserted into the server storage
     * @param req 
     * @param res 
     */
    public put(req: Request, res: Response) {
        try {
            let credentialNew: Credential = req.body
            // validating params
            if (!credentialNew.key || !credentialNew.shared_secret)
                return res.status(400).json(({ message: `${ERROR_INVALID_PARAMS}` }));
            // find in server storage
            let credentialStored = credentialFeature.findByKey(credentialNew.key);
            // validate if exist credential in storage
            if (credentialStored) {
                // return error
                return res.status(403).json(({ message: `${ERROR_403}` }));
            } else {
                // insert credential in server storage
                credentials.push(credentialNew);
                // return result
                return res.status(204).send();
            }
        } catch (error) {
            return res.status(500).json(({ message: `${ERROR_NOT_LOAD}: ${error}` }));
        }
    }
}
import { credentials } from '../../model/credential';

class CredentialFeature {
    /**
     * find credential by key
     * @param key 
     */
    findByKey(key: string): Credential {
        // find in server storage
        let credentialStored = credentials.find(credential => key == credential.key);
        return credentialStored;
    }
}

export const credentialFeature = new CredentialFeature();

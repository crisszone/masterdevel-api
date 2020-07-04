import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { messages } from '../../model/message';

const ERROR_NOT_LOAD = 'Messages does not load';
const ERROR_NOT_FOUND = 'Messages not found';
const ERROR_INVALID_PARAMS = 'Parameters are invalid';

export class MessageController {
    /**
     * POST Controller for /message routes
     * In this method messages are inserted into the server storage
     * @param req 
     * @param res 
     */
    public post(req: Request, res: Response) {
        try {
            let messageNew: Message = req.body
            // validate parameters
            if (!messageNew.msg || !messageNew.tags || !messageNew.tags.length)
                return res.status(400).json(({ message: `${ERROR_INVALID_PARAMS}` }));
            // create UUID for message
            let _id = uuidv4();
            // insert message in server storege
            messages.push(Object.assign({ _id }, messageNew));
            console.error(messageNew, messages);
            // return result
            return res.status(200).send({ id: _id })
        } catch (error) {
            return res.status(500).json(({ message: `${ERROR_NOT_LOAD}: ${error}` }));
        }
    }
    /**
     * GET Controller for /message/id/:id
     * In this method searches messages by ID
     * @param req 
     * @param res 
     */
    getById(req: Request, res: Response) {
        try {
            let id = req.params.id;
            // find the message by id
            let message = messages.find(message => message._id == id);
            // if not exist return error
            if (!message) return res.status(404).json({ message: ERROR_NOT_FOUND });
            // if exist return message
            return res.status(200).json(message)
        } catch (error) {
            return res.status(500).json(({ message: `${ERROR_NOT_LOAD}: ${error}` }));
        }
    }
    /**
     * GET Controller for /message/tag/:tag
     * In this method searches messages by tag
     * @param req 
     * @param res 
     */
    getByTag(req: Request, res: Response) {
        try {
            let tag = req.params.tag;
            // find the messages by tag
            let results = messages.filter(message => !!(message.tags.indexOf(tag) >= 0));
            // if not exist return error
            if (!results || !results.length) return res.status(404).json({ message: ERROR_NOT_FOUND });
            // if exist return message
            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json(({ message: `${ERROR_NOT_LOAD}: ${error}` }));
        }
    }
}
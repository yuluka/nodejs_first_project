import { Request, Response } from "express";
import userService from "../services/user.service";
import { UserDocument, UserInput } from "../models/user.models";
import bcrypt from 'bcrypt';

class UserController {

    public async create(req: Request, res: Response) {
        try {
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);

            req.body.password = await bcrypt.hash(req.body.password, 10);

            if(userExists) {
                return res.status(400).json({message: "User already exists"});
            }

            const user: UserDocument = await userService.create(req.body as UserInput)

            return res.status(201).json(user);

        } catch (error) {
            throw error;
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);

            if(!user) {
                return res.status(404).json({message: "user not found"});
            }

            return res.status(202).json(user);

        } catch(error) {
            throw res.status(500).json({error});
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const userExists: UserDocument | null = await userService.findById(req.params.id);

            if(!userExists) {
                return res.status(404).json({message: "User doesn't exists"});
            }

            if(req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const updatedUser: UserDocument | null = await userService.update(req.params.id, req.body);

            return res.status(200).json(updatedUser);

        } catch (error) {
            throw error;
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const userExists: UserDocument | null = await userService.findById(req.params.id);

            if(!userExists) {
                return res.status(404).json({message: "User doesn't exists"});
            }

            const user : UserDocument | null = await userService.delete(req.params.id);

            return res.status(200).json({message:"user has been deleted", user});

        } catch (error) {
            throw error;
        }
    }

    public getUsers(req: Request, res: Response) {
        const users = res.json('Hello world');
        res.json(users);
    }

}

export default new UserController();
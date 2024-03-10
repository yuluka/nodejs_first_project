import { error } from "console";
import UserModel, {UserInput, UserDocument} from "../models/user.models"

class UserService {

    public async findById(id: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error;
        }

    }

    public async findByEmail(email: String): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOne({email});
            return user;
        }  catch  (error) {
            throw error;
        }
    }

    public async create(userInput: UserInput): Promise<UserDocument> {
        try {
            const user = await UserModel.create(userInput);
            return user;
            
        } catch (error) {
            throw error;
        }
    }

    public async update(id: String, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findOneAndUpdate({_id: id}, userInput, {
                returnOriginal : false
            });

            return user;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: String): Promise<UserDocument | null> {
        try {
            return await UserModel.findOneAndDelete({_id: id});
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find();
            return users;
            
        } catch (error) {
            throw error;
        }
    }

}

export default new UserService();
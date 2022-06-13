import { HandledResponse, PasswordChangeDTO, UserDTO } from "client/disheap"
import { UserModel } from "client/disheap/models/UserModel"

export default interface IUserApi {

    getUserByEmail(email: string): Promise<UserModel>

    getUserById(id: string): Promise<UserModel>

    saveUser(UserDTO: UserDTO): Promise<UserModel>

    updateUser(id: string, UserDTO: UserDTO): Promise<HandledResponse>

    updateUserPassword(id: string, paswordDTO: PasswordChangeDTO): Promise<HandledResponse>

    updateUserEmail(id: string, email: string): Promise<HandledResponse>

    deleteUser(id: string): Promise<UserModel>

}
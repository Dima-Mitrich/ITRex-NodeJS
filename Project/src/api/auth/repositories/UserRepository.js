export default class UserRepository {
    constructor(model) {
        this.model = model;
    }

    async addNewUser(user) {
        await this.model.create({
            user_id: user.userID,
            password: user.password,
        });

        return user;
    }

    async getUser(userID) {
        const user = await this.model.findByPk(userID);

        return user;
    }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User";

export default class AuthController {
    public async register({request, response}:HttpContextContract){
        const payload = schema.create({
            email: schema.string({},[
                rules.email(),
                rules.unique({table: 'users', column: 'email'})
            ]),
            password : schema.string({},[
                rules.confirmed()
            ])
        })

        const data = await request.validate({schema: payload});
        const user = await User.create(data)
        return response.created(user)
    }

    public async login({request, response, auth}:HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.attempt(email,password)
        return token.toJSON();
    }
}

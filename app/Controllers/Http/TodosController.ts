import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from "App/Models/Todo";

export default class TodosController {
    public async index({request}){
        // const page = request.input('page',1); to get only 2 items per page pass /
        // const limit  = request.input('per_page',2)

        // to get only id an title
        // const todos = await Todo.all()
        // return todos.map(todo => todo.serialize({fields: ['id','title']}))
        
        return Todo.all();
    }
    public async store({request,response}: HttpContextContract){
        Todo.create({title: request.input('title'), is_completed: false})
        return response.status(201).send({'created':true})
    }

    public async update({request,response,params}: HttpContextContract){
        const todo = await Todo.findOrFail(params.id);
        todo.is_completed = request.input('is_completed');
        todo.save()
        response.status(202).send(todo);
    }
}

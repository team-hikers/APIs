"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const todo_entity_1 = require("./entity/todo.entity");
const typeorm_2 = require("@nestjs/typeorm");
let TodosService = class TodosService {
    constructor(todoRepository, connection) {
        this.todoRepository = todoRepository;
        this.connection = connection;
    }
    async findAllTodos(username) {
        return await this.todoRepository.find({ where: { author: username } });
    }
    async createTodo(username, createTodoInput) {
        const lastTodo = await this.todoRepository
            .createQueryBuilder()
            .where('author = :username', { username })
            .orderBy('sequence', 'DESC')
            .getOne();
        const sequence = lastTodo ? lastTodo.sequence + 1 : 1;
        const todo = this.todoRepository.create(Object.assign(Object.assign({}, createTodoInput), { author: username, sequence }));
        return await this.todoRepository.save(todo);
    }
    async updateTodo(username, updateTodoInput) {
        const todo = await this.todoRepository.findOneByOrFail({
            id: updateTodoInput.id,
            author: username,
        });
        const newTodo = await this.todoRepository.save(Object.assign(Object.assign({}, todo), updateTodoInput));
        return newTodo;
    }
    async deleteTodo(username, deleteTodoInput) {
        const todo = await this.todoRepository.findOneByOrFail({
            id: deleteTodoInput.id,
            author: username,
        });
        await this.todoRepository
            .createQueryBuilder()
            .where('author = :author', { author: username })
            .andWhere('id = :id', { id: deleteTodoInput.id })
            .delete()
            .execute();
        return todo;
    }
    async updateSequence(username, updateSequenceInput) {
        const { from, to } = updateSequenceInput;
        if (from == to) {
            return this.findAllTodos(username);
        }
        const [From, To] = await Promise.all([
            this.todoRepository.findOneByOrFail({ author: username, id: from }),
            this.todoRepository.findOneByOrFail({ author: username, id: to }),
        ]);
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            if (from < to) {
                await queryRunner.manager
                    .getRepository(todo_entity_1.Todo)
                    .createQueryBuilder()
                    .update()
                    .set({ sequence: () => 'sequence - 1' })
                    .where('author = :username', { username })
                    .andWhere('sequence > :from', { from: From.id })
                    .andWhere('sequence <= :to', { to: To.id })
                    .execute();
            }
            else {
                await queryRunner.manager
                    .getRepository(todo_entity_1.Todo)
                    .createQueryBuilder()
                    .update()
                    .set({ sequence: () => 'sequence + 1' })
                    .where('userId = :username', { username })
                    .andWhere('sequence > :from', { from: From.id })
                    .andWhere('sequence <= :to', { to: To.id })
                    .execute();
            }
            await queryRunner.manager
                .getRepository(todo_entity_1.Todo)
                .createQueryBuilder()
                .update()
                .set({ sequence: To.sequence })
                .where('id = :from', { from })
                .execute();
            await queryRunner.commitTransaction();
            return await this.findAllTodos(username);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Connection])
], TodosService);
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map
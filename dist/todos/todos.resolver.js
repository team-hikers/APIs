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
exports.TodosResolver = void 0;
const jwt_guard_1 = require("./../auth/guard/jwt.guard");
const todo_entity_1 = require("./entity/todo.entity");
const graphql_1 = require("@nestjs/graphql");
const todos_service_1 = require("./todos.service");
const create_todo_input_type_1 = require("./dto/create-todo.input-type");
const common_1 = require("@nestjs/common");
const delete_todo_input_type_1 = require("./dto/delete-todo.input-type");
const update_todo_input_type_1 = require("./dto/update-todo.input-type");
const update_sequence_input_type_1 = require("./dto/update-sequence.input-type");
let TodosResolver = class TodosResolver {
    constructor(todosService) {
        this.todosService = todosService;
    }
    findAllTodos(context) {
        const { username } = context.user;
        return this.todosService.findAllTodos(username);
    }
    createTodo(context, createTodoInput) {
        const { username } = context.user;
        return this.todosService.createTodo(username, createTodoInput);
    }
    deleteTodo(context, deleteTodoInput) {
        const { username } = context.user;
        return this.todosService.deleteTodo(username, deleteTodoInput);
    }
    updateTodo(context, updateTodoInput) {
        const { username } = context.user;
        return this.todosService.updateTodo(username, updateTodoInput);
    }
    updateSequence(context, updateSequenceInput) {
        const { username } = context.user;
        return this.todosService.updateSequence(username, updateSequenceInput);
    }
};
__decorate([
    (0, graphql_1.Query)((type) => [todo_entity_1.Todo]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodosResolver.prototype, "findAllTodos", null);
__decorate([
    (0, graphql_1.Mutation)((type) => todo_entity_1.Todo),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('createTodoInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_todo_input_type_1.CreateTodoInput]),
    __metadata("design:returntype", void 0)
], TodosResolver.prototype, "createTodo", null);
__decorate([
    (0, graphql_1.Mutation)((type) => todo_entity_1.Todo),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('deleteTodoInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_todo_input_type_1.DeleteTodoInput]),
    __metadata("design:returntype", void 0)
], TodosResolver.prototype, "deleteTodo", null);
__decorate([
    (0, graphql_1.Mutation)((type) => todo_entity_1.Todo),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('updateTodoInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_todo_input_type_1.UpdateTodoInput]),
    __metadata("design:returntype", void 0)
], TodosResolver.prototype, "updateTodo", null);
__decorate([
    (0, graphql_1.Mutation)((type) => [todo_entity_1.Todo]),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('updateSequenceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_sequence_input_type_1.UpdateSequenceInput]),
    __metadata("design:returntype", void 0)
], TodosResolver.prototype, "updateSequence", null);
TodosResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosResolver);
exports.TodosResolver = TodosResolver;
//# sourceMappingURL=todos.resolver.js.map
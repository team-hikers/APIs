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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const user_entity_1 = require("./../../users/entity/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let Todo = class Todo {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        type: 'int',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        name: 'content',
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Todo.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    (0, typeorm_1.Column)({
        name: 'isComplete',
        type: 'tinyint',
        unsigned: true,
        width: 1,
        default: () => 0,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Todo.prototype, "isComplete", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    (0, typeorm_1.Column)({
        name: 'sequence',
        type: 'int',
        unsigned: true,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Todo.prototype, "sequence", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'author',
        type: 'varchar',
        nullable: false,
    }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Todo.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.todos),
    (0, typeorm_1.JoinColumn)([{ name: 'author', referencedColumnName: 'username' }]),
    (0, graphql_1.Field)((type) => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Todo.prototype, "user", void 0);
Todo = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Index)('author', ['author', 'sequence']),
    (0, typeorm_1.Entity)()
], Todo);
exports.Todo = Todo;
//# sourceMappingURL=todo.entity.js.map
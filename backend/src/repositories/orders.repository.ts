import {
    GetCommand,
    PutCommand,
    ScanCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { dynamo } from '../config/dynamodb.js';
import type { Order, OrderStatus } from '../models/order.js';

const tableName = process.env.ORDERS_TABLE!;

export class OrdersRepository {
    async create(order: Order): Promise<Order> {
        await dynamo.send(
            new PutCommand({
                TableName: tableName,
                Item: order,
            })
        );

        return order;
    }

    async findAll(): Promise<Order[]> {
        const response = await dynamo.send(
            new ScanCommand({
                TableName: tableName,
            })
        );

        return (response.Items as Order[] | undefined) ?? [];
    }

    async findById(id: string): Promise<Order | null> {
        const response = await dynamo.send(
            new GetCommand({
                TableName: tableName,
                Key: { id },
            })
        );

        return (response.Item as Order | undefined) ?? null;
    }

    async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
        const existing = await this.findById(id);

        if (!existing) {
            return null;
        }

        const response = await dynamo.send(
            new UpdateCommand({
                TableName: tableName,
                Key: { id },
                UpdateExpression: 'SET #status = :status',
                ExpressionAttributeNames: {
                    '#status': 'status',
                },
                ExpressionAttributeValues: {
                    ':status': status,
                },
                ReturnValues: 'ALL_NEW',
            })
        );

        return (response.Attributes as Order | undefined) ?? null;
    }
}
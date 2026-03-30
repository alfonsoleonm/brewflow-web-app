import {
    GetCommand,
    PutCommand,
    ScanCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { dynamo } from '../config/dynamodb.js';
import type { Product } from '../models/product.js';

const tableName = process.env.PRODUCTS_TABLE!;

export class ProductsRepository {
    async create(product: Product): Promise<Product> {
        await dynamo.send(
            new PutCommand({
                TableName: tableName,
                Item: product,
            })
        );

        return product;
    }

    async findAll(): Promise<Product[]> {
        const response = await dynamo.send(
            new ScanCommand({
                TableName: tableName,
            })
        );

        return (response.Items as Product[] | undefined) ?? [];
    }

    async findById(id: string): Promise<Product | null> {
        const response = await dynamo.send(
            new GetCommand({
                TableName: tableName,
                Key: { id },
            })
        );

        return (response.Item as Product | undefined) ?? null;
    }

    async updateAvailability(id: string, available: boolean): Promise<Product | null> {
        const existing = await this.findById(id);

        if (!existing) {
            return null;
        }

        const response = await dynamo.send(
            new UpdateCommand({
                TableName: tableName,
                Key: { id },
                UpdateExpression: 'SET available = :available',
                ExpressionAttributeValues: {
                    ':available': available,
                },
                ReturnValues: 'ALL_NEW',
            })
        );

        return (response.Attributes as Product | undefined) ?? null;
    }
}
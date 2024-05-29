import request from 'supertest';
import app from '../src';
import mongoose from "mongoose";

describe('Feedback API', () => {
    it('should submit feedback', async () => {
        const response = await request(app)
            .post('/api/feedback')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                type: 'Bug',
                message: 'Test feedback message',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('should not submit feedback with invalid data', async () => {
        const response = await request(app)
            .post('/api/feedback')
            .send({
                name: 'John Doe',
                email: 'invalid_email', // Invalid email format
                type: 'Bug',
                message: '', // Missing message field
            });

        expect(response.status).toBe(400);
    });

    it('should retrieve feedback', async () => {
        const response = await request(app).get('/api/feedback');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.results)).toBeTruthy();
    });

    it('should retrieve paginated feedback', async () => {
        const response = await request(app).get('/api/feedback?page=1&limit=1');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.results)).toBeTruthy();
        expect(response.body.currentPage).toBe(1);
        expect(response.body.pageSize).toBe(1);
        expect(response.body.results.length).toBe(1);
    });

    it('should filter feedback by type', async () => {
        const response = await request(app).get('/api/feedback?type=Bug');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.results)).toBeTruthy();
        // Check if all feedback entries have the type 'Bug'
        expect(response.body.results.every((feedback: any) => feedback.type === 'Bug')).toBeTruthy();
    });

    it('should sort feedback by date', async () => {
        const response = await request(app).get('/api/feedback?sortBy=createdAt&order=asc');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.results)).toBeTruthy();
        // Check if feedback entries are sorted in ascending order by creation date
        expect(isSortedByDate(response.body.results, 'asc')).toBeTruthy();
    });

    it('should handle errors when retrieving feedback', async () => {
        // Mock an error scenario (e.g., invalid database connection)
        jest.spyOn(mongoose.Model, 'countDocuments').mockImplementation(() => { throw new Error('Database connection error'); });

        const response = await request(app).get('/api/feedback');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Error retrieving feedback');
    });
});


function isSortedByDate(feedbacks: any[], order: 'asc' | 'desc'): boolean {
    for (let i = 1; i < feedbacks.length; i++) {
        if (order === 'asc' && new Date(feedbacks[i].createdAt) < new Date(feedbacks[i - 1].createdAt)) {
            return false;
        }
        if (order === 'desc' && new Date(feedbacks[i].createdAt) > new Date(feedbacks[i - 1].createdAt)) {
            return false;
        }
    }
    return true;
}

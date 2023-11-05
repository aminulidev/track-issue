import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255).optional(),
    description: z.string().min(1, 'Description is required!').max(65533).optional()
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255).optional(),
    description: z.string().min(1, 'Description is required!').max(65533).optional(),
    assignedToUserID: z.string().min(1, 'assignedToUserID is required!').max(255).optional().nullable()
});


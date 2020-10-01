import { number, string } from 'sontaran';

export const nameSchema = string().notEmpty().min(3);
export const numberSchema = number().min(1).max(3);

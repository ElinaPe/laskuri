import { z } from 'zod';

const ContainerSchema = z.object({
	title: z.string().optional()
});

const Mark = z.object({
	value: z.number(),
	label: z.string(),
});

const Variable = z.object({
	variable: z.string(),
	value: z.string(),
	defaultValue: z.number()
})

export const Field = z.object({
	name: z.string(),
	variable: z.string(),
	controlType: z.enum(["type", "slider"]),
	type: z.string(),
	min: z.number().optional(),
	max: z.number().optional(),
	marks: z.array(Mark).optional(),
});

export const CalculatorSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional().nullable(),
	fields: z.array(Field).optional(),
	variables: z.array(Variable).optional(),
	formula: z.string(),
	result: z.object({
		name: z.string(),
		type: z.string(),
		ending: z.string(),
	}),
	cssClasses: z.array(z.string()).optional(),
});

export const RootSchema = z.object({
	Container: ContainerSchema,
	Laskurit: z.array(CalculatorSchema),
});

export const CalculatorsSchema = z.array(CalculatorSchema)

const InputValues = z.record(z.string(), z.record(z.string(), z.number()));

const Results = z.record(z.string(), z.number());

const Variables = z.record(z.string(), z.number());

export type Field = z.infer<typeof Field>;
export type Calculator = z.infer<typeof CalculatorSchema>;
export type InputValues = z.infer<typeof InputValues>;
export type Results = z.infer<typeof Results>;
export type Variables = z.infer<typeof Variables>;

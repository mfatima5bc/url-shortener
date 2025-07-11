import { UseCaseError } from "@/core/errors/use-case-error";

export class BaseUseCaseError extends Error implements UseCaseError {}

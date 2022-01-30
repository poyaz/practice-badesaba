export const IDENTIFIER_GENERATOR = 'IDENTIFIER_GENERATOR';

export interface IIdentifierGenerator {
  generateId(): string;
}

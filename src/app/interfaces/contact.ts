type TypeElement = 'url' | 'icon' | 'email';

export interface IContact {
  title: string,
  type: TypeElement,
  value: string,
};
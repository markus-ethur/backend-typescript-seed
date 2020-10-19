import { Column, Table } from '@wwwouter/typed-knex';
export type Test = {
  id: number;
  name: string;
};

export interface TestRow {
  readonly id: number;
  readonly name?: string;
}

@Table('test')
export class TestModel {
  @Column({ primary: true })
  public id!: number;

  @Column()
  public name!: string;
}

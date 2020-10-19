import { Column, Table } from '@wwwouter/typed-knex';
import { Model } from './model';

export type Test = {
  id: number;
  name: string;
};

@Table('test')
export class TestModel extends Model<Test> {
  constructor() {
    super(TestModel);
  }

  @Column({ primary: true })
  public id!: number;

  @Column()
  public name!: string;
}

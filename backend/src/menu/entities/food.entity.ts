import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column({ nullable: false })
  description: string;
  @Column({ type: 'double precision', nullable: false })
  price: number;
  @Column({ type: 'bool', default: true })
  status: boolean;
  @Column({ nullable: false })
  image: string;
  @ManyToOne(() => Category, (category) => category.foods, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @ManyToMany(() => Order, (order) => order.foods, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders: Order[];
}

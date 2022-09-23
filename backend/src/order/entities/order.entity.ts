import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Food } from 'src/menu/entities/food.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'double precision', nullable: false })
  totalPrice: number;

  @JoinTable()
  @ManyToMany(() => Food, (food) => food.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  foods: Food[];
}

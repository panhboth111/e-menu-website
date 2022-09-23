import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Food } from 'src/menu/entities/food.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Food) private foodRepo: Repository<Food>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const { totalPrice, foods } = createOrderDto;

      const selectedFoods = await this.foodRepo.find({
        where: { id: In(foods) },
      });

      const newOrder = await this.orderRepo.create({
        totalPrice,
        foods: selectedFoods,
      });
      const savedOrder = await this.orderRepo.save(newOrder);

      return {
        statusCode: 201,
        msg: 'Order created successfully',
        data: savedOrder,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const selectedFoods = await this.orderRepo.find({
        where: { id: In(createOrderDto.foods) },
      });
    } catch (error) {}
  }

  async findAllOrder() {
    try {
      const order = await this.orderRepo.find({ relations: ['user', 'food'] });
      return {
        statusCode: 201,
        msg: 'Order retrieved successfully',
        data: order,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  // async findOrderByUser(userId: string) {
  //   try {
  //     const order = await this.orderRepo.find({
  //       where: {
  //         user: {
  //           id: userId,
  //         },
  //       },
  //       relations: ['food'],
  //     });
  //     console.log(order);
  //     return {
  //       statusCode: 201,
  //       msg: 'Order retrieved successfully',
  //       data: order,
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: 502,
  //       msg: error.message,
  //       data: null,
  //     };
  //   }
  // }

  async remove(id: number) {
    try {
      const deletedFood = await this.orderRepo.delete({ id });
      return {
        statusCode: 201,
        msg: 'order deleted successfully',
        data: deletedFood,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
}

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "users" })
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public email: string;

  @Column()
  public password: string;
}

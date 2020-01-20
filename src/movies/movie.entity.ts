import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Actor } from '../actors/actor.entity';

export enum SerializationGroup {
  LIST = 'list',
  DETAILS = 'details'
}

@Exclude()
@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Expose({ groups: [SerializationGroup.LIST, SerializationGroup.DETAILS] })
  public id: number;

  @Column()
  @ApiProperty()
  @Expose({ groups: [SerializationGroup.LIST, SerializationGroup.DETAILS] })
  public title: string;

  @Column()
  @ApiProperty()
  @Expose({ groups: [SerializationGroup.DETAILS] })
  public director: string;

  @Column('timestamp')
  @ApiProperty()
  @Expose({ groups: [SerializationGroup.LIST, SerializationGroup.DETAILS] })
  @Transform((year: Date) => year.getFullYear())
  public year: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  @ApiProperty()
  @Expose({ groups: [SerializationGroup.LIST, SerializationGroup.DETAILS] })
  public metascore: number;

  @Column()
  @ApiProperty()
  @Expose({ groups: [SerializationGroup.DETAILS] })
  public poster: string;

  @ApiProperty()
  @Expose({ groups: [SerializationGroup.DETAILS] })
  @OneToMany(type => Actor, actor => actor.movie)
  actors: Actor[];
}
